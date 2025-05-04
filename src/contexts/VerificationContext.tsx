import React, { createContext, useContext, useState } from "react";
import { EmailVerificationResult, VerificationBatch } from "@/types";
import { mockRecentBatches, mockVerifyEmails } from "@/data/mockData";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface VerificationContextType {
  currentResults: EmailVerificationResult[];
  recentBatches: VerificationBatch[];
  isVerifying: boolean;
  verifyEmails: (emails: string[], batchName?: string) => Promise<void>;
  verifyUploadedFile: (file: File) => Promise<void>;
  clearCurrentResults: () => void;
}

const VerificationContext = createContext<VerificationContextType>({
  currentResults: [],
  recentBatches: [],
  isVerifying: false,
  verifyEmails: async () => {},
  verifyUploadedFile: async () => {},
  clearCurrentResults: () => {},
});

export const useVerification = () => useContext(VerificationContext);

export const VerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentResults, setCurrentResults] = useState<EmailVerificationResult[]>([]);
  const [recentBatches, setRecentBatches] = useState<VerificationBatch[]>(mockRecentBatches);
  const [isVerifying, setIsVerifying] = useState(false);
  const { user, updateUserCredits } = useAuth();

  const verifyEmails = async (emails: string[], batchName?: string): Promise<void> => {
    if (!user) {
      toast.error("Please login to verify emails");
      return;
    }
    
    // Check if user is admin - admins have unlimited credits
    const isAdmin = user.email === "admin@mailscribe.com" || user.id === "admin-user-id";
    
    // Only check credits for non-admin users
    if (!isAdmin && user.credits.available < emails.length) {
      toast.error(`Not enough credits. You need ${emails.length} credits but only have ${user.credits.available}.`);
      return;
    }

    setIsVerifying(true);

    try {
      // For large batches, we would implement a queue-based system here
      // For demo purposes, we'll process up to 1000 emails at once
      // In a real implementation, we would use background jobs
      
      if (emails.length > 1000) {
        toast.info(`Processing ${emails.length} emails. This may take some time...`);
      }
      
      const results = await mockVerifyEmails(emails);
      setCurrentResults(results);
      
      // Create a new batch and add it to recent batches
      const newBatch: VerificationBatch = {
        id: uuidv4(),
        name: batchName || `Batch ${new Date().toLocaleDateString()}`,
        total: results.length,
        valid: results.filter(r => r.status === 'valid').length,
        invalid: results.filter(r => r.status === 'invalid').length,
        risky: results.filter(r => r.status === 'risky').length,
        disposable: results.filter(r => r.status === 'disposable').length,
        unknown: results.filter(r => r.status === 'unknown').length,
        timestamp: new Date().toISOString(),
        results: results,
      };
      
      setRecentBatches(prev => [newBatch, ...prev]);
      
      // Only deduct credits for non-admin users
      if (!isAdmin) {
        updateUserCredits(emails.length);
      }
      
      toast.success(`Successfully verified ${emails.length} emails!`);
    } catch (error) {
      toast.error("Verification failed: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyUploadedFile = async (file: File): Promise<void> => {
    if (!user) {
      toast.error("Please login to verify emails");
      return;
    }
    
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    if (!file.name.endsWith('.csv')) {
      toast.error("Please upload a CSV file");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const content = await readFileContent(file);
      const emails = parseCSVEmails(content);
      
      if (emails.length === 0) {
        toast.error("No valid emails found in the CSV file");
        return;
      }
      
      // Check if user is admin - admins have unlimited credits
      const isAdmin = user.email === "admin@mailscribe.com" || user.id === "admin-user-id";
      
      // Only check credits for non-admin users
      if (!isAdmin && user.credits.available < emails.length) {
        toast.error(`Not enough credits. You need ${emails.length} credits but have only ${user.credits.available} available.`);
        return;
      }
      
      // For large batches, we'd implement a queue-based system here
      if (emails.length > 1000) {
        toast.info(`Processing ${emails.length} emails. This may take some time...`);
      }
      
      await verifyEmails(emails, file.name.replace('.csv', ''));
    } catch (error) {
      toast.error("File processing failed: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsVerifying(false);
    }
  };
  
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("File read error"));
      reader.readAsText(file);
    });
  };
  
  const parseCSVEmails = (content: string): string[] => {
    // Very simple CSV parser - in a real app, use a proper CSV parser library
    const lines = content.split(/\r?\n/);
    const emails: string[] = [];
    
    lines.forEach(line => {
      const values = line.split(',');
      values.forEach(value => {
        const trimmedValue = value.trim();
        // Very basic email validation
        if (trimmedValue.includes('@') && trimmedValue.includes('.')) {
          emails.push(trimmedValue);
        }
      });
    });
    
    return emails;
  };
  
  const clearCurrentResults = () => {
    setCurrentResults([]);
  };

  const contextValue = {
    currentResults,
    recentBatches,
    isVerifying,
    verifyEmails,
    verifyUploadedFile,
    clearCurrentResults,
    mockVerifyEmails // Add this line to expose the function to components
  };

  return (
    <VerificationContext.Provider
      value={contextValue}
    >
      {children}
    </VerificationContext.Provider>
  );
};


import React, { useState, useRef } from "react";
import { useVerification } from "@/contexts/VerificationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileUp, Loader2, Download, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewEmails, setPreviewEmails] = useState<string[]>([]);
  const [emailCount, setEmailCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { verifyUploadedFile, isVerifying } = useVerification();
  const { user } = useAuth();
  
  const isAdmin = user?.email === "admin@mailscribe.com" || user?.id === "admin-user-id";
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    // Preview the first few emails from the file and count total emails
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;
      
      const lines = content.split(/\r?\n/);
      const emails: string[] = [];
      let totalEmails = 0;
      
      lines.forEach(line => {
        const values = line.split(',');
        values.forEach(value => {
          const trimmedValue = value.trim();
          if (trimmedValue.includes('@') && trimmedValue.includes('.')) {
            if (emails.length < 5) {
              emails.push(trimmedValue);
            }
            totalEmails++;
          }
        });
      });
      
      setPreviewEmails(emails);
      setEmailCount(totalEmails);
    };
    reader.readAsText(selectedFile);
  };
  
  const handleUpload = async () => {
    if (!file) return;
    await verifyUploadedFile(file);
    
    // Reset after upload
    setFile(null);
    setPreviewEmails([]);
    setEmailCount(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const downloadSampleCsv = () => {
    const csvContent = "email\njohn@example.com\nsarah@example.com\ncontact@business.com";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-emails.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  
  // Check if user has enough credits
  const hasEnoughCredits = isAdmin || (user ? user.credits.available >= emailCount : false);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>CSV File Upload</span>
          {isAdmin && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
              Admin Mode - Unlimited Credits
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="csv-upload" className="text-sm font-medium">
              Upload CSV File
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="csv-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileUp className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">CSV files only</p>
                  </div>
                  <Input
                    id="csv-upload"
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={downloadSampleCsv}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Download Sample CSV
              </Button>
            </div>
          </div>
          
          {file && (
            <div className="mt-4">
              <h3 className="font-medium text-sm">Selected File:</h3>
              <p className="text-sm">{file.name}</p>
              
              {emailCount > 0 && (
                <div className="mt-2">
                  <h3 className="font-medium text-sm flex items-center justify-between">
                    <span>Preview:</span>
                    <span className="text-sm text-muted-foreground">{emailCount} emails total</span>
                  </h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {previewEmails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                    {emailCount > 5 && <li>...and {emailCount - 5} more</li>}
                  </ul>
                </div>
              )}
              
              {emailCount > 1000 && (
                <div className="flex items-start rounded-md bg-blue-50 p-3 mt-3 text-sm">
                  <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                  <span>
                    Large batch detected ({emailCount} emails). Verification might take some time to complete.
                  </span>
                </div>
              )}
              
              {/* Warning if not enough credits */}
              {!isAdmin && emailCount > 0 && user?.credits.available < emailCount && (
                <div className="flex items-start rounded-md bg-destructive/10 p-3 mt-3 text-sm">
                  <AlertCircle className="h-5 w-5 text-destructive mr-2 flex-shrink-0" />
                  <div>
                    <p>Not enough credits. You need {emailCount} credits but have only {user.credits.available}.</p>
                    <Button variant="link" className="p-0 h-auto text-sm" asChild>
                      <a href="/pricing">Upgrade your plan</a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpload}
          disabled={!file || isVerifying || (!hasEnoughCredits && !isAdmin)}
          className="w-full"
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
              {emailCount > 1000 ? 'Processing...' : 'Verifying...'}
            </>
          ) : (
            <>
              <FileUp className="h-4 w-4 mr-2" /> Upload & Verify
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;

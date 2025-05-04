
import React, { useState, useRef } from "react";
import { useVerification } from "@/contexts/VerificationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileUp, Loader2, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewEmails, setPreviewEmails] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { verifyUploadedFile, isVerifying } = useVerification();
  const { user } = useAuth();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    // Preview the first few emails from the file
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;
      
      const lines = content.split(/\r?\n/).slice(0, 5);
      const emails: string[] = [];
      
      lines.forEach(line => {
        const values = line.split(',');
        values.forEach(value => {
          const trimmedValue = value.trim();
          if (trimmedValue.includes('@') && trimmedValue.includes('.')) {
            emails.push(trimmedValue);
          }
        });
      });
      
      setPreviewEmails(emails);
    };
    reader.readAsText(selectedFile);
  };
  
  const handleUpload = async () => {
    if (!file) return;
    await verifyUploadedFile(file);
    
    // Reset after upload
    setFile(null);
    setPreviewEmails([]);
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
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>CSV File Upload</CardTitle>
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
              
              {previewEmails.length > 0 && (
                <div className="mt-2">
                  <h3 className="font-medium text-sm">Preview:</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {previewEmails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                    {previewEmails.length === 5 && <li>...</li>}
                  </ul>
                </div>
              )}
              
              {/* Warning if not enough credits */}
              {previewEmails.length > 0 && user?.credits.available < previewEmails.length && (
                <div className="flex items-start rounded-md bg-destructive/10 p-3 mt-3 text-sm">
                  <AlertCircle className="h-5 w-5 text-destructive mr-2 flex-shrink-0" />
                  <span>
                    The CSV file may contain more emails than your available credits ({user?.credits.available}).
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpload}
          disabled={!file || isVerifying}
          className="w-full"
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Verifying...
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

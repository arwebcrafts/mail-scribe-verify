
import React, { useState } from "react";
import { useVerification } from "@/contexts/VerificationContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";

const ManualVerification: React.FC = () => {
  const [emailsInput, setEmailsInput] = useState("");
  const [batchName, setBatchName] = useState("");
  const { verifyEmails, isVerifying } = useVerification();
  const { user } = useAuth();
  
  const handleVerify = async () => {
    if (!emailsInput.trim()) return;
    
    // Parse emails from text input (supports comma or newline separated)
    const emails = emailsInput
      .split(/[\n,]/)
      .map(email => email.trim())
      .filter(email => email.length > 0);
    
    if (emails.length === 0) return;
    
    await verifyEmails(emails, batchName || undefined);
  };
  
  // Count emails in the input
  const emailCount = emailsInput
    ? emailsInput
        .split(/[\n,]/)
        .map(email => email.trim())
        .filter(email => email.length > 0).length
    : 0;
  
  // Check if user has enough credits (admin users have unlimited)
  const isAdmin = user?.email === "admin@mailscribe.com" || user?.id === "admin-user-id";
  const hasEnoughCredits = isAdmin || (user ? user.credits.available >= emailCount : false);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Manual Email Verification</span>
          {isAdmin && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
              Admin Mode - Unlimited Credits
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="batch-name">Batch Name (Optional)</Label>
            <Input
              id="batch-name"
              placeholder="E.g., Marketing Campaign May 2023"
              value={batchName}
              onChange={e => setBatchName(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="emails-input" className="flex justify-between">
              <span>Email Addresses</span>
              <span className="text-sm text-muted-foreground">
                {emailCount} email{emailCount !== 1 ? 's' : ''}
              </span>
            </Label>
            <Textarea
              id="emails-input"
              placeholder="Enter email addresses (one per line or comma-separated)"
              value={emailsInput}
              onChange={e => setEmailsInput(e.target.value)}
              className="min-h-[200px] mt-1 font-mono"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Enter email addresses separated by commas or new lines.
              {!isAdmin && <span className="block mt-1">Each email verification will consume 1 credit.</span>}
            </p>
          </div>
          
          {emailCount > 1000 && (
            <div className="flex items-start rounded-md bg-blue-50 p-3 text-sm">
              <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
              <span>
                Large batch detected ({emailCount} emails). Verification might take some time to complete.
              </span>
            </div>
          )}
          
          {emailCount > 0 && !hasEnoughCredits && !isAdmin && (
            <div className="flex items-start rounded-md bg-destructive/10 p-3 text-sm">
              <AlertCircle className="h-5 w-5 text-destructive mr-2 flex-shrink-0" />
              <span>
                Not enough credits. You need {emailCount} credits but have {user?.credits.available || 0} available.
                <Button variant="link" className="p-0 h-auto text-sm" asChild>
                  <a href="/pricing">Upgrade your plan</a>
                </Button>
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleVerify}
          disabled={emailCount === 0 || isVerifying || (!hasEnoughCredits && !isAdmin)}
          className="w-full"
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
              {emailCount > 1000 ? 'Processing...' : 'Verifying...'}
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" /> Verify {emailCount > 0 ? `${emailCount} Email${emailCount !== 1 ? 's' : ''}` : 'Emails'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ManualVerification;


import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useVerification } from "@/contexts/VerificationContext";
import { EmailVerificationResult } from "@/types";

const EmailVerificationTest: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<EmailVerificationResult | null>(null);
  const [verificationCount, setVerificationCount] = useState(0);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const { mockVerifyEmails } = useVerification();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }
    
    setIsVerifying(true);
    try {
      // Use the mock verification from context
      const results = await mockVerifyEmails([email]);
      setResult(results[0]);
      setVerificationCount(prev => prev + 1);
      
      // Show upgrade prompt after 3 verifications
      if (verificationCount >= 2) {
        setShowUpgradePrompt(true);
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'invalid':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'disposable':
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      case 'risky':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'valid': return 'text-green-600';
      case 'invalid': return 'text-red-600';
      case 'disposable': return 'text-purple-600';
      case 'risky': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-2">Try our email verification</h3>
      
      {showUpgradePrompt ? (
        <Card className="p-6 border-2 border-primary/20">
          <div className="text-center">
            <h4 className="text-xl font-bold">Ready to verify more emails?</h4>
            <p className="text-muted-foreground mt-2 mb-4">
              Create a free account to verify more emails and get 100 free credits!
            </p>
            <div className="flex justify-center gap-3">
              <Button asChild>
                <Link to="/signup">Sign up free</Link>
              </Button>
              <Button variant="outline" onClick={() => {
                setShowUpgradePrompt(false);
                setVerificationCount(0);
              }}>
                Try 3 more
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <>
          <form onSubmit={handleVerify} className="flex w-full gap-2">
            <div className="flex-grow">
              <Input
                type="email"
                placeholder="Enter email to verify"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <Button type="submit" disabled={isVerifying} className="h-11">
              {isVerifying ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                "Verify"
              )}
            </Button>
          </form>
          
          {result && (
            <div className="mt-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <div>
                      <p className="text-sm font-medium">{result.email}</p>
                      <p className={`text-xs ${getStatusColor(result.status)}`}>
                        {result.status?.charAt(0).toUpperCase() + result.status?.slice(1)}
                        {result.type ? ` (${result.type})` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      Score: {(result.score || 0) * 100}%
                    </p>
                    {result.suggestion && (
                      <p className="text-xs text-primary">
                        Did you mean: {result.suggestion}?
                      </p>
                    )}
                  </div>
                </div>
              </Card>
              <p className="text-xs text-center mt-2">
                {3 - verificationCount} free verifications remaining
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmailVerificationTest;

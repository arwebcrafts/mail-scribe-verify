
import { EmailVerificationResult, User, VerificationBatch } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  credits: {
    available: 85,
    used: 15,
    planLimit: 100,
  },
};

export const mockVerificationResults: EmailVerificationResult[] = [
  {
    email: "valid@gmail.com",
    status: "valid",
    type: "personal",
    score: 0.98,
    timestamp: new Date().toISOString(),
  },
  {
    email: "disposable@tempmail.com",
    status: "disposable",
    type: "temporary",
    score: 0.99,
    timestamp: new Date().toISOString(),
  },
  {
    email: "risky@example.com",
    status: "risky",
    type: "catch-all",
    score: 0.7,
    timestamp: new Date().toISOString(),
  },
  {
    email: "invalid@nonexistentdomain123456.com",
    status: "invalid",
    type: "domain-error",
    score: 0.05,
    timestamp: new Date().toISOString(),
  },
  {
    email: "typo@gmal.com",
    status: "invalid",
    suggestion: "typo@gmail.com",
    score: 0.3,
    timestamp: new Date().toISOString(),
  },
];

export const mockRecentBatches: VerificationBatch[] = [
  {
    id: uuidv4(),
    name: "Marketing Campaign Q2",
    total: 150,
    valid: 120,
    invalid: 15,
    risky: 10,
    disposable: 5,
    unknown: 0,
    timestamp: "2023-06-15T10:30:00Z",
    results: mockVerificationResults,
  },
  {
    id: uuidv4(),
    name: "Newsletter Subscribers",
    total: 75,
    valid: 65,
    invalid: 5,
    risky: 3,
    disposable: 2,
    unknown: 0,
    timestamp: "2023-06-10T08:15:00Z",
    results: mockVerificationResults.slice(0, 3),
  }
];

export const mockVerifyEmails = (emails: string[]): Promise<EmailVerificationResult[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results: EmailVerificationResult[] = emails.map(email => {
        // Simple pattern to determine status based on email content
        let status: EmailVerificationResult['status'];
        let type: string | undefined;
        let suggestion: string | undefined;
        let score: number;
        
        if (email.includes('valid') || email.includes('real')) {
          status = 'valid';
          type = 'personal';
          score = 0.95;
        } else if (email.includes('disposable') || email.includes('temp')) {
          status = 'disposable';
          type = 'temporary';
          score = 0.98;
        } else if (email.includes('risky') || email.includes('catch')) {
          status = 'risky';
          type = 'catch-all';
          score = 0.7;
        } else if (email.includes('invalid') || !email.includes('@')) {
          status = 'invalid';
          type = 'syntax-error';
          score = 0.1;
        } else if (email.includes('typo') || email.includes('gmal')) {
          status = 'invalid';
          type = 'typo';
          suggestion = email.replace('gmal', 'gmail');
          score = 0.4;
        } else {
          const random = Math.random();
          if (random < 0.7) {
            status = 'valid';
            type = Math.random() > 0.5 ? 'personal' : 'business';
            score = 0.8 + (Math.random() * 0.2);
          } else if (random < 0.8) {
            status = 'invalid';
            type = 'domain-error';
            score = Math.random() * 0.3;
          } else if (random < 0.9) {
            status = 'disposable';
            type = 'temporary';
            score = 0.9;
          } else {
            status = 'risky';
            type = 'role-based';
            score = 0.5 + (Math.random() * 0.2);
          }
        }
        
        return {
          email,
          status,
          type,
          suggestion,
          score,
          timestamp: new Date().toISOString(),
        };
      });
      
      resolve(results);
    }, 2000); // Simulate network delay
  });
};

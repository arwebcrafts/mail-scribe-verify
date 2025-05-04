
export type EmailVerificationStatus = 
  | 'valid'
  | 'invalid'
  | 'risky'
  | 'disposable'
  | 'unknown';

export type EmailVerificationResult = {
  email: string;
  status: EmailVerificationStatus;
  type?: string; // catch-all, disposable, role-based, etc.
  suggestion?: string; // if typos found
  score?: number; // confidence level
  timestamp: string;
};

export type VerificationBatch = {
  id: string;
  name: string;
  total: number;
  valid: number;
  invalid: number;
  risky: number;
  disposable: number;
  unknown: number;
  timestamp: string;
  results: EmailVerificationResult[];
};

export type UserCredits = {
  available: number;
  used: number;
  planLimit: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  credits: UserCredits;
  isAdmin?: boolean;
};

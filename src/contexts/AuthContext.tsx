
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { mockUser } from "@/data/mockData";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserCredits: (newCredits: number) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateUserCredits: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem("mailScribeUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user data");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // In a real app, we would make an API request here
      // For now, just simulate a successful login with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (email === "demo@example.com" && password === "password") {
        setUser(mockUser);
        localStorage.setItem("mailScribeUser", JSON.stringify(mockUser));
        toast.success("Logged in successfully!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // In a real app, we would make an API request here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const newUser: User = {
        ...mockUser,
        id: `user-${Date.now()}`,
        name,
        email,
      };
      
      setUser(newUser);
      localStorage.setItem("mailScribeUser", JSON.stringify(newUser));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Signup failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mailScribeUser");
    toast.success("Logged out successfully!");
  };

  const updateUserCredits = (creditsUsed: number) => {
    if (!user) return;

    const updatedCredits = {
      ...user.credits,
      available: Math.max(0, user.credits.available - creditsUsed),
      used: user.credits.used + creditsUsed,
    };

    const updatedUser = {
      ...user,
      credits: updatedCredits,
    };

    setUser(updatedUser);
    localStorage.setItem("mailScribeUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        signup, 
        logout,
        updateUserCredits
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

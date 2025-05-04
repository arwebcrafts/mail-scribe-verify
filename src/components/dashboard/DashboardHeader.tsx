
import React from "react";
import CreditsBadge from "../ui-components/CreditsBadge";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  if (!user) return null;
  
  const isAdmin = user.isAdmin || user.email === "admin@mailscribe.com" || user.id === "admin-user-id";
  
  const handleBuyCredits = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real application, this would redirect to a payment page
    toast({
      title: "Coming Soon",
      description: "The payment system is currently being implemented. Please check back later.",
    });
  };
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            {isAdmin && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs flex items-center">
                <Crown className="h-3 w-3 mr-1" /> Admin
              </span>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Let's verify some emails today.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className={`flex flex-col items-center p-4 ${isAdmin ? 'bg-primary/10' : 'bg-card'} border rounded-lg`}>
            <span className="text-sm text-muted-foreground">Available Credits</span>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold">{isAdmin ? '∞' : user.credits.available}</span>
              {!isAdmin && (
                <span className="text-xs ml-1 text-muted-foreground">/ {user.credits.planLimit}</span>
              )}
            </div>
            {!isAdmin && (
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-primary rounded-full h-2" 
                  style={{ 
                    width: `${Math.min(100, (user.credits.available / user.credits.planLimit) * 100)}%` 
                  }}
                ></div>
              </div>
            )}
          </div>
          
          {!isAdmin && (
            <Button onClick={handleBuyCredits}>
              <PlusCircle className="w-4 h-4 mr-2" /> Buy Credits
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

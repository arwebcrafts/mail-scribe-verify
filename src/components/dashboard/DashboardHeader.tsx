
import React from "react";
import CreditsBadge from "../ui-components/CreditsBadge";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-muted-foreground mt-1">
            Let's verify some emails today.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex flex-col items-center p-4 bg-card border rounded-lg">
            <span className="text-sm text-muted-foreground">Available Credits</span>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold">{user.credits.available}</span>
              <span className="text-xs ml-1 text-muted-foreground">/ {user.credits.planLimit}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ 
                  width: `${Math.min(100, (user.credits.available / user.credits.planLimit) * 100)}%` 
                }}
              ></div>
            </div>
          </div>
          
          <Button asChild>
            <Link to="/pricing">
              <PlusCircle className="w-4 h-4 mr-2" /> Buy Credits
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

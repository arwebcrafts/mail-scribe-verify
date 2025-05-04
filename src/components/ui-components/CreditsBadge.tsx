
import React from "react";
import { Badge } from "@/components/ui/badge";

interface CreditsBadgeProps {
  available: number;
  total: number;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  className?: string;
}

const CreditsBadge: React.FC<CreditsBadgeProps> = ({
  available,
  total,
  size = "md",
  showPercentage = false,
  className = "",
}) => {
  const percentage = Math.round((available / total) * 100);
  
  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };
  
  // Color based on remaining credits percentage
  const getColor = () => {
    if (percentage > 50) return "bg-green-100 text-green-800 border-green-200";
    if (percentage > 20) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <Badge variant="outline" className={`${getColor()} ${sizes[size]} font-medium border ${className}`}>
      {available} / {total} credits
      {showPercentage && ` (${percentage}%)`}
    </Badge>
  );
};

export default CreditsBadge;

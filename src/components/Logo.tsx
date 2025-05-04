
import React from "react";
import { CheckCircle } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "md", withText = true }) => {
  const sizes = {
    sm: { icon: 20, text: "text-lg" },
    md: { icon: 24, text: "text-xl" },
    lg: { icon: 32, text: "text-2xl" },
  };

  return (
    <div className="flex items-center gap-2">
      <CheckCircle
        size={sizes[size].icon}
        className="text-primary animate-pulse-slow"
      />
      {withText && (
        <span className={`font-bold ${sizes[size].text}`}>
          Mail<span className="text-primary">Scribe</span>
        </span>
      )}
    </div>
  );
};

export default Logo;

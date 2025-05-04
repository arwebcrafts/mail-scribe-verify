
import React from "react";
import { EmailVerificationStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  HelpCircle,
} from "lucide-react";

interface VerificationStatusBadgeProps {
  status: EmailVerificationStatus;
  className?: string;
}

const VerificationStatusBadge: React.FC<VerificationStatusBadgeProps> = ({
  status,
  className,
}) => {
  const config = {
    valid: {
      color: "bg-green-500 hover:bg-green-600 text-white",
      icon: <CheckCircle className="w-4 h-4 mr-1" />,
      label: "Valid",
    },
    invalid: {
      color: "bg-red-500 hover:bg-red-600 text-white",
      icon: <XCircle className="w-4 h-4 mr-1" />,
      label: "Invalid",
    },
    risky: {
      color: "bg-yellow-500 hover:bg-yellow-600 text-white",
      icon: <AlertCircle className="w-4 h-4 mr-1" />,
      label: "Risky",
    },
    disposable: {
      color: "bg-purple-500 hover:bg-purple-600 text-white",
      icon: <Trash2 className="w-4 h-4 mr-1" />,
      label: "Disposable",
    },
    unknown: {
      color: "bg-gray-500 hover:bg-gray-600 text-white",
      icon: <HelpCircle className="w-4 h-4 mr-1" />,
      label: "Unknown",
    },
  };

  const { color, icon, label } = config[status] || config.unknown;

  return (
    <Badge
      className={`${color} flex items-center font-semibold px-2 py-1 ${className}`}
    >
      {icon}
      {label}
    </Badge>
  );
};

export default VerificationStatusBadge;


import React from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import CreditsBadge from "../ui-components/CreditsBadge";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b shadow-sm py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center no-underline text-foreground">
          <Logo withText size="md" />
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:block">
                <CreditsBadge 
                  available={user?.credits.available || 0}
                  total={user?.credits.planLimit || 100}
                  showPercentage
                />
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <span>Hi, {user?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  asChild
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={logout}
                >
                  Log out
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                size="sm" 
                variant="default"
                asChild
              >
                <Link to="/signup">Sign Up Free</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

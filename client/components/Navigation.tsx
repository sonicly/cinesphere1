import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import UserProfile from "./UserProfile";

interface NavigationProps {
  onGetStarted?: () => void;
  hideGetStarted?: boolean;
}

export default function Navigation({
  onGetStarted,
  hideGetStarted = false,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleGetStarted = () => {
    setIsOpen(false);
    onGetStarted?.();
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-primary">CINE</span>
              <span className="text-foreground ml-2">SPHERE</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-foreground/80 hover:text-primary transition-colors duration-200 text-sm font-medium",
                  "relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                )}
              >
                {item.label}
              </a>
            ))}
            {isAuthenticated || hideGetStarted ? (
              <UserProfile />
            ) : (
              <button
                onClick={handleGetStarted}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-primary hover:bg-secondary rounded-lg transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-2 animate-slide-up">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {!isAuthenticated && (
              <button
                onClick={handleGetStarted}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
              >
                Get Started
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

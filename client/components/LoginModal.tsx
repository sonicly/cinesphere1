import { useState } from "react";
import { X, Mail, Lock, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  resetPasswordForEmail,
} from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Close modal if user is authenticated
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      const timer = setTimeout(() => onClose(), 500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
        setEmail("");
        setPassword("");
        setIsSignUp(false);
        setError(null);
      } else {
        await signInWithEmail(email, password);
        setEmail("");
        setPassword("");
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await signInWithGoogle();
      // Supabase will redirect to your app after authentication
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await resetPasswordForEmail(resetEmail);
      setResetMessage(
        `Password reset instructions have been sent to ${resetEmail}. Check your email for the reset link.`,
      );
      setResetEmail("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to send reset email";

      // Handle specific Supabase errors
      if (errorMessage.includes("captcha")) {
        setError(
          "Captcha verification failed. This is a Supabase configuration issue. Please contact support or try again later.",
        );
      } else if (errorMessage.includes("rate limit")) {
        setError(
          "Too many reset requests. Please wait a few minutes before trying again.",
        );
      } else if (errorMessage.includes("not found")) {
        setError("Email address not found. Please check and try again.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForgotPasswordState = () => {
    setIsForgotPassword(false);
    setResetEmail("");
    setResetMessage(null);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border/50 rounded-lg shadow-xl w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border/50">
          {isForgotPassword && (
            <button
              onClick={resetForgotPasswordState}
              className="p-1 text-primary hover:text-primary/80 rounded-lg hover:bg-secondary transition-colors duration-200 mr-2"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h2 className="text-2xl font-bold text-foreground flex-1">
            {isForgotPassword
              ? "Reset Password"
              : isSignUp
                ? "Create Account"
                : "Welcome Back"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-foreground/60 hover:text-foreground rounded-lg hover:bg-secondary transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        {isForgotPassword ? (
          // Forgot Password Form
          <form onSubmit={handleForgotPassword} className="p-6 space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {resetMessage && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-400 mb-1">
                      Check Your Email
                    </p>
                    <p className="text-sm text-green-300">{resetMessage}</p>
                    <div className="mt-3">
                      <p className="text-xs text-green-300/80 mb-2">
                        You'll receive an email with:
                      </p>
                      <div className="bg-black/30 rounded p-2 text-xs text-foreground/60 space-y-1">
                        <div>
                          <span className="font-semibold text-foreground/80">
                            &lt;h2&gt;Reset Password&lt;/h2&gt;
                          </span>
                        </div>
                        <div>
                          Follow this link to reset the password for your user.
                        </div>
                        <div>
                          <span className="text-primary">
                            &lt;a href="..."&gt;Reset Password&lt;/a&gt;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!resetMessage && (
              <>
                <p className="text-sm text-foreground/70">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={cn(
                        "w-full pl-10 pr-4 py-2.5 bg-background border border-border/50 rounded-lg",
                        "text-foreground placeholder:text-foreground/40",
                        "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
                        "transition-all duration-200",
                      )}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !resetEmail}
                  className={cn(
                    "w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-semibold",
                    "flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105",
                    isLoading
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:opacity-90",
                  )}
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </>
            )}

            {/* Back Button */}
            {resetMessage && (
              <button
                type="button"
                onClick={resetForgotPasswordState}
                className="w-full py-2.5 px-4 border border-primary/50 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-200"
              >
                Back to Sign In
              </button>
            )}
          </form>
        ) : (
          // Login/Signup Form
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 bg-background border border-border/50 rounded-lg",
                    "text-foreground placeholder:text-foreground/40",
                    "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
                    "transition-all duration-200",
                  )}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 bg-background border border-border/50 rounded-lg",
                    "text-foreground placeholder:text-foreground/40",
                    "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
                    "transition-all duration-200",
                  )}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-semibold",
                "flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105",
                isLoading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:opacity-90",
              )}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading
                ? "Loading..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </button>

            {/* Forgot Password / Sign Up Toggle */}
            <div className="flex items-center justify-between text-sm">
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(true);
                    setError(null);
                  }}
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  Forgot password?
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="text-primary hover:text-primary/80 transition-colors duration-200 ml-auto"
                disabled={isLoading}
              >
                {isSignUp ? "Sign In Instead" : "Create New Account"}
              </button>
            </div>
          </form>
        )}

        {/* Divider & Google Sign In - Only show when not in forgot password mode */}
        {!isForgotPassword && (
          <div className="px-6 py-4">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-foreground/60">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={cn(
                "w-full py-2.5 px-4 border border-border/50 rounded-lg font-semibold",
                "flex items-center justify-center gap-2 transition-all duration-200",
                "hover:bg-secondary hover:border-primary/50",
                isLoading ? "opacity-75 cursor-not-allowed" : "",
              )}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  className="text-blue-400"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  className="text-green-400"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  className="text-yellow-400"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  className="text-red-400"
                />
              </svg>
              <span className="text-foreground">Google</span>
            </button>
          </div>
        )}

        {/* Terms Section - Only show when not in forgot password mode */}
        {!isForgotPassword && (
          <div className="px-6 py-4 border-t border-border/50">
            <p className="text-xs text-foreground/60 text-center">
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary hover:text-primary/80">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:text-primary/80">
                Privacy Policy
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

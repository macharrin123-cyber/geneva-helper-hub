import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if we're in reset mode (have a token) or request mode
  const isResetMode = searchParams.get("token") !== null;

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Check your email",
        description: "We've sent you a password reset link.",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your password has been updated. You can now sign in with your new password.",
      });
      navigate("/signin");
    } catch (error: any) {
      console.error("Update password error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-md mx-auto pt-24 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            {isResetMode ? "Reset Your Password" : "Forgot Password"}
          </h1>
          
          {isResetMode ? (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1"
                  required
                  minLength={6}
                  placeholder="Enter your new password"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating Password..." : "Update Password"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetRequest} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  required
                  placeholder="Enter your email address"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>
              <p className="text-sm text-center text-gray-600">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="text-primary hover:underline"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
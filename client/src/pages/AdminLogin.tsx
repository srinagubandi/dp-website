/**
 * AdminLogin.tsx
 * 
 * Simple username/password login page for admin access.
 * This bypasses Manus OAuth and uses environment-based credentials.
 * 
 * CREDENTIALS ARE SET VIA ENVIRONMENT VARIABLES:
 * - ADMIN_USERNAME (default: "admin")
 * - ADMIN_PASSWORD (default: "DocPropel2024!")
 * 
 * For Railway deployment, set these in your Railway dashboard under Variables.
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, User } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AdminLogin() {
  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Navigation
  const [, setLocation] = useLocation();
  
  // Login mutation
  const loginMutation = trpc.adminAuth.login.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        // Store admin session token in localStorage
        localStorage.setItem("adminToken", data.token);
        // Redirect to admin dashboard
        setLocation("/admin");
      } else {
        setError(data.message || "Login failed");
      }
    },
    onError: (err) => {
      setError(err.message || "Login failed. Please check your credentials.");
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          {/* Logo */}
          <div className="mx-auto mb-4">
            <img 
              src="/images/docpropel-logo.png" 
              alt="DocPropel" 
              className="h-12 mx-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  autoComplete="username"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  autoComplete="current-password"
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login to Admin"
              )}
            </Button>
          </form>
          
          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

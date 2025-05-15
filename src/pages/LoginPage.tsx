
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    const from = (location.state as any)?.from || "/dashboard";
    return <Navigate to={from} replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await login(email, password);
      // Auth context will handle the redirect
    } catch (error) {
      console.error("Login error:", error);
      // Toast notification is handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  // DEMO CREDENTIALS
  const loginAsAdmin = () => {
    setEmail("admin@oceantracking.com");
    setPassword("password");
  };

  const loginAsViewer = () => {
    setEmail("viewer@oceantracking.com");
    setPassword("password");
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-ocean-700 text-white rounded-md">
            <span className="font-bold text-lg">OT</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-ocean-900">Ocean Tracking</h1>
        <p className="text-ocean-600 mt-2">Real-time container shipment visibility</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>
            Enter your credentials to access the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-ocean-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-ocean-600 hover:bg-ocean-700"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Logging in...
                </span>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center w-full">
            <p className="text-sm text-muted-foreground">Demo credentials</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={loginAsAdmin}
                className="text-xs"
              >
                Admin User
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={loginAsViewer}
                className="text-xs"
              >
                Viewer User
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;

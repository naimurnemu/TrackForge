"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";

export default function AuthPage() {
  const { login, loading } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome to TrackForge</CardTitle>
          <CardDescription>
            Sign in with Google to continue your progress journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={login}
            disabled={loading}
            className="w-full"
            variant="outline"
            size="lg"
          >
            <FaGoogle className="mr-2 h-5 w-5" />
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Secure authentication via Google OAuth
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
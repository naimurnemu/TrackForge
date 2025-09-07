import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-primary/10 p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Compass className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl font-extrabold text-transparent">
            404
          </CardTitle>
          <CardDescription className="mt-2 text-base text-muted-foreground">
            Oops! The page you’re looking for doesn’t exist.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Button asChild size="lg" className="mt-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go back to Overview
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

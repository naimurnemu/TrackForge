import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-primary/10 p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardContent className="flex flex-col items-center justify-center space-y-6 py-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />

          <div className="flex w-full flex-col items-center space-y-3">
            <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>

          <p className="text-sm text-muted-foreground">
            Preparing your content...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

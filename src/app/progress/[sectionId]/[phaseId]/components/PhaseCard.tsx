
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  phase: {
    id: string;
    title: string;
    type: "Learn" | "Practice" | "Project";
    description?: string;
    progress: number;
    createdAt: Date | string | number;
  };
  sectionId: string;
};

export function PhaseCard({ phase, sectionId }: Props) {
  const createdAt = new Date(phase.createdAt).toLocaleDateString();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{phase.title}</CardTitle>
          <Badge
            variant={
              phase.type === "Learn"
                ? "default"
                : phase.type === "Practice"
                ? "secondary"
                : "destructive"
            }
          >
            {phase.type}
          </Badge>
        </div>
        <CardDescription>Created on {createdAt}</CardDescription>
      </CardHeader>

      <CardContent>
        {phase.description && (
          <p className="text-sm text-foreground mb-3 leading-relaxed">
            {phase.description}
          </p>
        )}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${phase.progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {phase.progress}% Complete
        </p>
      </CardContent>

      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/progress/${sectionId}/${phase.id}`}>
            <BookOpen className="h-4 w-4 mr-2" />
            View Phase
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
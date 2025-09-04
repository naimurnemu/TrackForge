// app/progress/[sectionId]/components/PhaseCard.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phase } from "@/types";

type PhaseCardProps = {
  phase: Phase;
  sectionId: string;
};

export function PhaseCard({ phase, sectionId }: PhaseCardProps) {
  const createdAt = new Date(phase.createdAt).toLocaleDateString();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-3xl">{phase.title}</CardTitle>
            <CardDescription className="mt-2">
              Type: <strong>{phase.type}</strong> • Created on {createdAt}
            </CardDescription>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href={`/progress/${sectionId}/${phase.id}/edit`}>Edit Phase</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {phase.description && (
          <p className="text-foreground leading-relaxed mb-6">
            {phase.description}
          </p>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{phase.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${phase.progress}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
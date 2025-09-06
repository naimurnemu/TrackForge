import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phase } from "@/types";
import { BookOpenCheck } from "lucide-react";

type PhaseListProps = {
  phases: Phase[];
  sectionId: string;
};

export function PhaseList({ phases, sectionId }: PhaseListProps) {
  const hasPhases = phases.length > 0;

  const sortedPhases = [...phases].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Phases</h2>
        <span className="text-sm text-muted-foreground">
          {hasPhases
            ? `Found ${phases.length} phase${phases.length > 1 ? "s" : ""}`
            : "No phases yet"}
        </span>
      </div>

      {!hasPhases ? (
        <Card className="border-2 border-dashed text-center py-12">
          <CardHeader>
            <div className="mx-auto">
              <BookOpenCheck />
            </div>
            <CardTitle className="text-base mt-4">
              No phases created yet
            </CardTitle>
            <CardDescription className="mt-2">
              Start building your learning path.
              <br />
              <Link
                href={`/progress/${sectionId}/create`}
                className="text-primary hover:underline font-medium"
              >
                Create your first phase
              </Link>
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {sortedPhases.map((phase) => (
            <Card key={phase.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle>
                      <Link
                        href={`/progress/${sectionId}/${phase.id}`}
                        className="hover:underline transition-colors text-xl"
                      >
                        {phase.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {phase.description || "No description provided."}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
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
                    <div className="text-xs text-right">
                      <span className="font-medium">{phase.progress}%</span>{" "}
                      <span className="text-muted-foreground">complete</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${phase.progress}%` }}
                  ></div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

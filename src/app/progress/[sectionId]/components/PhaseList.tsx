import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phase } from "@/types";

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Phases</h2>
        <span className="text-sm text-muted-foreground">
          {hasPhases
            ? `Found ${phases.length} phase${phases.length > 1 ? "s" : ""}`
            : "No phases yet"}
        </span>
      </div>

      {/* No Phases State */}
      {!hasPhases ? (
        <Card className="border-2 border-dashed text-center py-12">
          <CardHeader>
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto text-muted-foreground opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>

            {/* Text */}
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
        /* Render phases */
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {sortedPhases.map((phase) => (
            <Card key={phase.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  {/* Title + Description */}
                  <div className="space-y-1 flex-1">
                    <CardTitle>
                      <Link
                        href={`/progress/${sectionId}/${phase.id}`}
                        className="hover:underline transition-colors"
                      >
                        {phase.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {phase.description || "No description provided."}
                    </CardDescription>
                  </div>

                  {/* Type + Progress */}
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

                {/* Progress Bar */}
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

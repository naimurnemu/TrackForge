import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Phase = {
  id: string;
  title: string;
  description: string | null;
  type: "Learn" | "Practice" | "Project";
  completed: boolean;
  order: number;
  createdAt: Date;
};

type Props = {
  phases: Phase[];
};

export function PhaseList({ phases }: Props) {
  const hasPhases = phases.length > 0;

  // Sort phases by order
  const sortedPhases = phases.sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header with Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Phases</h2>
        <span className="text-sm text-muted-foreground">
          {hasPhases ? `Found ${phases.length} phase(s)` : "No phases yet"}
        </span>
      </div>

      {/* Phase Grid or Placeholder */}
      {!hasPhases ? (
        <Card className="border-2 border-dashed text-center py-12">
          <CardHeader>
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
            <CardTitle className="text-base mt-4">No phases created yet</CardTitle>
            <CardDescription className="mt-2">
              Start building your learning path.
              <br />
              <Link
                href="/progress/create"
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
            <Card key={phase.id} className={phase.completed ? "opacity-80" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>
                      <Link
                        href={`/progress/phase/${phase.id}`}
                        className="hover:underline"
                      >
                        {phase.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {phase.description || "No description."}
                    </CardDescription>
                  </div>
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
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
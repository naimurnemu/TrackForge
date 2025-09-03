import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  children: React.ReactNode;
};

export function PhaseList({ children }: Props) {
  const hasPhases = !!children && (Array.isArray(children) ? children.length > 0 : true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl">Phases</CardTitle>
        <span className="text-sm text-muted-foreground">
          {hasPhases 
            ? `Found ${Array.isArray(children) ? children.length : 1} phase(s)` 
            : "No phases yet"}
        </span>
      </div>

      {!hasPhases ? (
        <Card className="text-center py-12">
          <CardContent>
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
            <p className="mt-4 text-muted-foreground">No phases created yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {children}
        </div>
      )}
    </div>
  );
}
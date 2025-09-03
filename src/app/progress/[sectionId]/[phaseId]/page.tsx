// app/progress/[sectionId]/[phaseId]/page.tsx
import { notFound } from "next/navigation";
import { getPhaseByIdAPI } from "@/lib/server/phases";
import { getTopicsByPhaseIdAPI } from "@/lib/server/topics";
import { getCurrentUser } from "@/lib/server/auth";
import { LayoutShell } from "@/app/progress/components/LayoutShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export default async function PhasePage({
  params,
}: {
  params: { sectionId: string; phaseId: string };
}) {
  const user = await getCurrentUser();
  if (!user) return <div className="container p-8">Not authenticated</div>;

  const phase = await getPhaseByIdAPI(user.uid, params.sectionId, params.phaseId);
  if (!phase) return notFound();

  const topics = await getTopicsByPhaseIdAPI(user.uid, params.sectionId, params.phaseId);

  return (
    <LayoutShell
      title={phase.title}
      subtitle={`Phase • ${phase.type}`}
      showCreateButton
      createHref={`/progress/${params.sectionId}/${params.phaseId}/create`}
      createLabel="New Topic"
    >
      {/* Phase Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">{phase.title}</CardTitle>
              <CardDescription>
                Type: <strong>{phase.type}</strong> • Created on{" "}
                {new Date(phase.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link href={`/progress/${params.sectionId}/${params.phaseId}/edit`}>
                Edit Phase
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {phase.description && (
            <p className="text-foreground leading-relaxed mb-4">
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

      {/* Topics List */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Topics</h2>

        {topics.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No topics yet.</p>
              <p className="text-sm mt-1">
                <Link
                  href={`/progress/${params.sectionId}/${params.phaseId}/create`}
                  className="text-primary hover:underline"
                >
                  Create your first topic
                </Link>{" "}
                to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {topics.map((topic) => (
              <TopicItem
                key={topic.id}
                topic={topic}
                sectionId={params.sectionId}
                phaseId={params.phaseId}
              />
            ))}
          </div>
        )}
      </div>
    </LayoutShell>
  );
}
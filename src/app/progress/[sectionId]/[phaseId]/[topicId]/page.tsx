// app/progress/[sectionId]/[phaseId]/[topicId]/page.tsx
import { notFound } from "next/navigation";
import { getTopicByIdAPI } from "@/lib/server/topics";
import { getCurrentUser } from "@/lib/server/auth";
import { LayoutShell } from "@/app/progress/components/LayoutShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TopicPage({
  params,
}: {
  params: { sectionId: string; phaseId: string; topicId: string };
}) {
  const user = await getCurrentUser();
  if (!user) return <div className="container p-8">Not authenticated</div>;

  const topic = await getTopicByIdAPI(user.uid, params.sectionId, params.phaseId, params.topicId);
  if (!topic) return notFound();

  return (
    <LayoutShell
      title={topic.title}
      subtitle="Topic Details"
      showCreateButton={false}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">{topic.title}</CardTitle>
              {topic.description && (
                <CardDescription>{topic.description}</CardDescription>
              )}
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/progress/${params.sectionId}/${params.phaseId}/${topic.id}/edit`}>
                  Edit
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href={`/progress/${params.sectionId}/${params.phaseId}/${topic.id}/complete`}>
                  {topic.completed ? "Update Summary" : "Complete Topic"}
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                topic.completed ? "bg-green-500" : "bg-yellow-500"
              }`}
            ></span>
            <span>{topic.completed ? "Completed" : "In Progress"}</span>
          </div>

          {/* Summary */}
          {topic.completed && topic.summary && (
            <div>
              <h3 className="text-lg font-medium mb-2">Summary</h3>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {topic.summary}
              </p>
              {topic.timeSpentMinutes && (
                <p className="text-sm text-muted-foreground mt-2">
                  Time spent: <strong>{topic.timeSpentMinutes} minutes</strong>
                </p>
              )}
              {topic.completedAt && (
                <p className="text-sm text-muted-foreground">
                  Completed on:{" "}
                  <strong>{new Date(topic.completedAt).toLocaleDateString()}</strong>
                </p>
              )}
            </div>
          )}

          {!topic.completed && (
            <div className="p-4 bg-muted rounded-md text-sm">
              This topic is not yet completed. Add a summary and time spent to mark it complete.
            </div>
          )}
        </CardContent>
      </Card>
    </LayoutShell>
  );
}
// app/progress/[sectionId]/[phaseId]/components/TopicList.tsx
import { Topic } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  topics: Topic[];
  sectionId: string;
  phaseId: string;
};

export function TopicList({ topics, sectionId, phaseId }: Props) {
  const hasTopics = topics.length > 0;

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Topics</h2>
        <span className="text-sm text-muted-foreground">
          {hasTopics ? `${topics.length} topic(s)` : "No topics yet"}
        </span>
      </div>

      {/* Empty State */}
      {!hasTopics ? (
        <Card className="border-2 border-dashed text-center py-12">
          <p className="text-muted-foreground">No topics created yet.</p>
          <p className="text-sm mt-2">
            <Link
              href={`/progress/${sectionId}/${phaseId}/create`}
              className="text-primary hover:underline font-medium"
            >
              Create your first topic
            </Link>{" "}
            to get started.
          </p>
        </Card>
      ) : (
        /* Minimalist List (SSR) */
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="flex flex-col p-4 border rounded-lg bg-background hover:bg-accent transition-colors group"
            >
              <div className="flex items-start justify-between">
                {/* Topic Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{topic.title}</h3>
                  {topic.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {topic.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span
                      className={
                        topic.completed
                          ? "text-green-600 dark:text-green-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      }
                    >
                      {topic.completed ? "✅ Completed" : "🕒 In Progress"}
                    </span>
                    {topic.timeSpentMinutes && (
                      <span>{topic.timeSpentMinutes} min</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <Button
                    asChild
                    variant={topic.completed ? "secondary" : "default"}
                    size="sm"
                  >
                    <Link
                      href={`/progress/${sectionId}/${phaseId}/${topic.id}/complete`}
                    >
                      {topic.completed ? "View Summary" : "Complete"}
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Link
                      href={`/progress/${sectionId}/${phaseId}/${topic.id}/edit`}
                    >
                      Edit
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
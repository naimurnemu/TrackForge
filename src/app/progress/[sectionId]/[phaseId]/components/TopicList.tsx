import { Topic } from "@/types";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { TopicItem } from "./TopicItem";
import { NotepadText } from "lucide-react";

type Props = {
  topics: Topic[];
  sectionId: string;
  phaseId: string;
};

export function TopicList({ topics, sectionId, phaseId }: Props) {
  const hasTopics = topics.length > 0;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Topics</h2>
        <span className="text-sm text-muted-foreground">
          {hasTopics
            ? `${topics.length} Topic${topics.length > 1 ? "s" : ""}`
            : "Has no Topics yet"}
        </span>
      </div>

      {!hasTopics ? (
        <Card className="border-2 border-dashed text-center py-12">
          <NotepadText />
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
        <div className="space-y-3">
          {topics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              sectionId={sectionId}
              phaseId={phaseId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

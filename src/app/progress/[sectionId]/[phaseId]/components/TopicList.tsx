import { Topic } from "@/types";
import { Card } from "@/components/ui/card";
import { TopicItem } from "./TopicItem";
import { NotepadText } from "lucide-react";

type TopicListProps = {
  topics: Topic[];
  userId: string;
  sectionId: string;
  phaseId: string;
};

export function TopicList({ topics, userId, sectionId, phaseId }: TopicListProps) {
  const hasTopics = topics.length > 0;

  const sortedTopics = [...topics].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Topics</h2>
        <span className="text-sm text-muted-foreground">
          {hasTopics
            ? `${topics.length} Topic${topics.length > 1 ? "s" : ""}`
            : "Has no Topics yet"}
        </span>
      </div>

      <hr className="my-3" />

      {!hasTopics ? (
        <Card className="border-2 border-dashed text-center gap-2 py-12">
          <div className="mx-auto">

          <NotepadText />
          </div>
          <p className="text-muted-foreground">No topics created yet.</p>
          <p className="text-sm mt-2">
            Create your first topic
            to get started.
          </p>
        </Card>
      ) : (
        <div className="space-y-3 px-2 w-full lg:w-10/12 mx-auto">
          {sortedTopics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              userId={userId}
              sectionId={sectionId}
              phaseId={phaseId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

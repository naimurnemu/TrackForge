"use client";

import { Topic } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock12, Loader2 } from "lucide-react";
import { useState } from "react";
import { ContentModal } from "@/components/modal/ContentModal";
import { InfoModal } from "@/components/modal/InfoModal";
import { summaryFormConfig, topicFormConfig } from "@/helpers/form-config";
import { completeTopicAPI } from "@/lib/server/topics";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  topic: Topic;
  userId: string;
  sectionId: string;
  phaseId: string;
};

export function TopicItem({ topic, userId, sectionId, phaseId }: Props) {
  const [modal, setModal] = useState<null | "edit" | "delete" | "complete">(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    completed,
    title,
    description,
    timeSpentMinutes,
    id: topicId,
  } = topic;

  const handletopicEdit = (values: {
    title: string;
    description: string;
  }) => {
    setError(null);
  };

  const handleTopicComplete = async (values: { timeSpentMinutes: string, summary: string; }) => {
    setError(null);
    setLoading(true);

    try {
      const success = await completeTopicAPI(
        userId,
        sectionId,
        phaseId,
        topicId,
        values.summary,
        Number(values.timeSpentMinutes),
      );

      if (success) {
        toast.success(`Topic completed: ${title}`, {
          description: description,
          closeButton: true,
        })
        router.refresh();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }

  };

  const handleTopicDelete = () => {
    setModal(null);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col p-5 rounded-lg border dark:border-gray-500! shadow-sm transition-all group",
        "bg-card hover:shadow-md hover:border-muted/40",
        completed
          ? "border-green-300 dark:border-green-700"
          : "border-yellow-300 dark:border-yellow-700"
      )}
    >
      {/* Left accent bar */}
      <div
        className={cn(
          "absolute top-0 left-0 w-1 h-full rounded-l-lg",
          completed
            ? "bg-green-500 dark:bg-green-400"
            : "bg-yellow-500 dark:bg-yellow-400"
        )}
      />

      {/* Content */}
      <div className="flex-1 pr-2">
        <h3 className="text-xl font-semibold text-foreground flex items-center">
          {title}
          {loading && (
            <Loader2 className="h-4 w-4 mx-1.5 animate-spin text-primary" />
          )}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
            {description}
          </p>
        )}

        {/* Meta info */}
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <Badge
            variant={completed ? "default" : "outline"}
            className={cn(
              "px-2 py-0.5 text-sm rounded-full",
              completed
                ? " bg-green-50 dark:bg-green-400"
                : " bg-yellow-50 dark:bg-yellow-400"
            )}
          >
            {completed ? "Completed" : "In Queue"}
          </Badge>
          {timeSpentMinutes && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
              <Clock12 className="w-4 h-4 mr-1" /> {timeSpentMinutes} min
            </span>
          )}
        </div>
      </div>

      {error && (<div>
        <p className="text-sm text-destructive">{error}</p>{error}</div>)}

      {/* Actions */}
      <div className="flex gap-2 mt-4 justify-end">
        <Button
          size="sm"
          variant="outline"
          className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
          onClick={() => setModal("edit")}
        >
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
          onClick={() => {
            setModal("delete");
          }}
        >
          Delete
        </Button>

        <Button
          size="sm"
          onClick={() => setModal("complete")}
          variant={completed ? "secondary" : "default"}
        >
          {completed ? "Incomplete" : "Complete"}
        </Button>
      </div>

      {/* Edit */}
      {modal === "edit" && (
        <ContentModal
          open
          setOpen={() => setModal(null)}
          title="Update Topic"
          description="Update the topic details"
          fields={topicFormConfig}
          defaultValues={{
            title, description,
          }}
          onSubmit={(values) => handletopicEdit(values)!}
        />
      )}

      {/* Edit */}
      {modal === "complete" && summaryFormConfig && (
        <ContentModal
          open
          setOpen={() => setModal(null)}
          title="Confirm Complete"
          description="Are you sure you want to complete this item?"
          fields={summaryFormConfig ?? []}
          onSubmit={(values) => handleTopicComplete(values)!}
        />
      )}

      {/* Delete */}
      {modal === "delete" && (
        <InfoModal
          open
          setOpen={() => setModal(null)}
          title="Confirm Delete"
          description={`Are you sure you want to delete ${title} from the list ?`}
          confirmLabel="Delete"
          destructive
          onConfirm={handleTopicDelete}
        />
      )}
    </div>
  );
}
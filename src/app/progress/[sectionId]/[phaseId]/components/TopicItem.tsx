"use client";

import { Topic } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Clock12 } from "lucide-react";

type Props = {
  topic: Topic;
  sectionId: string;
  phaseId: string;
};

export function TopicItem({ topic, sectionId, phaseId }: Props) {
  const {
    completed,
    title,
    description,
    timeSpentMinutes,
    id: topicId,
  } = topic;

  return (
    <div
      className={cn(
        "relative flex flex-col p-5 rounded-lg border shadow-sm transition-all group",
        "bg-card hover:shadow-md hover:border-primary/40",
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
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
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

      {/* Actions */}
      <div className="flex gap-2 mt-4 justify-end">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
        >
          <Link href={`/progress/${sectionId}/${phaseId}/${topicId}/edit`}>
            Edit
          </Link>
        </Button>

        <Button
          size="sm"
          variant="destructive"
          className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
          onClick={() => {
            // TODO: open delete modal
            console.log("Delete clicked:", topicId);
          }}
        >
          Delete
        </Button>
        <Button asChild size="sm" variant={completed ? "secondary" : "default"}>
          <Link href={`/progress/${sectionId}/${phaseId}/${topicId}/complete`}>
            {completed ? "Incomplete" : "Complete"}
          </Link>
        </Button>
      </div>
    </div>
  );
}

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Topic } from "@/types";

type LessonCardProps = {
  topic: Topic;
  index: number;
};

export default function LessonCard({
  topic,
  index,
}: LessonCardProps) {
  const { title, description, timeSpentMinutes, summary, completed } = topic;

  return (
    <Card id={topic.id} className="border shadow-sm gap-6">
      <CardHeader>
        <CardTitle className="text-lg">
          Lesson {index}: {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {completed ? (
        <CardContent>
          <CardDescription>
            {timeSpentMinutes
              ? `${timeSpentMinutes} minutes spent`
              : "No time recorded"}
          </CardDescription>
          {summary ? (
            <p className="italic font-medium">{summary}</p>
          ) : (
            <p className="text-muted-foreground">No summary provided.</p>
          )}
        </CardContent>
      ) : (
        <CardContent>
          <p className="text-muted-foreground">Not completed yet.</p>
        </CardContent>
      )}
    </Card>
  );
}

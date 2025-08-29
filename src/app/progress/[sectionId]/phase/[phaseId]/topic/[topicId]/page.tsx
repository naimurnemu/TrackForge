import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface Topic {
  id: string;
  title: string;
  isCompleted: boolean;
  summary?: string;
  timeSpentMinutes?: number;
  completedAt?: string;
  phaseId: string;
}

export default function TopicCompletionPage({
  params,
}: {
  params: { sectionId: string; phaseId: string; topicId: string };
}) {
  const { sectionId, phaseId, topicId } = params;
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const docRef = doc(db, "topics", topicId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Topic not found.");
          return;
        }

        const data = docSnap.data();
        setTopic({
          id: docSnap.id,
          title: data.title,
          isCompleted: data.isCompleted || false,
          summary: data.summary,
          timeSpentMinutes: data.timeSpentMinutes,
          completedAt: data.completedAt,
          phaseId: data.phaseId,
        });
      } catch (err: any) {
        setError(err.message || "Failed to load topic.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [topicId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const summary = formData.get("summary") as string;
    const timeSpentMinutes = Number(formData.get("timeSpentMinutes"));

    if (!summary || !summary.trim()) {
      setError("Summary is required.");
      setSubmitting(false);
      return;
    }

    if (!timeSpentMinutes || timeSpentMinutes <= 0) {
      setError("Time spent must be a positive number.");
      setSubmitting(false);
      return;
    }

    try {
      await updateDoc(doc(db, "topics", topicId), {
        isCompleted: true,
        summary: summary.trim(),
        timeSpentMinutes,
        completedAt: new Date().toISOString(),
      });

      // Redirect back to phase
      window.location.href = `/progress/${sectionId}/phase/${phaseId}`;
    } catch (err: any) {
      setError(err.message || "Failed to update topic.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Loading topic...</p>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 text-sm bg-destructive/15 text-destructive rounded-md mb-6">
          {error}
        </div>
        <Button asChild>
          <Link href={`/progress/${sectionId}/phase/${phaseId}`}>
            ← Back to Phase
          </Link>
        </Button>
      </div>
    );
  }

  // If already completed, allow editing
  if (topic?.isCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Edit Topic Completion</h1>
        <p className="text-muted-foreground mb-6">
          Update your summary or time spent.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="summary">Summary *</Label>
            <Textarea
              id="summary"
              name="summary"
              defaultValue={topic.summary}
              placeholder="What did you learn?"
              rows={5}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeSpentMinutes">Time Spent (minutes) *</Label>
            <Input
              id="timeSpentMinutes"
              name="timeSpentMinutes"
              type="number"
              defaultValue={topic.timeSpentMinutes || ""}
              placeholder="e.g., 45"
              required
            />
          </div>
          <div className="flex gap-4">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Update"}
            </Button>
            <Button asChild variant="outline">
              <Link href={`/progress/${sectionId}/phase/${phaseId}`}>
                Cancel
              </Link>
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // If not completed, show completion form
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Complete Topic</h1>
      <p className="text-muted-foreground mb-6">
        Great job! Reflect on what you've learned.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="summary">Summary *</Label>
          <Textarea
            id="summary"
            name="summary"
            placeholder="What did you learn? What was challenging?"
            rows={5}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeSpentMinutes">Time Spent (minutes) *</Label>
          <Input
            id="timeSpentMinutes"
            name="timeSpentMinutes"
            type="number"
            placeholder="e.g., 45"
            required
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Mark Complete"}
          </Button>
          <Button asChild variant="outline">
            <Link href={`/progress/${sectionId}/phase/${phaseId}`}>
              Cancel
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
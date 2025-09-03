// app/progress/[sectionId]/[phaseId]/[topicId]/complete/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { updateTopicAPI } from "@/lib/server/topics";
import { useAuth } from "@/context/AuthContext";

export default function CompleteTopicPage({
  params,
}: {
  params: { sectionId: string; phaseId: string; topicId: string };
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.uid || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const summary = (formData.get("summary") as string)?.trim();
    const timeSpentMinutes = Number(formData.get("timeSpentMinutes"));

    if (!summary || summary.length < 10) {
      setError("Summary must be at least 10 characters long.");
      setLoading(false);
      return;
    }
    if (!timeSpentMinutes || timeSpentMinutes <= 0) {
      setError("Time spent must be a positive number.");
      setLoading(false);
      return;
    }

    try {
      const success = await updateTopicAPI(userId, params.sectionId, params.phaseId, params.topicId, {
        completed: true,
        summary,
        timeSpentMinutes,
      });

      if (success) {
        router.push(`/progress/${params.sectionId}/${params.phaseId}/${params.topicId}`);
        router.refresh();
      } else {
        setError("Failed to complete topic");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Complete Topic</CardTitle>
          <CardDescription>
            Share what you learned and how long it took.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-6 p-4 text-sm bg-destructive/15 text-destructive rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                name="summary"
                placeholder="What did you learn? How does it work?"
                rows={6}
                required
              />
              <p className="text-sm text-muted-foreground">
                Write in your own words to reinforce learning.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSpentMinutes">Time Spent (minutes) *</Label>
              <input
                type="number"
                id="timeSpentMinutes"
                name="timeSpentMinutes"
                required
                min="1"
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 45"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Mark as Complete"}
              </Button>
              <Button asChild variant="outline">
                <Link href={`/progress/${params.sectionId}/${params.phaseId}/${params.topicId}`}>
                  Cancel
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
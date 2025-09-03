// app/progress/[sectionId]/[phaseId]/edit/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { updatePhaseAPI } from "@/lib/server/phases";
import { useAuth } from "@/context/AuthContext";

export default function EditPhasePage({
  params,
}: {
  params: { sectionId: string; phaseId: string };
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
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const type = (formData.get("type") as "Learn" | "Practice" | "Project") || "Learn";

    if (!title) {
      setError("Title is required");
      setLoading(false);
      return;
    }

    try {
      const success = await updatePhaseAPI(userId, params.sectionId, params.phaseId, {
        title,
        description,
        type,
      });

      if (success) {
        router.push(`/progress/${params.sectionId}/${params.phaseId}`);
        router.refresh();
      } else {
        setError("Failed to update phase");
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
          <CardTitle className="text-2xl">Edit Phase</CardTitle>
          <CardDescription>
            Update the title, type, or description of this phase.
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
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                defaultValue=""
                placeholder="e.g., Phase 1: React Basics"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Phase Type</Label>
              <select
                name="type"
                id="type"
                defaultValue="Learn"
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="Learn">Learn</option>
                <option value="Practice">Practice</option>
                <option value="Project">Project</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue=""
                placeholder="Describe what this phase covers..."
                rows={4}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button asChild variant="outline">
                <Link href={`/progress/${params.sectionId}/${params.phaseId}`}>
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
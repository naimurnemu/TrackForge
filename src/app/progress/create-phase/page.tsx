import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

export default function CreatePhasePage({ params }: { params: { sectionId: string } }) {
  const { sectionId } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const type = formData.get("type") as "Learn" | "Practice" | "Project";
    const description = formData.get("description") as string;

    try {
      const res = await fetch("/api/progress/create-phase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionId, title, type, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create phase");
      }

      // Redirect back to section
      window.location.href = `/progress/${sectionId}`;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create New Phase</h1>

      {error && (
        <div className="mb-6 p-4 text-sm bg-destructive/15 text-destructive rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="sectionId" value={sectionId} />

        <div className="space-y-2">
          <Label htmlFor="title">Phase Title *</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g., Phase 1: Intro to React"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Phase Type *</Label>
          <Select name="type" required>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Learn">Learn</SelectItem>
              <SelectItem value="Practice">Practice</SelectItem>
              <SelectItem value="Project">Project</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="What will you cover in this phase?"
            rows={4}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Phase"}
          </Button>
          <Button asChild variant="outline">
            <Link href={`/progress/${sectionId}`}>Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
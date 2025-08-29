import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function CreateTopicPage({
  params,
}: {
  params: { sectionId: string; phaseId: string };
}) {
  const { sectionId, phaseId } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    try {
      const res = await fetch("/api/progress/create-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phaseId, title }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create topic");
      }

      window.location.href = `/progress/${sectionId}/phase/${phaseId}`;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add New Topic</h1>

      {error && (
        <div className="mb-6 p-4 text-sm bg-destructive/15 text-destructive rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="phaseId" value={phaseId} />

        <div className="space-y-2">
          <Label htmlFor="title">Topic Title *</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g., Components and Props"
            required
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Topic"}
          </Button>
          <Button asChild variant="outline">
            <Link href={`/progress/${sectionId}/phase/${phaseId}`}>Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
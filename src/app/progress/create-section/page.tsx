import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function CreateSectionPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const target = formData.get("target") as string;

    try {
      const res = await fetch("/api/progress/create-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, target }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create section");
      }

      // Redirect to progress dashboard
      window.location.href = "/progress";
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create New Section</h1>

      {error && (
        <div className="mb-6 p-4 text-sm bg-destructive/15 text-destructive rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Section Title *</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g., Web Development"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Explain what this section is about..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target">Target</Label>
          <Input
            id="target"
            name="target"
            placeholder="e.g., Complete 3 projects in 3 months"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Section"}
          </Button>
          <Button asChild variant="outline">
            <Link href="/progress">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
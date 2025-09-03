"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { getSectionByIdAPI, updateSectionAPI } from "@/lib/server/sections";
import { useAuth } from "@/context/AuthContext";
import { Section } from "@/types";

export default function EditSectionPage({
  params,
}: {
  params: { sectionId: string };
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.uid || "";

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    (async () => {
      const section = await getSectionByIdAPI(userId, params.sectionId);
      setSection(section);
    })();

  }, [userId, params.sectionId, router, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const target = (formData.get("target") as string)?.trim();

    if (!title) {
      setError("Title is required");
      setLoading(false);
      return;
    }

    try {
      const success = await updateSectionAPI(userId, params.sectionId, {
        title,
        description,
        target,
      });

      if (success) {
        router.push(`/progress/${params.sectionId}`);
        router.refresh();
      } else {
        setError("Failed to update section");
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
          <CardTitle className="text-2xl">Edit Section</CardTitle>
          <CardDescription>
            Update the details of this learning section.
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
                required
                placeholder="e.g., Full-Stack Development"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue=""
                placeholder="What will you learn in this section?"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target</Label>
              <Input
                id="target"
                name="target"
                defaultValue=""
                placeholder="e.g., Build 5 projects in 6 months"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button asChild variant="outline">
                <Link href={`/progress/${params.sectionId}`}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
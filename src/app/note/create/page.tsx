"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function CreateNotePage({ searchParams }: { searchParams: { edit?: string } }) {
  const { edit: noteId } = searchParams;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);
  const [phases, setPhases] = useState<{ id: string; title: string; sectionId: string }[]>([]);
  const [topics, setTopics] = useState<{ id: string; title: string; phaseId: string }[]>([]);

  // Form state
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedPhase, setSelectedPhase] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [content, setContent] = useState("");

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        if (!user) return;

        // Fetch sections
        const sectionSnapshot = await getDocs(
          query(collection(db, "sections"), where("userId", "==", user.uid))
        );
        const sectionList = sectionSnapshot.docs.map((d) => ({
          id: d.id,
          title: d.data().title,
        }));
        setSections(sectionList);

        // Fetch phases
        const phaseSnapshot = await getDocs(collection(db, "phases"));
        const phaseList = phaseSnapshot.docs.map((d) => ({
          id: d.id,
          title: d.data().title,
          sectionId: d.data().sectionId,
        }));
        setPhases(phaseList);

        // Fetch topics
        const topicSnapshot = await getDocs(collection(db, "topics"));
        const topicList = topicSnapshot.docs.map((d) => ({
          id: d.id,
          title: d.data().title,
          phaseId: d.data().phaseId,
        }));
        setTopics(topicList);

        // If editing, load note
        if (noteId) {
          const noteDoc = await getDoc(doc(db, "notes", noteId));
          if (noteDoc.exists()) {
            const data = noteDoc.data();
            setContent(data.content);
            setSelectedSection(data.sectionId || "");
            setSelectedPhase(data.phaseId || "");
            setSelectedTopic(data.topicId || "");
          }
        }
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [noteId]);

  // Filtered options
  const filteredPhases = selectedSection
    ? phases.filter((p) => p.sectionId === selectedSection)
    : phases;
  const filteredTopics = selectedPhase
    ? topics.filter((t) => t.phaseId === selectedPhase)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!content.trim()) {
      setError("Note content is required.");
      setSubmitting(false);
      return;
    }

    try {
      const noteData = {
        content: content.trim(),
        sectionId: selectedSection || null,
        phaseId: selectedPhase || null,
        topicId: selectedTopic || null,
        userId: (await getCurrentUser())!.uid,
        updatedAt: new Date().toISOString(),
      };

      if (noteId) {
        // Update
        await updateDoc(doc(db, "notes", noteId), {
          ...noteData,
          // Keep createdAt
        });
      } else {
        // Create
        await addDoc(collection(db, "notes"), {
          ...noteData,
          createdAt: new Date().toISOString(),
        });
      }

      // Redirect
      window.location.href = "/notes";
    } catch (err: any) {
      setError(err.message || "Failed to save note.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        {noteId ? "Edit Note" : "Create New Note"}
      </h1>

      {error && (
        <div className="mb-6 p-4 text-sm bg-destructive/15 text-destructive rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Context Hierarchy */}
        <div className="space-y-4 border-b pb-6">
          <h2 className="text-lg font-semibold">Note Context</h2>

          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Select
              value={selectedSection}
              onValueChange={(val) => {
                setSelectedSection(val);
                setSelectedPhase("");
                setSelectedTopic("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent>
                {sections.length === 0 ? (
                  <SelectItem value="" disabled>No sections</SelectItem>
                ) : (
                  sections.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {selectedSection && (
            <div className="space-y-2">
              <Label htmlFor="phase">Phase</Label>
              <Select
                value={selectedPhase}
                onValueChange={(val) => {
                  setSelectedPhase(val);
                  setSelectedTopic("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a phase" />
                </SelectTrigger>
                <SelectContent>
                  {filteredPhases.length === 0 ? (
                    <SelectItem value="" disabled>No phases in this section</SelectItem>
                  ) : (
                    filteredPhases.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedPhase && (
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select
                value={selectedTopic}
                onValueChange={setSelectedTopic}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {filteredTopics.length === 0 ? (
                    <SelectItem value="" disabled>No topics in this phase</SelectItem>
                  ) : (
                    filteredTopics.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">Note Content *</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts, insights, or questions..."
            rows={8}
            required
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : noteId ? "Update Note" : "Create Note"}
          </Button>
          <Button asChild variant="outline">
            <Link href="/notes">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

async function getCurrentUser() {
  const { auth } = await import("@/lib/firebase");
  return new Promise<{ uid: string } | null>((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}
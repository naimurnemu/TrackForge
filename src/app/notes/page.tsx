import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StickyNote, Folder, ListVideo, BookOpen, Plus } from "lucide-react";

interface Note {
  id: string;
  content: string;
  sectionId?: string;
  phaseId?: string;
  topicId?: string;
  createdAt: string;
  updatedAt: string;
}

interface Section {
  title: string;
}

interface Phase {
  title: string;
  type: string;
}

interface Topic {
  title: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sections, setSections] = useState<Record<string, Section>>({});
  const [phases, setPhases] = useState<Record<string, Phase>>({});
  const [topics, setTopics] = useState<Record<string, Topic>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        if (!user) return;

        // Fetch notes
        const noteSnapshot = await getDocs(
          query(collection(db, "notes"), where("userId", "==", user.uid))
        );
        const noteList: Note[] = [];
        noteSnapshot.forEach((doc) => {
          noteList.push({ id: doc.id, ...doc.data() } as Note);
        });
        setNotes(noteList);

        // Fetch related data
        const sectionPromises = [
          ...new Set(noteList.map(n => n.sectionId).filter(Boolean)),
        ].map(async (id) => {
          if (!id) return;
          const snap = await getDoc(doc(db, "sections", id));
          if (snap.exists()) {
            return [id, { title: snap.data().title }] as const;
          }
        });

        const phasePromises = [
          ...new Set(noteList.map(n => n.phaseId).filter(Boolean)),
        ].map(async (id) => {
          if (!id) return;
          const snap = await getDoc(doc(db, "phases", id));
          if (snap.exists()) {
            const data = snap.data();
            return [id, { title: data.title, type: data.type }] as const;
          }
        });

        const topicPromises = [
          ...new Set(noteList.map(n => n.topicId).filter(Boolean)),
        ].map(async (id) => {
          if (!id) return;
          const snap = await getDoc(doc(db, "topics", id));
          if (snap.exists()) {
            return [id, { title: snap.data().title }] as const;
          }
        });

        const sectionResults = (await Promise.all(sectionPromises)).filter(Boolean) as [string, Section][];
        const phaseResults = (await Promise.all(phasePromises)).filter(Boolean) as [string, Phase][];
        const topicResults = (await Promise.all(topicPromises)).filter(Boolean) as [string, Topic][];

        setSections(Object.fromEntries(sectionResults));
        setPhases(Object.fromEntries(phaseResults));
        setTopics(Object.fromEntries(topicResults));
      } catch (err) {
        console.error("Error loading notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function getCurrentUser() {
    const { auth } = await import("@/lib/firebase");
    return new Promise<null | { uid: string }>((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Notes</h1>
        <p className="text-muted-foreground">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Notes</h1>
        <Button asChild>
          <Link href="/notes/create">
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Link>
        </Button>
      </div>

      {notes.length === 0 ? (
        <Card className="py-16 text-center">
          <CardContent>
            <StickyNote className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No notes yet</h3>
            <p className="text-muted-foreground mb-6">
              Start taking notes on your learning journey.
            </p>
            <Button asChild>
              <Link href="/notes/create">
                <Plus className="h-4 w-4 mr-2" />
                Create First Note
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {notes
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((note) => {
              const context = [];
              if (note.topicId && topics[note.topicId]) {
                context.push(`Topic: ${topics[note.topicId].title}`);
              } else if (note.phaseId && phases[note.phaseId]) {
                context.push(`Phase: ${phases[note.phaseId].title}`);
              } else if (note.sectionId && sections[note.sectionId]) {
                context.push(`Section: ${sections[note.sectionId].title}`);
              }

              let icon = <StickyNote className="h-4 w-4 text-muted-foreground" />;
              if (note.sectionId) icon = <Folder className="h-4 w-4 text-blue-500" />;
              if (note.phaseId) icon = <ListVideo className="h-4 w-4 text-green-500" />;
              if (note.topicId) icon = <BookOpen className="h-4 w-4 text-purple-500" />;

              return (
                <Card key={note.id} className="hover:shadow-md transition">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {icon}
                      {context[0]}
                      <span className="ml-auto">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-foreground">{note.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/notes/create?edit=${note.id}`}>Edit</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      )}

      <div className="mt-8">
        <a href="/dashboard" className="text-primary hover:underline text-sm">
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}
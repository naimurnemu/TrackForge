import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plus, ListVideo, AlertCircle } from "lucide-react";

interface Section {
  id: string;
  title: string;
  description: string;
  target: string;
  createdAt: string;
}

interface Phase {
  id: string;
  title: string;
  type: "Learn" | "Practice" | "Project";
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

export default function SectionDetailPage({ params }: { params: { sectionId: string } }) {
  const { sectionId } = params;
  const [section, setSection] = useState<Section | null>(null);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectionAndPhases = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = await getCurrentUser();
        if (!user) throw new Error("Not authenticated");

        // Fetch Section
        const sectionRef = collection(db, "sections");
        const sectionSnap = await getDocs(
          query(sectionRef, where("userId", "==", user.uid), where("__name__", "==", sectionId))
        );

        if (sectionSnap.empty) {
          setError("Section not found or access denied.");
          setLoading(false);
          return;
        }

        const sectionDoc = sectionSnap.docs[0];
        const sectionData = sectionDoc.data();
        const loadedSection: Section = {
          id: sectionDoc.id,
          title: sectionData.title,
          description: sectionData.description,
          target: sectionData.target,
          createdAt: sectionData.createdAt,
        };
        setSection(loadedSection);

        // Fetch Phases
        const phaseRef = collection(db, "phases");
        const phaseSnap = await getDocs(
          query(phaseRef, where("sectionId", "==", sectionId))
        );

        const loadedPhases: Phase[] = [];
        phaseSnap.forEach((doc) => {
          const data = doc.data();
          loadedPhases.push({
            id: doc.id,
            title: data.title,
            type: data.type,
            description: data.description,
            isCompleted: data.isCompleted || false,
            createdAt: data.createdAt,
          });
        });

        // Sort phases by creation date (oldest first, like chapters)
        loadedPhases.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        setPhases(loadedPhases);
      } catch (err: any) {
        console.error("Error loading section or phases:", err);
        setError(err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSectionAndPhases();
  }, [sectionId]);

  // Helper to get current user (client-side only)
  async function getCurrentUser() {
    const auth = (await import("@/lib/firebase")).auth;
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
        <p className="text-muted-foreground">Loading section...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-destructive/50 bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/progress">← Back to Progress</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">Section not found.</p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/progress">← Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-3xl">{section.title}</CardTitle>
              {section.target && (
                <CardDescription className="mt-1">
                  <strong>Target:</strong> {section.target}
                </CardDescription>
              )}
            </div>
            <Button asChild>
              <Link href={`/progress/${sectionId}/phase/create`}>
                <Plus className="h-4 w-4 mr-2" />
                New Phase
              </Link>
            </Button>
          </div>
        </CardHeader>
        {section.description && (
          <CardContent>
            <p className="text-foreground leading-relaxed">{section.description}</p>
          </CardContent>
        )}
      </Card>

      {/* Phases List */}
      <h2 className="text-2xl font-semibold mb-6">Phases</h2>

      {phases.length === 0 ? (
        <Card className="py-12 text-center">
          <CardContent>
            <ListVideo className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No phases yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by creating your first phase in this section.
            </p>
            <Button asChild>
              <Link href={`/progress/${sectionId}/phase/create`}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Phase
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {phases.map((phase) => (
            <Card key={phase.id} className={phase.isCompleted ? "opacity-80 border-primary" : ""}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{phase.title}</CardTitle>
                  <CardDescription>
                    {phase.type} • {new Date(phase.createdAt).toLocaleDateString()}
                    {phase.isCompleted && " • ✅ Completed"}
                  </CardDescription>
                </div>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/progress/${sectionId}/phase/${phase.id}`}>
                    Open Phase
                  </Link>
                </Button>
              </CardHeader>
              {phase.description && (
                <CardContent>
                  <p className="text-sm text-foreground">{phase.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Back Link */}
      <div className="mt-8">
        <Button asChild variant="ghost">
          <Link href="/progress">← Back to All Sections</Link>
        </Button>
      </div>
    </div>
  );
}
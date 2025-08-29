import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plus, CheckCircle, XCircle, BookOpen, Timer } from "lucide-react";

interface Phase {
  id: string;
  title: string;
  type: "Learn" | "Practice" | "Project";
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

interface Topic {
  id: string;
  title: string;
  isCompleted: boolean;
  summary?: string;
  timeSpentMinutes?: number;
  completedAt?: string;
  createdAt: string;
}

export default function PhaseDetailPage({
  params,
}: {
  params: { sectionId: string; phaseId: string };
}) {
  const { sectionId, phaseId } = params;
  const [phase, setPhase] = useState<Phase | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhaseAndTopics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Phase
        const phaseRef = collection(db, "phases");
        const phaseSnap = await getDocs(
          query(phaseRef, where("__name__", "==", phaseId))
        );

        if (phaseSnap.empty) {
          setError("Phase not found.");
          setLoading(false);
          return;
        }

        const phaseDoc = phaseSnap.docs[0];
        const data = phaseDoc.data();
        const loadedPhase: Phase = {
          id: phaseDoc.id,
          title: data.title,
          type: data.type,
          description: data.description,
          isCompleted: data.isCompleted || false,
          createdAt: data.createdAt,
        };
        setPhase(loadedPhase);

        // Fetch Topics
        const topicRef = collection(db, "topics");
        const topicSnap = await getDocs(
          query(topicRef, where("phaseId", "==", phaseId))
        );

        const loadedTopics: Topic[] = [];
        topicSnap.forEach((doc) => {
          const t = doc.data();
          loadedTopics.push({
            id: doc.id,
            title: t.title,
            isCompleted: t.isCompleted || false,
            summary: t.summary,
            timeSpentMinutes: t.timeSpentMinutes,
            completedAt: t.completedAt,
            createdAt: t.createdAt,
          });
        });

        // Sort by creation date (oldest first)
        loadedTopics.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        setTopics(loadedTopics);

        // Auto-complete phase if all topics are done
        if (loadedTopics.length > 0) {
          const allCompleted = loadedTopics.every((t) => t.isCompleted);
          if (allCompleted && !loadedPhase.isCompleted) {
            await updateDoc(doc(db, "phases", phaseId), { isCompleted: true });
            setPhase((prev) => (prev ? { ...prev, isCompleted: true } : null));
          }
        }
      } catch (err: any) {
        console.error("Error loading phase or topics:", err);
        setError(err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhaseAndTopics();
  }, [phaseId, sectionId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Loading phase...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-destructive/50 bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button asChild className="mt-4" variant="outline">
              <Link href={`/progress/${sectionId}`}>← Back to Section</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!phase) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">Phase not found.</p>
        <Button asChild className="mt-4" variant="outline">
          <Link href={`/progress/${sectionId}`}>← Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Phase Header */}
      <Card className={`mb-8 ${phase.isCompleted ? "border-primary" : ""}`}>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-3xl">{phase.title}</CardTitle>
              <CardDescription className="mt-1">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${phase.type === "Learn" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                      phase.type === "Practice" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    }
                  `}
                >
                  {phase.type}
                </span>
                {phase.isCompleted && (
                  <span className="ml-2 px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                    ✅ Completed
                  </span>
                )}
              </CardDescription>
            </div>
            <Button asChild>
              <Link href={`/progress/${sectionId}/phase/${phaseId}/topic/create`}>
                <Plus className="h-4 w-4 mr-2" />
                New Topic
              </Link>
            </Button>
          </div>
        </CardHeader>
        {phase.description && (
          <CardContent>
            <p className="text-foreground leading-relaxed">{phase.description}</p>
          </CardContent>
        )}
      </Card>

      {/* Topics List */}
      <h2 className="text-2xl font-semibold mb-6">Topics</h2>

      {topics.length === 0 ? (
        <Card className="py-12 text-center">
          <CardContent>
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No topics yet</h3>
            <p className="text-muted-foreground mb-6">
              Start adding topics to build your learning path.
            </p>
            <Button asChild>
              <Link href={`/progress/${sectionId}/phase/${phaseId}/topic/create`}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Topic
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className={topic.isCompleted ? "border-primary bg-primary/5" : ""}
            >
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <CardDescription>
                    {topic.isCompleted ? (
                      <>
                        ✅ Completed{" "}
                        {topic.completedAt &&
                          `on ${new Date(topic.completedAt).toLocaleDateString()}`}
                        {topic.timeSpentMinutes && (
                          <span className="ml-2">
                            <Timer className="inline h-3 w-3 mr-1" />
                            {topic.timeSpentMinutes} min
                          </span>
                        )}
                      </>
                    ) : (
                      "Not started"
                    )}
                  </CardDescription>
                  {topic.summary && topic.isCompleted && (
                    <p className="text-sm mt-2 italic border-l-2 pl-3 border-primary text-foreground">
                      “{topic.summary}”
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  {!topic.isCompleted ? (
                    <Button asChild size="sm">
                      <Link
                        href={`/progress/${sectionId}/phase/${phaseId}/topic/${topic.id}`}
                      >
                        Mark Complete
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <Link
                        href={`/progress/${sectionId}/phase/${phaseId}/topic/${topic.id}`}
                      >
                        Edit
                      </Link>
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Back Link */}
      <div className="mt-8">
        <Button asChild variant="ghost">
          <Link href={`/progress/${sectionId}`}>← Back to Section</Link>
        </Button>
      </div>
    </div>
  );
}
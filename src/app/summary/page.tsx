import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Folder, ListVideo } from "lucide-react";

interface Section {
  id: string;
  title: string;
  description: string;
  target: string;
}

interface Phase {
  id: string;
  title: string;
  type: "Learn" | "Practice" | "Project";
  sectionId: string;
}

interface Topic {
  id: string;
  title: string;
  summary: string;
  timeSpentMinutes: number;
  completedAt: string;
  phaseId: string;
}

export default function SummariesPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        if (!user) return;

        // Fetch all sections by user
        const sectionSnapshot = await getDocs(
          query(collection(db, "sections"), where("userId", "==", user.uid))
        );
        const sectionList: Section[] = [];
        sectionSnapshot.forEach((doc) => {
          sectionList.push({ id: doc.id, ...doc.data() } as Section);
        });
        setSections(sectionList);

        // Fetch all phases
        const phaseSnapshot = await getDocs(collection(db, "phases"));
        const phaseList: Phase[] = [];
        phaseSnapshot.forEach((doc) => {
          phaseList.push({ id: doc.id, ...doc.data() } as Phase);
        });
        setPhases(phaseList);

        // Fetch all completed topics
        const topicSnapshot = await getDocs(
          query(collection(db, "topics"), where("isCompleted", "==", true))
        );
        const topicList: Topic[] = [];
        topicSnapshot.forEach((doc) => {
          const data = doc.data();
          topicList.push({
            id: doc.id,
            title: data.title,
            summary: data.summary,
            timeSpentMinutes: data.timeSpentMinutes,
            completedAt: data.completedAt,
            phaseId: data.phaseId,
          });
        });
        setTopics(topicList);
      } catch (err) {
        console.error("Error loading summaries:", err);
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
        <h1 className="text-3xl font-bold mb-6">Your Learning Book</h1>
        <p className="text-muted-foreground">Loading summaries...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Your Learning Book</h1>
      <p className="text-muted-foreground mb-8">
        A journal of what you've learned, one topic at a time.
      </p>

      {sections.length === 0 ? (
        <Card className="py-16 text-center">
          <CardContent>
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No summaries yet</h3>
            <p className="text-muted-foreground">
              Complete your first topic to see it here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {sections
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((section) => {
              const sectionPhases = phases.filter((p) => p.sectionId === section.id);
              const sectionTopics = topics.filter((t) =>
                sectionPhases.some((p) => p.id === t.phaseId)
              );

              if (sectionTopics.length === 0) return null;

              return (
                <AccordionItem value={section.id} key={section.id}>
                  <AccordionTrigger className="text-left hover:bg-muted/50 transition px-4 rounded">
                    <div>
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {sectionTopics.length} completed topic{sectionTopics.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 space-y-6">
                    {sectionPhases.map((phase) => {
                      const phaseTopics = topics.filter((t) => t.phaseId === phase.id);
                      if (phaseTopics.length === 0) return null;

                      return (
                        <div key={phase.id} className="border-l-4 border-primary/30 pl-4">
                          <h3 className="font-medium flex items-center gap-2">
                            <ListVideo className="h-4 w-4 text-primary" />
                            {phase.title}
                            <span className="ml-2 px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded">
                              {phase.type}
                            </span>
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {phaseTopics.length} topic{phaseTopics.length !== 1 ? "s" : ""} completed
                          </p>
                          <div className="space-y-3">
                            {phaseTopics.map((topic) => (
                              <Card key={topic.id} className="bg-background border shadow-sm">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-base">{topic.title}</CardTitle>
                                  <p className="text-xs text-muted-foreground">
                                    Completed{" "}
                                    {new Date(topic.completedAt).toLocaleDateString()} •{" "}
                                    {topic.timeSpentMinutes} min
                                  </p>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm italic text-foreground">
                                    "{topic.summary}"
                                  </p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
      )}

      <div className="mt-8">
        <a
          href="/dashboard"
          className="text-primary hover:underline text-sm font-medium"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}
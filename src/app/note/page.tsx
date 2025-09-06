import { getUserSectionsAPI } from "@/lib/server/sections";
import { getCurrentUser } from "@/lib/server/auth";
import { BookOpen, Notebook, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Section } from "@/types";

export const dynamic = "force-dynamic";

export default async function NoteIndexPage() {
  const user = await getCurrentUser();
  if (!user) return;

  const sections: Section[] = await getUserSectionsAPI(user.uid);
  const sorted = [...sections].sort(
    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-3">
          <Notebook className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Your Learning Notes
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Capture detailed notes for each topic. Organize your thoughts like a
          personal learning notebook.
        </p>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-20 border rounded-lg bg-muted/20">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">No notes yet</h2>
          <p className="text-muted-foreground mb-6">
            Start by creating a section in{" "}
            <span className="font-medium">Progress</span>, then return here to
            write notes.
          </p>
          <Button asChild>
            <Link href="/progress">
              Go to Progress
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((section) => (
            <div
              key={section.id}
              className="relative overflow-hidden border rounded-xl shadow-sm bg-gradient-to-br from-background to-muted/50 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="p-6 flex-1 space-y-2">
                <h2 className="text-xl font-bold line-clamp-1">
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {section.description || "No description provided"}
                </p>
              </div>
              <div className="p-4 border-t bg-muted/40">
                <Button asChild variant="secondary" className="w-full">
                  <Link href={`/note/${section.id}`}>
                    Open Notebook <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

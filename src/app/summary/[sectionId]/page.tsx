import { getCurrentUser } from "@/lib/server/auth";
import { notFound } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { getSummarySectionByIdAPI } from "@/lib/server/summary";
import BookSidebar from "./components/BookSidebar";
import BookHeader from "./components/BookHeader";
import LessonCard from "./components/LessonCard";
import { SummaryPhase, SummarySection, Topic } from "@/types";

export const dynamic = "force-dynamic";

export default async function SummaryBookPage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = await params;
  if (!sectionId) return notFound();

  const user = await getCurrentUser();
  if (!user) return;

  const section: SummarySection = await getSummarySectionByIdAPI(user.uid, sectionId);
  if (!section) return notFound();

  return (
    <div className="container mx-auto flex h-[calc(100vh-5rem)] relative">
      <div className="hidden md:block w-64 border-r">
        <BookSidebar section={section} currentTopicId={null} />
      </div>

      <div className="md:hidden flex items-start justify-between border-b px-4 py-3 absolute top-0 w-full bg-accent">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger className="p-2 -ml-2">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <BookSidebar section={section} currentTopicId={null} />
            </SheetContent>
          </Sheet>
          <h1 className="font-bold text-lg">{section.title}</h1>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <BookHeader section={section} />

        {section.phases.map((phase: SummaryPhase, i: number) => (
          <section key={phase.id} className="space-y-1">
            <h2 className="text-xl font-semibold">
              Chapter {i + 1}: {phase.title}
            </h2>
            <p className="text-sm text-muted-foreground">{phase.description}</p>

            <hr className="my-2" />

            <div className="grid gap-4">
              {phase.topics.map((topic: Topic, j: number) => (
                <LessonCard key={topic.id} index={j + 1} topic={topic} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

"use client";

import { ListVideo, BookOpen, ArrowLeft } from "lucide-react";
import { SummaryPhase, SummarySection, Topic } from "@/types";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BookSidebarProps {
  section: SummarySection;
  currentTopicId: string | null;
}

export default function BookSidebar({
  section,
  currentTopicId,
}: BookSidebarProps) {
  const { title, phases } = section;
  return (
    <aside className="h-full overflow-y-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <Button className="rounded-full" size="sm" asChild variant="secondary">
          <Link href="/summary">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="font-bold">{title}</h2>
      </div>

      <nav className="space-y-4">
        {phases.map((phase: SummaryPhase, i: number) => (
          <div key={phase.id}>
            <h3 className="font-medium mb-2">
              Chapter {i + 1}: {phase.title}
            </h3>
            <ul className="ml-2 space-y-1 text-sm">
              {phase.topics.map((topic: Topic, j: number) => {
                const isActive = currentTopicId === topic.id;
                return (
                  <li key={topic.id}>
                    <a
                      href={`#${topic.id}`}
                      className={clsx(
                        "flex items-center gap-1 rounded px-2 py-1 transition",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted/50"
                      )}
                    >
                      <ListVideo className="h-3 w-3" />
                      Lesson {j + 1}: {topic.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

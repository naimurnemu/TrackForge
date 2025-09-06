// app/summaries/page.tsx
import { getUserSectionsAPI } from "@/lib/server/sections";
import { getCurrentUser } from "@/lib/server/auth";
import { Folder, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Section } from "@/types";
import SectionCard from "./components/SectionCard";

export const dynamic = "force-dynamic";

export default async function SummariesPage() {
  const user = await getCurrentUser();
  if (!user) return;

  const sections: Section[] = await getUserSectionsAPI(user.uid);

  const sortedSections = [...sections].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  if (sections.length > 0) {
    return (
      <div className="container mx-auto px-6 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Your Learning Summaries</h1>
          <p className="text-muted-foreground">
            A journal of what you’ve learned, organized as books.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedSections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="inline-block p-4 bg-muted rounded-full mb-4">
          <Folder className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No books yet</h2>
        <p className="text-muted-foreground mb-6">
          Start by tracking your learning journey in <strong>Progress</strong>.
        </p>
        <Button asChild>
          <Link href="/progress">
            Go to Progress
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }


}

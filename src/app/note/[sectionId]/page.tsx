// app/note/[sectionId]/page.tsx
import { getCurrentUser } from "@/lib/server/auth";
import { notFound } from "next/navigation";
import NoteAccordion from "./components/NoteAccordion";

export const dynamic = "force-dynamic";

export default async function SectionNotePage({
  params,
}: {
  params: { sectionId: string };
}) {
  const user = await getCurrentUser();
  if (!user) return <div className="p-8">Not authenticated</div>;

  // Don’t fetch everything here – let accordion load per-phase
  const sectionId = params.sectionId;

  if (!sectionId) return notFound();

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-bold">Notebook</h1>
        <p className="text-muted-foreground">
          Expand a phase to reveal topics and start writing notes.
        </p>
      </div>

      <NoteAccordion sectionId={sectionId} />
    </div>
  );
}

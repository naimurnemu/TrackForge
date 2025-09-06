import { getCurrentUser } from "@/lib/server/auth";
import { notFound } from "next/navigation";
import NoteAccordion from "./components/NoteAccordion";

export const dynamic = "force-dynamic";

export default async function SectionNotePage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = await params;
  if (!sectionId) return notFound();

  const user = await getCurrentUser();
  if (!user) return;

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-bold">Notebook</h1>
        <p className="text-muted-foreground">
          Expand a phase to reveal topics and start writing notes.
        </p>
      </div>

      <NoteAccordion userId={user.uid} sectionId={sectionId} />
    </div>
  );
}

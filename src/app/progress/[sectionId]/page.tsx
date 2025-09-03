// app/progress/[sectionId]/page.tsx
import { notFound } from "next/navigation";
import { getSectionByIdAPI } from "@/lib/server/sections";
import { getCurrentUser } from "@/lib/server/auth";
import { getPhasesBySectionIdAPI } from "@/lib/server/phases";
import { PhaseList } from "./components/PhaseList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutShell } from "@/app/progress/components/LayoutShell";

export default async function SectionPage({
  params,
}: {
  params: { sectionId: string };
}) {
  const user = await getCurrentUser();
  if (!user) return <div className="container p-8">Not authenticated</div>;

  const sectionId = params.sectionId;

  const section = await getSectionByIdAPI(user.uid, sectionId);
  if (!section) return notFound();

  const phases = await getPhasesBySectionIdAPI(user.uid, sectionId);

  return (
    <LayoutShell
      title={section.title}
      subtitle="Manage phases and track your learning progress"
      showCreateButton
      createHref={`/progress/${section.id}/create`}
      createLabel="New Phase"
      createdAt={section.createdAt}
    >
      {/* Edit Section Button */}
      <div className="mt-6">
        <Button asChild variant="outline" size="sm">
          <Link href={`/progress/${section.id}/edit`}>Edit Section</Link>
        </Button>
      </div>

      {/* Phase List */}
      <div className="mt-12">
        <PhaseList phases={phases} />
      </div>
    </LayoutShell>
  );
}
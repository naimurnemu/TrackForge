import { notFound } from "next/navigation";
import { getSectionByIdAPI } from "@/lib/server/sections";
import { getCurrentUser } from "@/lib/server/auth";
import { SectionHeader } from "./components/SectionHeader";
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

  const section = await getSectionByIdAPI(user.uid, params.sectionId);
  if (!section) return notFound();

  return (
    <LayoutShell
      title={section.title}
      subtitle="Manage phases and track your learning progress"
      showCreateButton
      createHref={`/progress/${section.id}/create`}
      createLabel="New Phase"
    >
      {/* Section Header */}
      <SectionHeader
        title={section.title}
        description={section.description}
        target={section.target}
        createdAt={section.createdAt}
        progress={section.progress || 0}
      />

      {/* Edit Button */}
      <div className="mt-6">
        <Button asChild variant="outline" size="sm">
          <Link href={`/progress/${section.id}/edit`}>Edit Section</Link>
        </Button>
      </div>

      {/* Phases Placeholder */}
      <div className="mt-12">
        <PhaseList>
          {/* Will be populated with PhaseCard components in next level */}
          <div className="text-center py-8 text-muted-foreground">
            <p>Phases will appear here.</p>
            <p className="text-sm mt-1">
              <Link
                href={`/progress/${section.id}/create`}
                className="text-primary hover:underline"
              >
                Create your first phase
              </Link>{" "}
              to get started.
            </p>
          </div>
        </PhaseList>
      </div>
    </LayoutShell>
  );
}
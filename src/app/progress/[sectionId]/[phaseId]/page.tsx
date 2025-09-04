// app/progress/[sectionId]/[phaseId]/page.tsx
import { notFound } from "next/navigation";
import { getPhaseByIdAPI } from "@/lib/server/phases";
import { getTopicsByPhaseIdAPI } from "@/lib/server/topics";
import { getCurrentUser } from "@/lib/server/auth";
import { LayoutShell } from "@/app/progress/components/LayoutShell";
import { TopicList } from "./components/TopicList";
import { PhaseCard } from "./components/PhaseCard";

export default async function PhasePage({
  params,
}: {
  params: { sectionId: string; phaseId: string };
}) {
  const user = await getCurrentUser();
  if (!user) return <div className="container p-8">Not authenticated</div>;

  const phase = await getPhaseByIdAPI(user.uid, params.sectionId, params.phaseId);
  if (!phase) return notFound();

  const topics = await getTopicsByPhaseIdAPI(user.uid, params.sectionId, params.phaseId);

  console.log("topics, phase:", topics, phase);

  return (
    <LayoutShell
      title={phase.title}
      subtitle={`Phase • ${phase.type}`}
      showCreateButton
      createHref={`/progress/${params.sectionId}/${params.phaseId}/create`}
      createLabel="New Topic"
    >
      {/* Phase Details */}
      <PhaseCard phase={phase} sectionId={params.sectionId} />

      {/* Topics */}
      <TopicList topics={topics} sectionId={params.sectionId} phaseId={params.phaseId} />
    </LayoutShell>
  );
}
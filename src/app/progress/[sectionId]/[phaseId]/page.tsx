import { notFound } from "next/navigation";
import { getPhaseByIdAPI } from "@/lib/server/phases";
import { getTopicsByPhaseIdAPI } from "@/lib/server/topics";
import { getCurrentUser } from "@/lib/server/auth";
import { TopicList } from "./components/TopicList";
import PhaseHeader from "./components/PhaseHeader";

export default async function PhasePage({
  params,
}: {
  params: Promise<{ sectionId: string; phaseId: string }>;
}) {
  const { sectionId, phaseId } = await params;
  if (!sectionId || !phaseId) return notFound();

  const user = await getCurrentUser();
  if (!user) return;

  const phase = await getPhaseByIdAPI(user.uid, sectionId, phaseId);
  if (!phase) return notFound();

  const topics = await getTopicsByPhaseIdAPI(user.uid, sectionId, phaseId);

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <PhaseHeader sectionId={sectionId} phase={phase} userId={user.uid} />
      <TopicList
        topics={topics}
        userId={user.uid}
        sectionId={sectionId}
        phaseId={phaseId}
      />
    </div>
  );
}
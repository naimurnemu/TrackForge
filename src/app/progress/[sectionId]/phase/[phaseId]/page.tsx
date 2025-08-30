// src/app/progress/[sectionId]/phase/[phaseId]/page.tsx
import { getTopicsByPhase } from "@/lib/server/progress-fetchers";
import TopicItem from "../../../components/TopicItem";

export default async function PhaseDetailPage({
  params,
}: {
  params: { sectionId: string; phaseId: string };
}) {
  const { phaseId } = params;
  const { phase, topics } = await getTopicsByPhase(phaseId);

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">{phase.title}</h1>
        <p className="text-gray-600">{phase.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Topics</h2>
        <a
          href={`/progress/${params.sectionId}/phase/${phaseId}/topic/create`}
          className="text-sm text-blue-500 hover:underline"
        >
          + Add Topic
        </a>
      </div>

      <ul className="space-y-3">
        {topics.map((topic) => (
          <TopicItem key={topic.id} topic={topic} />
        ))}
      </ul>
    </div>
  );
}

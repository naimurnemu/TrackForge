// src/app/progress/[sectionId]/page.tsx
import { getPhasesBySection } from "@/lib/server/progress-fetchers";
import SectionCard from "../components/SectionCard";
import PhaseCard from "../components/PhaseCard";

export default async function SectionPage({ params }: { params: { sectionId: string } }) {
  const { sectionId } = params;
  const { section, phases } = await getPhasesBySection(sectionId);

  return (
    <div className="space-y-6">
      <SectionCard section={section} />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Phases</h2>
        <a
          href={`/progress/${sectionId}/phase/create`}
          className="text-sm text-blue-500 hover:underline"
        >
          + Add Phase
        </a>
      </div>

      <div className="grid gap-4">
        {phases.map((phase) => (
          <PhaseCard key={phase.id} phase={phase} />
        ))}
      </div>
    </div>
  );
}

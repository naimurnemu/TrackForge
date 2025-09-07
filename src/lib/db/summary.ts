import { getSectionById } from "./sections";
import { getPhasesBySection } from "./phases";
import { getTopicsByPhase } from "./topics";
import { Phase } from "@/types";

export async function getFullSectionTree(userId: string, sectionId: string) {
  if (!userId || !sectionId) throw new Error("Missing userId or sectionId");
  const section = await getSectionById(userId, sectionId);
  if (!section) return null;

  const phases = (await getPhasesBySection(userId, sectionId)).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const phasesWithTopics = await Promise.all(
    phases.map(async (phase: Phase) => {
      const topics = (await getTopicsByPhase(userId, sectionId, phase.id)).sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      return {
        ...phase,
        topics,
      };
    })
  );

  return {
    ...section,
    phases: phasesWithTopics,
  };
}

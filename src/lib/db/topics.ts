import { getPhaseTopicCollection, getPhaseTopicDoc } from "./collections";
import { Topic } from "@/types";

export async function createTopic(
  userId: string,
  sectionId: string,
  phaseId: string,
  data: Omit<Topic, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await getPhaseTopicCollection(userId, sectionId, phaseId).add({
    ...data,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef.id;
}

export async function getTopicsByPhase(
  userId: string,
  sectionId: string,
  phaseId: string
) {
  const docRef = await getPhaseTopicCollection(
    userId,
    sectionId,
    phaseId
  ).get();

  return docRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || null,
    updatedAt: doc.data().updatedAt?.toDate?.() || null,
  })) as Topic[];
}

export async function getTopicById(
  userId: string,
  sectionId: string,
  phaseId: string,
  topicId: string
) {
  const docRef = await getPhaseTopicDoc(
    userId,
    sectionId,
    phaseId,
    topicId
  ).get();

  if (!docRef.exists) {
    return null;
  }

  const data = docRef.data();
  return {
    id: docRef.id,
    ...data,
    createdAt: data?.createdAt?.toDate?.() || null,
    updatedAt: data?.updatedAt?.toDate?.() || null,
  } as Topic;
}

export async function updateTopic(
  userId: string,
  sectionId: string,
  phaseId: string,
  topicId: string,
  data: Partial<Topic>
) {
  const topicRef = getPhaseTopicDoc(userId, sectionId, phaseId, topicId);

  const payload = {
    ...data,
    updatedAt: new Date(),
  };

  await topicRef.update(payload);
  return true;
}

export async function deleteTopic(
  userId: string,
  sectionId: string,
  phaseId: string,
  topicId: string
) {
  await getPhaseTopicDoc(userId, sectionId, phaseId, topicId).delete();
  return true;
}

export async function completeTopic(
  userId: string,
  sectionId: string,
  phaseId: string,
  topicId: string, 
  summary: string,
  timeSpentMinutes: number
) {
  const topicRef = getPhaseTopicDoc(userId, sectionId, phaseId, topicId);

  const payload = {
    completed: true,
    summary,
    timeSpentMinutes,
    updatedAt: new Date(),
  };

  await topicRef.update(payload);
  return true;
}


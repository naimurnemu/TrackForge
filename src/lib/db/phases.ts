import { Phase } from "@/types";
import { getSectionPhaseCollection, getSectionPhaseDoc } from "./collections";
import { deleteDocumentWithSubcollections } from './utils';

export async function CreatePhase(
  userId: string,
  sectionId: string,
  data: Omit<Phase, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await getSectionPhaseCollection(userId, sectionId).add({
    ...data,
    complete: false,
    progress: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef.id;
}

export async function getPhasesBySection(userId: string, sectionId: string) {
  const docRef = await getSectionPhaseCollection(userId, sectionId).get();

  return docRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || null,
    updatedAt: doc.data().updatedAt?.toDate?.() || null,
  })) as Phase[];
}

export async function getPhaseById(
  userId: string,
  sectionId: string,
  phaseId: string
) {
  const docRef = await getSectionPhaseDoc(userId, sectionId, phaseId).get();

  if (!docRef.exists) {
    return null;
  }

  const data = docRef.data();
  return {
    id: docRef.id,
    ...data,
    createdAt: data?.createdAt?.toDate?.() || null,
    updatedAt: data?.updatedAt?.toDate?.() || null,
  } as Phase;
}

export async function updatePhase(
  userId: string,
  sectionId: string,
  phaseId: string,
  data: Partial<Phase>
) {
  await getSectionPhaseDoc(userId, sectionId, phaseId).update({
    ...data,
    updatedAt: new Date(),
  });

  return true;
}

export async function deletePhase(
  userId: string,
  sectionId: string,
  phaseId: string
) {
  const phaseRef = getSectionPhaseDoc(userId, sectionId, phaseId);
  await deleteDocumentWithSubcollections(phaseRef);
  return true;
}

import { Section } from "@/types";
import { sectionsCol } from "./collections";

export async function createSection(
  data: Omit<Section, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await sectionsCol.add({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef.id;
}

export async function getUserSections(userId: string) {
  const snap = await sectionsCol.where("userId", "==", userId).get();
  return snap.docs.map((doc) => ({ ...(doc.data() as Section), id: doc.id }));
}

export async function getSectionById(sectionId: string) {
  const docRef = await sectionsCol.doc(sectionId).get();
  return docRef.exists ? { ...(docRef.data() as Section), id: docRef.id } : null;
}

export async function updateSection(sectionId: string, updates: Partial<Section>) {
  await sectionsCol.doc(sectionId).update({
    ...updates,
    updatedAt: new Date(),
  });
  return true;
}

export async function deleteSection(sectionId: string) {
  await sectionsCol.doc(sectionId).delete();
  return true;
}

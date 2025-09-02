import { Section } from "@/types";
import { getUserSectionCollection, getUserSectionDoc } from "./collections";
import { deleteDocumentWithSubcollections } from "./utils"; // Recursive delete helper

export async function createSection(
  userId: string,
  data: Omit<Section, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await getUserSectionCollection(userId).add({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef.id;
}

export async function getUserSections(userId: string) {
  const snap = await getUserSectionCollection(userId).get(); 

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || null,
    updatedAt: doc.data().updatedAt?.toDate?.() || null,
  })) as Section[];
}

export async function getSectionById(userId: string, sectionId: string) {
  const docRef = await getUserSectionDoc(userId, sectionId).get();

  if (!docRef.exists) {
    return null;
  }

  const data = docRef.data();
  return {
    id: docRef.id,
    ...data,
    createdAt: data?.createdAt?.toDate?.() || null,
    updatedAt: data?.updatedAt?.toDate?.() || null,
  };
}

export async function updateSection(
  userId: string,
  sectionId: string,
  data: Partial<Section>
) {
  await getUserSectionDoc(userId, sectionId).update({
    ...data,
    updatedAt: new Date(),
  });

  return true;
}

export async function deleteSection(userId: string, sectionId: string) {
  const sectionRef = getUserSectionDoc(userId, sectionId);
  await deleteDocumentWithSubcollections(sectionRef);
  return true;
}

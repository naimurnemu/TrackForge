import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { Section } from "@/types";

const sectionsCol = collection(db, "sections");

export async function createSection(
  data: Omit<Section, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await addDoc(sectionsCol, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserSections(userId: string) {
  const q = query(sectionsCol, where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ ...(doc.data() as Section), id: doc.id }));
}

export async function getSectionById(sectionId: string) {
  const ref = doc(db, "sections", sectionId);
  const snap = await getDoc(ref);
  return snap.exists() ? { ...(snap.data() as Section), id: snap.id } : null;
}

export async function updateSection(sectionId: string, updates: Partial<Section>) {
  const ref = doc(db, "sections", sectionId);
  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
  return true;
}

export async function deleteSection(sectionId: string) {
  const ref = doc(db, "sections", sectionId);
  await deleteDoc(ref);
  return true;
}

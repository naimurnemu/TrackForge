import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

// Create a new section
export const createSection = async (data: {
  title: string;
  description: string;
  target: string;
  userId: string;
}): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "sections"), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id; 
  } catch (error) {
    throw new Error("Failed to create section", { cause: error });
  }
};

// Get all sections for a user
export const getUserSections = async (userId: string) => {
  try {
    const q = query(collection(db, "sections"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate
        ? doc.data().createdAt.toDate()
        : new Date(),
    }));
  } catch (error) {
    console.error("Failed to fetch section",{ cause: error });
    return [];
  }
};

import { getUserProgressCollection, getUserProgressDoc } from "./collections";
import { FieldValue } from "firebase-admin/firestore";

export async function getDailyProgress(userId: string, day: string) {
  if (!userId || !day) return null;
  const doc = await getUserProgressDoc(userId, day).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export async function getMonthlyProgress(
  userId: string,
  year: number,
  month: number
) {
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const endMonth = month === 12 ? 1 : month + 1;
  const endYear = month === 12 ? year + 1 : year;
  const end = `${endYear}-${String(endMonth).padStart(2, "0")}-01`;

  const snap = await getUserProgressCollection(userId)
    .where("date", ">=", start)
    .where("date", "<", end)
    .orderBy("date", "asc")
    .get();

  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateProgress(
  userId: string,
  phaseId: string,
  spentTime: number
) {
  const today = new Date().toISOString().split("T")[0];
  const progressRef = getUserProgressDoc(userId, today);

  await progressRef.set(
    {
      date: today,
      totalTimeSpent: FieldValue.increment(spentTime),
      totalCompletedTopic: FieldValue.increment(1),
      interactedPhases: FieldValue.arrayUnion(phaseId),
    },
    { merge: true }
  );

  return true;
}

import { DocumentReference } from "firebase-admin/firestore";

/**
 * Recursively deletes a Firestore document and all its subcollections.
 * WARNING: This is not atomic and may require retries for large data.
 */
export async function deleteDocumentWithSubcollections(
  ref: DocumentReference
): Promise<void> {
  const doc = await ref.get();
  if (!doc.exists) return;

  const batch = ref.firestore.batch();

  const collections = await ref.listCollections();
  for (const collection of collections) {
    const snap = await collection.get();
    snap.docs.forEach((subDoc) => {
      batch.delete(subDoc.ref);
    });
  }

  await batch.commit();

  await ref.delete();
}
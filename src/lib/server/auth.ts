import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decoded; 
  } catch {
    return null;
  }
}

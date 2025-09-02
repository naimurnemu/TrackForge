// admin.ts or server-side Firebase
import {
  initializeApp as initializeAdminApp,
  getApps,
  cert,
} from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";

const adminApp =
  getApps().length === 0
    ? initializeAdminApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      })
    : getApps()[0];

export const adminAuth = getAdminAuth(adminApp);
export const adminDB = getAdminFirestore(adminApp); 

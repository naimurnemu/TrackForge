import { adminAuth } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(idToken);
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (err) {
    console.error("Google auth error:", err);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}

import { adminAuth } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { idToken, expiresIn = 60 * 60 * 24 * 7 } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "ID token required" }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(idToken);

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: expiresIn * 1000,
    });

    const response = NextResponse.json({ status: "success", uid: decoded.uid });
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn,
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (err) {
    console.error("Session error:", err);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}

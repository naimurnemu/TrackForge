import { adminAuth } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { idToken, expiresIn = 60 * 60 * 24 * 7 } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    const decode = await adminAuth.verifyIdToken(idToken);

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: expiresIn * 1000,
    });

    const response = NextResponse.json({
      status: "success",
      user: decode,
      token: sessionCookie,
    });

    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn * 1000,
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}

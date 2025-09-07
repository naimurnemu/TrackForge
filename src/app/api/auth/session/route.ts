import { errorResponse, successResponse } from "@/lib/api/response";
import { adminAuth } from "@/lib/firebase-admin";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { idToken, expiresIn = 60 * 60 * 24 * 7 } = await req.json();

    if (!idToken) return errorResponse("Missing idToken", 400);

    const decode = await adminAuth.verifyIdToken(idToken);

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: expiresIn * 1000,
    });

    const response = successResponse(
      { status: "success", user: decode, token: sessionCookie },
      "Success",
      200
    );

    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn * 1000,
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return errorResponse("Auth failed", 500, error);
  }
}

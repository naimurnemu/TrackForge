import { errorResponse, successResponse } from "@/lib/api/response";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { idToken, expiresIn = 60 * 60 * 24 * 7 } = await req.json();

    if (!idToken) {
      return errorResponse("Missing idToken", 400);
    }

    const decoded = await adminAuth.verifyIdToken(idToken);

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: expiresIn * 1000,
    });

    const response = successResponse(
      { status: "success", user: decoded, token: sessionCookie },
      "Success signed in with Google auth",
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
    return errorResponse("Google Auth sign in failed", 500, error);
  }
}

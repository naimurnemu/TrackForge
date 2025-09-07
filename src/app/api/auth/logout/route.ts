import { successResponse } from "@/lib/api/response";

export async function POST() {
  const response = successResponse({ status: "success" }, "Successfully logged out", 200);

  response.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
    sameSite: "strict",
  });

  return response;
}

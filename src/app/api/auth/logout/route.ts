import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ status: "success" });

  response.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
    sameSite: "strict",
  });

  return response;
}



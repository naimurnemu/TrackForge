import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/progress", "/summaries", "/notes"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("session")?.value;

  if (pathname === "/auth" && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (protectedPaths.some(path => pathname.startsWith(path))) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth",
    "/dashboard/:path*",
    "/progress/:path*",
    "/summaries/:path*",
    "/notes/:path*",
  ],
};

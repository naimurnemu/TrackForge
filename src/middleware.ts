import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/progress", "/summaries", "/notes"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("session")?.value;

  console.log(pathname, session, session ? "has session" : "no session");

  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!session && protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/progress/:path*",
    "/summaries/:path*",
    "/notes/:path*",
  ],
};

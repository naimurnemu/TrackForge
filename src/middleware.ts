import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/progress", "/summary", "/note"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("middleware", pathname);
  const session = req.cookies.get("session")?.value;

  if (session && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!session && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/progress/:path*",
    "/summary/:path*",
    "/note/:path*",
  ],
};

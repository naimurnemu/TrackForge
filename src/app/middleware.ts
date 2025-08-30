import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/progress", "/summaries", "/notes"];

export function middleware(req: NextRequest) {
  console.log("from middleware: ", req)
  try {
    const session = req.cookies.get("session")?.value;
    console.log(session)
    // if (session) {
    //   const decodedClaims = getAuth().verifySessionCookie(session, true);
    //   console.log("Decoded claims:", decodedClaims);
    // }
  } catch(err) {
    console.error("Session error:", err);
  }
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("session")?.value;
  console.log("Pathname:", pathname);

  console.log("Session:", session);

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

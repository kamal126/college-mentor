import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const isMentor = token?.isMentor === true;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (pathname === "/signin" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname === "/dashboard/expert" && isMentor) {
    return NextResponse.redirect(new URL("/dashboard/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin"],
};

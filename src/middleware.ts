import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SessionData, sessionOptions } from "@/lib/session-options";

const protectedAuthRoutes = ["/login"];
const protectedUserRoutes = [
  "/dashboard",
  "/profile",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const isLoggedIn = session.isLoggedIn;

  if (isLoggedIn) {
    if (protectedAuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/dashboard`, req.url));
    }
  }
  if (!isLoggedIn) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (protectedUserRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL(`/login`, req.url));
    }
  }
}
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getCurrentSessionServerSide } from "./lib/session"

const unprotectedPaths = [
  "/",
  "/auth/google/callback",
  "/login",
  "/signup",
  "/auth/verify-account",
  "/account-verification",
]

const authPaths = [
  "/auth/google/callback",
  "/login",
  "/signup",
  "/auth/verify-account",
  "/account-verification",
]

export async function middleware(req: NextRequest) {
  const session = await getCurrentSessionServerSide()

  // if user is logged in, prevent them from visiting auth related paths
  if (
    session &&
    authPaths.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // if user is not logged in, redirect them to the login page if they are on a protected path.
  // also attach a `from` searchParam so we know where to redirect the user after
  // logging in
  if (
    !session &&
    !unprotectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    const url = new URL("/login", req.url)
    url.searchParams.set("from", req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

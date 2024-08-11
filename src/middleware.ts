import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getCurrentSessionServerSide } from "./lib/session"

const unprotectedPaths = ["/", "/auth/google/callback", "/login", "/signup"]

export async function middleware(req: NextRequest) {
  const session = await getCurrentSessionServerSide()

  // if user is logged in, prevent them from visiting the login and signup pages
  if (
    session &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // if user is not logged in, redirect them to the login page if they are on a protected path.
  // also attach a `from` searchParam so we know where to redirect the user after
  // logging in
  if (!session && !unprotectedPaths.includes(req.nextUrl.pathname)) {
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
     * - auth/google/callback (callback for google oauth flow)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth/google/callback).*)",
  ],
}

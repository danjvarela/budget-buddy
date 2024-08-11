import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AUTH_PATHS, PATHS_TO_OMIT } from "./lib/constants"
import { getCurrentSessionServerSide } from "./lib/session"

function isAuthPath(path: string) {
  return AUTH_PATHS.includes(path)
}

function isPathProtected(path: string) {
  if (path === "/test") return false
  return path !== "/" && !isAuthPath(path)
}

export async function middleware(req: NextRequest) {
  const session = await getCurrentSessionServerSide()
  const path = req.nextUrl.pathname

  if (PATHS_TO_OMIT.includes(path)) {
    return NextResponse.next()
  }

  // if user is logged in, prevent them from visiting auth related paths
  if (session && isAuthPath(path)) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // if user is not logged in, redirect them to the login page if they are on a protected path.
  // also attach a `from` searchParam so we know where to redirect the user after
  // logging in
  if (!session && isPathProtected(path)) {
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

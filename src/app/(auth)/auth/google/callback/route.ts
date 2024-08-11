import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
import { api } from "@/lib/api"
import {
  OAUTH_MODE_COOKIE_NAME,
  POST_AUTH_URL_COOKIE_NAME,
} from "@/lib/constants"
import { saveTokenToCookie } from "@/lib/session"

export async function GET(req: NextRequest) {
  let token: string | null = ""

  try {
    const searchParams = req.nextUrl.searchParams
    const code = searchParams.get("code")
    const res = await api.post("auth/google/callback", {
      json: {
        code,
        redirect_uri: new URL("/auth/google/callback", req.nextUrl),
      },
    })

    token = res.headers.get("Authorization")
  } catch (err) {}

  const redirectUrlAfterSignIn = new URL(
    cookies().get(POST_AUTH_URL_COOKIE_NAME)?.value ?? "",
    req.nextUrl
  )

  if (token) {
    saveTokenToCookie(token)
    // we don't need this cookie now since we have finished google oauth flow
    cookies().delete(POST_AUTH_URL_COOKIE_NAME)
    redirect(redirectUrlAfterSignIn.toString())
  } else {
    const newRedirectUrl = new URL(
      cookies().get(OAUTH_MODE_COOKIE_NAME)?.value || "/login",
      req.nextUrl
    )
    newRedirectUrl.searchParams.set("error", "Access denied")
    newRedirectUrl.searchParams.set("from", redirectUrlAfterSignIn.toString())
    redirect(newRedirectUrl.toString())
  }
}

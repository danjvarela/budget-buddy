import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import api from "@/lib/api"
import { POST_AUTH_URL_COOKIE_NAME } from "@/lib/constants"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const code = searchParams.get("code")
    const { response } = await api.post("/auth/google/callback", {
      code,
      redirect_uri: new URL("/auth/google/callback", req.nextUrl),
    })

    const token = response.headers.get("Authorization")

    if (!response.ok || !token) {
      return NextResponse.json({}, { status: 500 })
    }

    api.authenticate(token)
  } catch (err) {
    return NextResponse.json({}, { status: 500 })
  }

  const redirectUrl = cookies().get(POST_AUTH_URL_COOKIE_NAME)

  if (redirectUrl?.value) {
    // we don't need this cookie now since we have finished google oauth flow
    cookies().delete(POST_AUTH_URL_COOKIE_NAME)
  }

  redirect(redirectUrl?.value || "/")
}

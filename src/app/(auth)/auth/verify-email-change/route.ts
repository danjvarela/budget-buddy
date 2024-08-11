import { NextRequest, NextResponse } from "next/server"
import api, { ErrorResponse, SuccessResponse } from "@/lib/api"
import { getCurrentSessionServerSide } from "@/lib/session"
import { logout } from "../../actions"

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key")
  const session = await getCurrentSessionServerSide()

  if (!key) {
    return NextResponse.json(null, { status: 500 })
  }

  const redirectUrl = new URL("/login", req.url)

  try {
    const { data, response } = await api.post<SuccessResponse | ErrorResponse>(
      "/verify-login-change",
      { key }
    )

    if (response.ok) {
      if ("success" in data) {
        redirectUrl.searchParams.set("success", data.success)
      }
      await logout()
      return NextResponse.redirect(redirectUrl)
    }

    if ("error" in data) {
      if (session) {
        const loggedInRedirectUrl = new URL("/dashboard", req.url)
        loggedInRedirectUrl.searchParams.set("error", data.error)
        return NextResponse.redirect(loggedInRedirectUrl)
      }

      redirectUrl.searchParams.set("error", data.error)
      return NextResponse.redirect(redirectUrl)
    }
  } catch (err) {
    return NextResponse.json(null, { status: 500 })
  }
}

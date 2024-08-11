import { NextRequest, NextResponse } from "next/server"
import { HTTPError } from "ky"
import { DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action"
import { api } from "@/lib/api"
import { generateHTTPErrMessage } from "@/lib/safe-action"

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key")

  const redirectUrl = new URL("/login", req.url)

  if (!key) {
    redirectUrl.searchParams.set(
      "error",
      "Account verification link is malformed. You can try to resend a new verification email link."
    )
    return NextResponse.redirect(redirectUrl)
  }

  try {
    const data = await api
      .post("verify-account", { json: { key } })
      .json<SuccessResponse>()

    redirectUrl.searchParams.set("success", data.success)
  } catch (err) {
    if (err instanceof HTTPError) {
      const errMessage = await generateHTTPErrMessage(err)
      redirectUrl.searchParams.set("error", errMessage)
    } else {
      redirectUrl.searchParams.set("error", DEFAULT_SERVER_ERROR_MESSAGE)
    }
  }

  return NextResponse.redirect(redirectUrl)
}

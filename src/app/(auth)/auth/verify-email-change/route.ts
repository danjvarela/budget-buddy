import { NextRequest, NextResponse } from "next/server"
import { logoutAction } from "@/actions/auth"
import { HTTPError } from "ky"
import { DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action"
import { api } from "@/lib/api"
import { generateHTTPErrMessage } from "@/lib/safe-action"

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key")

  const successRedirectUrl = new URL("/login", req.nextUrl)
  const failureRedirectUrl = new URL("/dashboard", req.nextUrl)

  if (!key) {
    failureRedirectUrl.searchParams.set(
      "error",
      "Change email verification link is malformed."
    )
    return NextResponse.redirect(failureRedirectUrl)
  }

  let data: SuccessResponse | undefined = undefined

  try {
    data = await api
      .post("verify-login-change", { json: { key } })
      .json<SuccessResponse>()
    successRedirectUrl.searchParams.set("success", data.success)
  } catch (err) {
    if (err instanceof HTTPError) {
      const errMessage = await generateHTTPErrMessage(err)
      failureRedirectUrl.searchParams.set("error", errMessage)
    } else {
      failureRedirectUrl.searchParams.set("error", DEFAULT_SERVER_ERROR_MESSAGE)
    }
  }

  if (data?.success) {
    // we can't call logout inside a try-catch block
    await logoutAction()
    return NextResponse.redirect(successRedirectUrl)
  }

  return NextResponse.redirect(failureRedirectUrl)
}

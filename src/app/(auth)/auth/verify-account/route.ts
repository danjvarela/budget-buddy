import { NextRequest, NextResponse } from "next/server"
import api, { ErrorResponse, SuccessResponse } from "@/lib/api"

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key")

  if (!key) {
    return NextResponse.json(null, { status: 500 })
  }

  const redirectUrl = new URL("/login", req.url)

  try {
    const { data, response } = await api.post<SuccessResponse | ErrorResponse>(
      "/verify-account",
      { key }
    )

    if (response.ok) {
      if ("success" in data) {
        redirectUrl.searchParams.set("success", data.success)
      }
      return NextResponse.redirect(redirectUrl)
    }

    if ("error" in data) {
      redirectUrl.searchParams.set("error", data.error)
      return NextResponse.redirect(redirectUrl)
    }
  } catch (err) {
    return NextResponse.json(null, { status: 500 })
  }
}

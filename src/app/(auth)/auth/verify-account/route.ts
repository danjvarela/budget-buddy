import { NextRequest, NextResponse } from "next/server"
import api from "@/lib/api"

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key")

  if (!key) {
    return NextResponse.json(null, { status: 500 })
  }

  const redirectUrl = new URL("/login", req.url)

  try {
    const { response } = await api.post("/verify-account", { key })

    if (response.ok) {
      redirectUrl.searchParams.set("message", "account-verification-success")
      return NextResponse.redirect(redirectUrl)
    }

    if (response.status.toString().startsWith("4")) {
      redirectUrl.searchParams.set("message", "account-verification-fail")
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.json(null, { status: 500 })
  } catch (err) {
    return NextResponse.json(null, { status: 500 })
  }
}

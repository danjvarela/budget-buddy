import { NextRequest, NextResponse } from "next/server"
import api from "@/lib/api"

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key")

  if (!key) {
    return NextResponse.redirect(
      new URL("/account-verification/nokey", req.url)
    )
  }

  try {
    const { response } = await api.post("/verify-account", { key })

    if (response.ok) {
      return NextResponse.redirect(
        new URL("/account-verification/success", req.url)
      )
    }

    if (response.status.toString().startsWith("4")) {
      return NextResponse.redirect(
        new URL("account-verification/fail", req.url)
      )
    }

    return NextResponse.json(null, { status: 500 })
  } catch (err) {
    return NextResponse.json(null, { status: 500 })
  }
}

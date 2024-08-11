import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import api from "@/lib/api"

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

  redirect("/")
}

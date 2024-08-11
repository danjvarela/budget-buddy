import { cookies } from "next/headers"
import api from "./api"
import { SESSION_COOKIE_NAME } from "./constants"

export type Session = {
  email: string
  id: number
  status: "verified" | "unverified"
}

export async function getCurrentSessionServerSide() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)

  if (!sessionCookie?.value) return null

  const { data, response } = await api.get<Session>("/current-account")

  if (!response.ok) {
    return null
  }

  return data
}

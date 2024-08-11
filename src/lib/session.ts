import { cookies } from "next/headers"
import { api } from "./api"
import { SESSION_COOKIE_NAME } from "./constants"

export function generateAuthorizationHeader() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)

  if (!sessionCookie?.value) return null

  return `Bearer ${sessionCookie.value}`
}

export async function getCurrentSessionServerSide() {
  const authHeader = generateAuthorizationHeader()

  if (!authHeader) return null

  try {
    const { data } = await api
      .get("current-account", { headers: { Authorization: authHeader } })
      .json<{ data: Session }>()
    return data
  } catch (err) {
    return null
  }
}

export async function saveTokenToCookie(token: string) {
  cookies().set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  })
}

"use server"

import { cookies } from "next/headers"
import api, { ErrorResponse, SuccessResponse } from "@/lib/api"
import { SESSION_COOKIE_NAME } from "@/lib/constants"

export async function logout() {
  try {
    const { data } = await api.post<SuccessResponse | ErrorResponse>(
      "/logout",
      {}
    )

    if ("error" in data) return data

    cookies().delete(SESSION_COOKIE_NAME)
    api.token = undefined

    return data
  } catch (err) {
    console.error(err)
    return {
      error: "Something went wrong, please try again.",
    }
  }
}

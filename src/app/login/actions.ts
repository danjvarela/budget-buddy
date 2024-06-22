"use server"

import { cookies } from "next/headers"
import api from "@/lib/api"
import { POST_AUTH_URL_COOKIE_NAME } from "@/lib/constants"

export async function login(body: { email: string; password: string }) {
  try {
    const { data, response } = await api.post<{ success: string }>(
      "/login",
      body
    )
    if (response.ok) {
      const token = response.headers.get("Authorization")

      if (token) {
        api.authenticate(token)
        return data
      }

      return {
        error:
          "Logged in successfully but there is something wrong with the server.",
      }
    }

    if (response.status.toString().startsWith("4")) {
      return {
        error: "Incorrect email or password",
      }
    }

    return {
      error: "Something went wrong, please try again.",
    }
  } catch (err) {
    return { error: "Something went wrong, please try again." }
  }
}

export async function getGoogleAuthorizationURL({
  redirectUrlAfterLogin,
}: {
  redirectUrlAfterLogin?: string
}) {
  // we'll set this cookie so we can pick this up when user has been redirected to /auth/google/callback
  // after successfully authenticating with google
  if (redirectUrlAfterLogin) {
    cookies().set({
      name: POST_AUTH_URL_COOKIE_NAME,
      value: redirectUrlAfterLogin,
      sameSite: "lax",
    })
  }

  try {
    const { data, response } = await api.post<{ authorize_url: string }>(
      "/auth/google",
      {}
    )

    if (response.ok) {
      return { authorizeUrl: data.authorize_url }
    }

    return { error: "Something went wrong, please try again." }
  } catch (err) {
    return { error: "Something went wrong, please try again." }
  }
}

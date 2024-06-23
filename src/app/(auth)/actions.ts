"use server"

import { cookies } from "next/headers"
import api, { ErrorResponse, SuccessResponse } from "@/lib/api"
import { POST_AUTH_URL_COOKIE_NAME } from "@/lib/constants"

export async function resendVerificationEmail({ email }: { email: string }) {
  try {
    const { data } = await api.post<SuccessResponse | ErrorResponse>(
      "/verify-account-resend",
      {
        email,
      }
    )

    return data
  } catch (err) {
    console.error(err)
    return {
      error: "Something went wrong, please try again.",
    }
  }
}

export async function signup({
  email,
  password,
  passwordConfirmation,
}: {
  email: string
  password: string
  passwordConfirmation: string
}) {
  try {
    const { data } = await api.post<SuccessResponse | ErrorResponse>(
      "/create-account",
      {
        email,
        password,
        ["password-confirm"]: passwordConfirmation,
      }
    )

    return data
  } catch (err) {
    console.error(err)
    return { error: "Something went wrong, please try again." }
  }
}

export async function login(body: { email: string; password: string }) {
  try {
    const { data, response } = await api.post<SuccessResponse | ErrorResponse>(
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
    console.error(err)
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
    const { data, response } = await api.post<
      { authorize_url: string } | ErrorResponse
    >("/auth/google", {})

    if (response.ok && "authorize_url" in data) {
      return { authorizeUrl: data.authorize_url }
    }

    return { error: "Something went wrong, please try again." }
  } catch (err) {
    console.error(err)
    return { error: "Something went wrong, please try again." }
  }
}

"use server"

import { cookies } from "next/headers"
import {
  loginSchema,
  requestPasswordResetSchema,
  resendVerificationEmailSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/schemas/auth"
import { z } from "zod"
import { api } from "@/lib/api"
import {
  OAUTH_MODE_COOKIE_NAME,
  POST_AUTH_URL_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from "@/lib/constants"
import { actionClient } from "@/lib/safe-action"
import { saveTokenToCookie } from "@/lib/session"

export const signupAction = actionClient
  .schema(signupSchema)
  .action(async function ({ parsedInput }) {
    return await api
      .post("create-account", {
        json: parsedInput,
      })
      .json<SuccessResponse>()
  })

export const getGoogleAuthorizationURLAction = actionClient
  .schema(
    z.object({
      redirectUrlAfterLogin: z.string().optional(),
      mode: z.enum(["login", "signup"]),
    })
  )
  .action(async function ({ parsedInput: { redirectUrlAfterLogin, mode } }) {
    // we'll set this cookie so we can pick this up when user has been redirected to /auth/google/callback
    // after successfully authenticating with google
    if (redirectUrlAfterLogin) {
      cookies().set({
        name: POST_AUTH_URL_COOKIE_NAME,
        value: redirectUrlAfterLogin,
        sameSite: "lax",
      })
    }

    cookies().set({
      name: OAUTH_MODE_COOKIE_NAME,
      value: `/${mode}`,
      sameSite: "lax",
    })

    const res = await api.post("auth/google").json<{ authorize_url: string }>()

    return { authorizeUrl: res.authorize_url }
  })

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async function ({ parsedInput }) {
    const res = await api.post("login", { json: parsedInput })

    const token = res.headers.get("Authorization")

    if (token) {
      saveTokenToCookie(token)
      return await res.json<SuccessResponse>()
    } else {
      throw new Error()
    }
  })

export const requestPasswordResetAction = actionClient
  .schema(requestPasswordResetSchema)
  .action(async function ({ parsedInput }) {
    return await api
      .post("reset-password-request", { json: parsedInput })
      .json<SuccessResponse>()
  })

export const resendVerificationEmailAction = actionClient
  .schema(resendVerificationEmailSchema)
  .action(async function ({ parsedInput }) {
    return await api
      .post("verify-account-resend", { json: parsedInput })
      .json<SuccessResponse>()
  })

export const resetPasswordAction = actionClient
  .schema(resetPasswordSchema)
  .action(async function ({ parsedInput }) {
    return await api
      .post("reset-password", { json: parsedInput })
      .json<SuccessResponse>()
  })

export const logoutAction = actionClient.action(async function () {
  const data = await api.post("logout").json<SuccessResponse>()
  cookies().delete(SESSION_COOKIE_NAME)
  return data
})

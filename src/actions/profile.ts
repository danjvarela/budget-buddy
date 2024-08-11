"use server"

import {
  changePasswordSchema,
  deleteAccountSchema,
  requestChangeEmailSchema,
} from "@/schemas/profile"
import { api } from "@/lib/api"
import { authActionClient } from "@/lib/safe-action"
import { logoutAction } from "./auth"

export const requestChangeEmailAction = authActionClient
  .schema(requestChangeEmailSchema)
  .action(async function ({ parsedInput, ctx }) {
    return await api
      .post("change-login", {
        json: parsedInput,
        headers: { Authorization: ctx.authorizationHeader },
      })
      .json<SuccessResponse>()
  })

export const changePasswordAction = authActionClient
  .schema(changePasswordSchema)
  .action(async function ({ parsedInput, ctx }) {
    return await api
      .post("change-password", {
        json: parsedInput,
        headers: { Authorization: ctx.authorizationHeader },
      })
      .json<SuccessResponse>()
  })

export const deleteAccountAction = authActionClient
  .schema(deleteAccountSchema)
  .action(async function ({ parsedInput, ctx }) {
    const data = await api
      .post("close-account", {
        json: parsedInput,
        headers: { Authorization: ctx.authorizationHeader },
      })
      .json<SuccessResponse>()
    await logoutAction()
    return data
  })

"use server"

import { redirect } from "next/navigation"
import api, { ErrorResponse, SuccessResponse } from "@/lib/api"
import { logout } from "@/app/(auth)/actions"

export async function requestChangeEmail(dataToSubmit: {
  email: string
  password: string
}) {
  try {
    const { data } = await api.post<SuccessResponse | ErrorResponse>(
      "/change-login",
      dataToSubmit
    )

    return data
  } catch (err) {
    console.error(err)
    return { error: "Something went wrong, please try again." }
  }
}

export async function changePassword(dataToSubmit: {
  password: string
  "new-password": string
  "password-confirm": string
}) {
  try {
    const { data } = await api.post<SuccessResponse | ErrorResponse>(
      "/change-password",
      dataToSubmit
    )

    return data
  } catch (err) {
    console.error(err)
    return { error: "Something went wrong, please try again." }
  }
}

export async function deleteAccount(dataToSubmit: { password: string }) {
  try {
    const { data, response } = await api.post<SuccessResponse | ErrorResponse>(
      "/close-account",
      dataToSubmit
    )

    if (response.ok) {
      await logout()
    }

    return data
  } catch (err) {
    console.error(err)
    return { error: "Something went wrong, please try again." }
  }
}

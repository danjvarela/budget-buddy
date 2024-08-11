"use server"

import api, { ErrorResponse, SuccessResponse } from "@/lib/api"

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

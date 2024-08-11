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

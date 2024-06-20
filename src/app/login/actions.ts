"use server"

import api from "@/lib/api"

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

import { cookies } from "next/headers"
import { env } from "@/env.mjs"
import { SESSION_COOKIE_NAME } from "./constants"

export type SuccessResponse<T = {}> = T & {
  success: string
}

export type ErrorResponse<T = {}> = T & {
  error: string
  "field-error": string[]
}

class BudgetBuddyApi {
  private resolvePath(path: string) {
    return new URL(path, env.BACKEND_URL).toString()
  }

  private getToken() {
    return cookies().get(SESSION_COOKIE_NAME)?.value
  }

  private async httpReq<T>(
    path: string,
    opts: Omit<RequestInit, "body"> & { body?: unknown }
  ) {
    const headers: RequestInit["headers"] = {
      Accept: "application/json",
      "Content-type": "application/json; charset=UTF-8",
    }

    const token = this.getToken()

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(this.resolvePath(path), {
      ...opts,
      headers: {
        ...headers,
        ...opts.headers,
      },
      body: opts.body ? JSON.stringify(opts.body) : null,
    })

    return {
      data: (await response.json()) as unknown as T,
      response,
    }
  }

  authenticate(token: string) {
    cookies().set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    })
  }

  async get<T>(url: string, opts?: Omit<RequestInit, "method">) {
    return await this.httpReq<T>(url, { method: "GET", ...opts })
  }

  async post<T>(
    url: string,
    body: unknown,
    opts?: Omit<RequestInit, "body" | "method">
  ) {
    return await this.httpReq<T>(url, { body, method: "POST", ...opts })
  }

  async put<T>(
    url: string,
    body: BodyInit,
    opts?: Omit<RequestInit, "body" | "method">
  ) {
    return await this.httpReq<T>(url, { body, method: "PUT", ...opts })
  }

  async patch<T>(
    url: string,
    body: BodyInit,
    opts?: Omit<RequestInit, "body" | "method">
  ) {
    return await this.httpReq<T>(url, { body, method: "PATCH", ...opts })
  }

  async delete(url: string, opts: Omit<RequestInit, "method">) {
    return await this.httpReq<null>(url, { method: "DELETE", ...opts })
  }
}

const api = new BudgetBuddyApi()

export default api

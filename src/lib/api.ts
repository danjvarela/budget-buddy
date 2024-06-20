import { env } from "@/env.mjs"

class BudgetBuddyApi {
  token?: string

  private resolvePath(path: string) {
    return new URL(path, env.BACKEND_URL).toString()
  }

  private async httpReq<T>(path: string, opts: RequestInit) {
    const response = await fetch(this.resolvePath(path), {
      ...opts,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${this.token ? this.token : ""}`,
        ...opts.headers,
      },
      body: opts.body ? JSON.stringify(opts.body) : null,
    })

    return {
      data:
        opts.method?.toLowerCase() === "delete"
          ? null
          : ((await response.json()) as unknown as T),
      ...response,
    }
  }

  authenticate(token: string) {
    this.token = token
  }

  async get<T>(url: string, opts: Omit<RequestInit, "method">) {
    return await this.httpReq<T>(url, { method: "GET", ...opts })
  }

  async post<T>(
    url: string,
    body: BodyInit,
    opts: Omit<RequestInit, "body" | "method">
  ) {
    return await this.httpReq<T>(url, { body, method: "POST", ...opts })
  }

  async put<T>(
    url: string,
    body: BodyInit,
    opts: Omit<RequestInit, "body" | "method">
  ) {
    return await this.httpReq<T>(url, { body, method: "PUT", ...opts })
  }

  async patch<T>(
    url: string,
    body: BodyInit,
    opts: Omit<RequestInit, "body" | "method">
  ) {
    return await this.httpReq<T>(url, { body, method: "PATCH", ...opts })
  }

  async delete(url: string, opts: Omit<RequestInit, "method">) {
    return await this.httpReq<null>(url, { method: "DELETE", ...opts })
  }
}

const api = new BudgetBuddyApi()

export default api

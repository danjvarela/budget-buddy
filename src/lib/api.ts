import { env } from "@/env.mjs"
import ky from "ky"

export const api = ky.create({
  prefixUrl: env.BACKEND_URL,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json",
  },
})

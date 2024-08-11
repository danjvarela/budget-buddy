import { HTTPError } from "ky"
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action"
import { z } from "zod"
import { generateAuthorizationHeader } from "./session"

const errorSchema = z.object({
  error: z.string(),
  "field-error": z.array(z.string()).optional(),
})

export async function generateHTTPErrMessage(e: HTTPError) {
  const res = await e.response.json()

  const parsedResponse = errorSchema.safeParse(res)

  if (parsedResponse.success) {
    const parsedErr = parsedResponse.data
    return parsedErr["field-error"]
      ? `${parsedErr.error}: ${parsedErr["field-error"][1]}`
      : parsedErr.error
  } else {
    return `${e.name}: ${e.message}`
  }
}

export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",

  async handleReturnedServerError(e) {
    if (e instanceof HTTPError) {
      return generateHTTPErrMessage(e)
    } else {
      return DEFAULT_SERVER_ERROR_MESSAGE
    }
  },
})

export const authActionClient = actionClient.use(async function ({ next }) {
  const authorizationHeader = generateAuthorizationHeader()

  if (!authorizationHeader) {
    throw new Error("You are not logged in")
  }

  return next({
    ctx: {
      authorizationHeader,
    },
  })
})

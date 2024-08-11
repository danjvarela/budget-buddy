import { z } from "zod"
import { validationMessages } from "./validation-messages"

export const signupSchema = z
  .object({
    email: z.string().email({ message: validationMessages.invalidEmail }),
    password: z
      .string({ required_error: validationMessages.passwordRequired })
      .min(1, { message: validationMessages.passwordRequired }),
    "password-confirm": z
      .string({ required_error: validationMessages.passwordRequired })
      .min(1, { message: validationMessages.passwordRequired }),
  })
  .refine(
    ({ password, ["password-confirm"]: passwordConfirm }) =>
      password === passwordConfirm,
    {
      message: validationMessages.invalidPasswordConfirmation,
      path: ["password-confirm"],
    }
  )

export const loginSchema = z.object({
  email: z.string().email({ message: validationMessages.invalidEmail }),
  password: z.string().min(1, { message: validationMessages.passwordRequired }),
})

export const requestPasswordResetSchema = z.object({
  email: z.string().email({ message: validationMessages.invalidEmail }),
})

export const resendVerificationEmailSchema = z.object({
  email: z.string().email({ message: validationMessages.invalidEmail }),
})

export const resetPasswordSchema = z
  .object({
    key: z.string(),
    password: z
      .string()
      .min(6, { message: validationMessages.insufficientPasswordLength }),
    "password-confirm": z.string(),
  })
  .refine(
    ({ password, ["password-confirm"]: passwordConfirmation }) =>
      password === passwordConfirmation,
    {
      message: validationMessages.invalidPasswordConfirmation,
      path: ["password-confirm"],
    }
  )

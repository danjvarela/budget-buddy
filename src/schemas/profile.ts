import { z } from "zod"
import { validationMessages } from "./validation-messages"

export const requestChangeEmailSchema = z.object({
  email: z.string().email({ message: validationMessages.invalidEmail }),
  password: z.string(),
})

export const changePasswordSchema = z
  .object({
    password: z.string(),
    "new-password": z
      .string()
      .min(1, { message: validationMessages.newPasswordRequired })
      .min(6, { message: validationMessages.insufficientPasswordLength }),
    "password-confirm": z.string(),
  })
  .refine((value) => value["new-password"] === value["password-confirm"], {
    message: validationMessages.invalidNewPasswordConfirmation,
    path: ["password-confirm"],
  })

export const deleteAccountSchema = z.object({
  password: z.string(),
})

"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { resetPasswordAction } from "@/actions/auth"
import { resetPasswordSchema } from "@/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import { ActionErrorToast } from "../action-error-toast"

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const key = searchParams.get("key")
  const router = useRouter()
  const {
    executeAsync: resetPassword,
    result,
    isExecuting,
  } = useAction(resetPasswordAction)

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      key: "",
      password: "",
      "password-confirm": "",
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = useCallback(
    async (data: ResetPasswordData) => {
      await resetPassword({ ...data, key: key || "" })
      router.push("/login")
    },
    [router, key, resetPassword]
  )

  return (
    <>
      <ActionErrorToast result={result} />
      <Form {...form}>
        <form
          className="h-full w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password-confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting || isExecuting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}

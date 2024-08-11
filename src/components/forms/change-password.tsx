"use client"

import { useCallback } from "react"
import { changePasswordAction } from "@/actions/profile"
import { changePasswordSchema } from "@/schemas/profile"
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

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

const defaultValues: ChangePasswordFormData = {
  password: "",
  "new-password": "",
  "password-confirm": "",
}

export function ChangePasswordForm() {
  const {
    executeAsync: changePassword,
    result,
    isExecuting,
  } = useAction(changePasswordAction)
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
  })

  const onSubmit = useCallback(
    async (data: ChangePasswordFormData) => {
      const res = await changePassword(data)

      if (res?.data?.success) {
        form.reset({
          password: "",
          ["new-password"]: "",
          ["password-confirm"]: "",
        })
      }
    },
    [changePassword, form]
  )

  return (
    <>
      <ActionErrorToast result={result} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-w-screen-sm flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new-password"
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
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button
              type="submit"
              isLoading={form.formState.isSubmitting || isExecuting}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

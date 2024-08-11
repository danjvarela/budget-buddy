"use client"

import { useCallback } from "react"
import { requestChangeEmailAction } from "@/actions/profile"
import { requestChangeEmailSchema } from "@/schemas/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { ActionErrorToast } from "../action-error-toast"

type ChangeEmailFormData = z.infer<typeof requestChangeEmailSchema>

const defaultValues: ChangeEmailFormData = {
  email: "",
  password: "",
}

export function ChangeEmailForm() {
  const {
    executeAsync: requestChangeEmail,
    result,
    isExecuting,
  } = useAction(requestChangeEmailAction)

  const form = useForm({
    resolver: zodResolver(requestChangeEmailSchema),
    defaultValues,
  })

  const onSubmit = useCallback(
    async (data: ChangeEmailFormData) => {
      const res = await requestChangeEmail(data)

      if (res?.data?.success) {
        form.reset({
          email: "",
          password: "",
        })
      }
    },
    [form, requestChangeEmail]
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormDescription>
                  The confirmation email will be sent to the new email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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

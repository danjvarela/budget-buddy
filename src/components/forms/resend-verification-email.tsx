"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { resendVerificationEmailAction } from "@/actions/auth"
import { resendVerificationEmailSchema } from "@/schemas/auth"
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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ActionErrorToast } from "@/components/action-error-toast"

type ResendVerificationEmailData = z.infer<typeof resendVerificationEmailSchema>

export function ResendVerificationEmailForm() {
  const router = useRouter()
  const {
    executeAsync: resendVerificationEmail,
    result,
    isExecuting,
  } = useAction(resendVerificationEmailAction)

  const form = useForm<ResendVerificationEmailData>({
    resolver: zodResolver(resendVerificationEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = useCallback(
    async function (data: ResendVerificationEmailData) {
      const res = await resendVerificationEmail(data)

      if (res?.data?.success) {
        router.push("/login")
      }
    },
    [router, resendVerificationEmail]
  )

  return (
    <>
      <ActionErrorToast result={result} />
      <Form {...form}>
        <form
          className="flex w-full flex-col items-center gap-2 md:flex-row"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    className="flex-1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full md:w-auto"
            isLoading={isSubmitting || isExecuting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}

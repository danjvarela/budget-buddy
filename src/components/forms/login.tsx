"use client"

import { useCallback, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { loginAction } from "@/actions/auth"
import { loginSchema } from "@/schemas/auth"
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
import { ActionErrorToast } from "@/components/action-error-toast"

type LoginData = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    executeAsync: login,
    result,
    isExecuting: isLoggingIn,
  } = useAction(loginAction)

  const redirectUrl = useMemo(() => {
    const from = searchParams.get("from")
    if (from === "/" || !from) return "/dashboard"
    return from
  }, [searchParams])

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = useCallback(
    async (data: LoginData) => {
      const result = await login(data)

      if (result?.data?.success) {
        router.push(redirectUrl)
      }
    },
    [login, redirectUrl, router]
  )

  return (
    <>
      <ActionErrorToast result={result} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormDescription>
                  The email you used to sign up.
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

          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div>
              Don{"'"}t have an account?{" "}
              <Link
                href="/signup"
                className="underline transition-colors hover:text-foreground"
              >
                Create one
              </Link>
            </div>

            <Link
              href="/resend-verification-email"
              className="underline transition-colors hover:text-foreground"
            >
              Resend verification email
            </Link>

            <Link
              href="/forgot-password"
              className="underline transition-colors hover:text-foreground"
            >
              Forgot password
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting || isLoggingIn}
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}

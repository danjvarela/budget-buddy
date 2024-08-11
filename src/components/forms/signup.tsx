"use client"

import { useCallback, useEffect } from "react"
import Link from "next/link"
import { signupAction } from "@/actions/auth"
import { signupSchema } from "@/schemas/auth"
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

type SignupData = z.infer<typeof signupSchema>

const defaultValues: SignupData = {
  email: "",
  password: "",
  "password-confirm": "",
}

export function SignupForm() {
  const {
    execute: signup,
    result,
    isExecuting: isSigningUp,
  } = useAction(signupAction)

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  })

  const { isSubmitting } = form.formState

  const onSubmit = useCallback(
    (data: SignupData) => {
      signup(data)
    },
    [signup]
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
                <FormDescription>Your email is safe with us.</FormDescription>
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

          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline transition-colors hover:text-foreground"
            >
              Login
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting || isSigningUp}
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}

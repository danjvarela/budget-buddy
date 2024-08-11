"use client"

import { useCallback, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { useToast } from "@/components/ui/use-toast"
import { login } from "../actions"

const schema = z.object({
  email: z.string().email({ message: "not a valid email" }),
  password: z.string().min(1, { message: "password is required" }),
})

type LoginData = z.infer<typeof schema>

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirectUrl = useMemo(() => {
    const from = searchParams.get("from")
    if (from === "/" || !from) return "/dashboard"
    return from
  }, [searchParams])

  const form = useForm<LoginData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = useCallback(
    async (data: LoginData) => {
      const res = await login(data)

      if ("error" in res) {
        if ("field-error" in res && Array.isArray(res["field-error"])) {
          toast({
            variant: "destructive",
            description: `${res.error}: ${res["field-error"][1]}`,
          })
          return
        }

        toast({
          variant: "destructive",
          description: res.error,
        })
        return
      }

      toast({
        description: res.success,
      })

      router.push(redirectUrl)
    },
    [toast, router, redirectUrl]
  )

  return (
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
              <FormDescription>The email you used to sign up.</FormDescription>
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
            href="/account-verification/resend"
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

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

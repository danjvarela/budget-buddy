"use client"

import { useCallback } from "react"
import Link from "next/link"
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
import { signup } from "../actions"

const schema = z
  .object({
    email: z.string().email({ message: "not a valid email" }),
    password: z.string().min(1, { message: "password is required" }),
    passwordConfirmation: z.string(),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "password confirmation does not match the password",
      path: ["passwordConfirmation"],
    }
  )

type SignupData = z.infer<typeof schema>

export default function SignupForm() {
  const { toast } = useToast()

  const form = useForm<SignupData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  const onSubmit = useCallback(
    async (data: SignupData) => {
      const res = await signup(data)

      if ("error" in res) {
        toast({
          variant: "destructive",
          description: res.error,
        })
        return
      }

      toast({
        description: res.success,
      })

      form.reset({
        email: "",
        password: "",
        passwordConfirmation: "",
      })
    },
    [toast, form]
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
          name="passwordConfirmation"
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

        <Button type="submit" className="w-full" size="sm">
          Submit
        </Button>
      </form>
    </Form>
  )
}

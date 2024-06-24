"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { useToast } from "@/components/ui/use-toast"
import { resetPassword } from "../actions"

const schema = z
  .object({
    password: z
      .string()
      .min(6, { message: "password should be atleast 6 characters long" }),
    passwordConfirmation: z.string(),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "password confirmation does not match the password",
      path: ["passwordConfirmation"],
    }
  )

type ResetPasswordData = z.infer<typeof schema>

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const key = searchParams.get("key")
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: ResetPasswordData) {
    const res = await resetPassword({ ...data, key: key || "" })

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

    router.push("/login")
  }

  return (
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
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

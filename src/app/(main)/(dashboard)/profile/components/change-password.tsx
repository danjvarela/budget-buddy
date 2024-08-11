"use client"

import { useCallback } from "react"
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
import { changePassword } from "../actions"
import Section from "./section"

const schema = z
  .object({
    password: z.string(),
    "new-password": z.string().min(1, { message: "this field is required" }),
    "password-confirm": z
      .string()
      .min(1, { message: "this field is required" }),
  })
  .refine((value) => value["new-password"] === value["password-confirm"], {
    message: "password confirmation does not match the password",
    path: ["password-confirm"],
  })

type ChangePasswordFormData = z.infer<typeof schema>

export default function ChangePassword() {
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      ["new-password"]: "",
      ["password-confirm"]: "",
    },
  })

  const onSubmit = useCallback(
    async (data: ChangePasswordFormData) => {
      const res = await changePassword(data)

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
      form.reset({
        password: "",
        ["new-password"]: "",
        ["password-confirm"]: "",
      })
    },
    [toast, form]
  )

  return (
    <Section title="Change Password">
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
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </Section>
  )
}

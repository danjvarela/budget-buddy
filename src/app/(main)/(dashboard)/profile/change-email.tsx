"use client"

import { useCallback } from "react"
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
import { requestChangeEmail } from "./actions"
import Section from "./section"

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type ChangeEmailFormData = z.infer<typeof schema>

export default function ChangeEmail() {
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = useCallback(
    async (data: ChangeEmailFormData) => {
      const res = await requestChangeEmail(data)

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
        email: "",
        password: "",
      })
    },
    [toast, form]
  )

  return (
    <Section title="Change Email">
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
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </Section>
  )
}

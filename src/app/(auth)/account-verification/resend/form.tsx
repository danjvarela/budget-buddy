"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { useToast } from "@/components/ui/use-toast"
import { resendVerificationEmail } from "../../actions"

const schema = z.object({
  email: z.string().email(),
})

type ResendVerificationData = z.infer<typeof schema>

export default function ResendVerificationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: ResendVerificationData) {
    const res = await resendVerificationEmail(data)

    if ("error" in res) {
      toast({
        variant: "destructive",
        description: res.error,
      })
    } else {
      toast({
        description: res.success,
      })
      router.push("/login")
    }
  }

  return (
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
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

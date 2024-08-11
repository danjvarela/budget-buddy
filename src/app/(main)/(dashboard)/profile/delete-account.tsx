"use client"

import { redirect, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { deleteAccount } from "./actions"
import Section from "./section"

const schema = z.object({
  password: z.string().min(1, { message: "this field is required" }),
})

type DeleteAccountFormData = z.infer<typeof schema>

export default function DeleteAccount() {
  const { toast } = useToast()

  const router = useRouter()

  const form = useForm<DeleteAccountFormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: DeleteAccountFormData) {
    const res = await deleteAccount(data)

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

    router.push("/")
  }

  return (
    <Section title="Delete Account" dangerZone>
      <Dialog>
        <div>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your password to continue</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <DialogClose asChild>
                  <Button variant="secondary" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="destructive" type="submit">
                  Proceed to delete account
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Section>
  )
}

"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { deleteAccountAction } from "@/actions/profile"
import { deleteAccountSchema } from "@/schemas/profile"
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import { ActionErrorToast } from "@/components/action-error-toast"

type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>

type Props = {
  cancelButton?: React.ReactNode
}

export function DeleteAccountForm({ cancelButton }: Props) {
  const {
    executeAsync: deleteAccount,
    result,
    isExecuting,
  } = useAction(deleteAccountAction)

  const router = useRouter()

  const form = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
    },
  })

  const onSubmit = useCallback(
    async (data: DeleteAccountFormData) => {
      const res = await deleteAccount(data)

      if (res?.data?.success) {
        router.push("/")
      }
    },
    [deleteAccount, router]
  )

  return (
    <>
      <ActionErrorToast result={result} />
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
            {cancelButton}
            <Button
              variant="destructive"
              type="submit"
              isLoading={form.formState.isSubmitting || isExecuting}
            >
              Proceed to delete account
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

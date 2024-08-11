"use client"

import { useCallback, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const MESSAGE_SEARCH_PARAM_KEY = "message"

export default function Messages() {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const messageId = searchParams.get(MESSAGE_SEARCH_PARAM_KEY)

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete(MESSAGE_SEARCH_PARAM_KEY)
        router.replace(`${pathname}?${newSearchParams.toString()}`)
      }
    },
    [router, pathname, searchParams]
  )

  useEffect(() => {
    if (messageId === "account-verification-fail") {
      toast({
        variant: "destructive",
        title: "Unable to verify account",
        description: "Account verification link is either invalid or expired.",
        onOpenChange,
      })
    }

    if (messageId === "account-verification-success") {
      toast({
        description: "Your account has been verified.",
        onOpenChange,
      })
    }
  }, [toast, messageId, onOpenChange])

  return null
}

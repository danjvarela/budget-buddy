"use client"

import { useCallback, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function SearchParamToastMessages() {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const errorMessage = searchParams.get("error")
  const successMessage = searchParams.get("success")

  const removeAssociatedSearchParam = useCallback(
    (searchParamKey: string) => (open: boolean) => {
      if (!open) {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete(searchParamKey)
        router.replace(`${pathname}?${newSearchParams.toString()}`)
      }
    },
    [searchParams, router, pathname]
  )

  useEffect(() => {
    if (errorMessage) {
      toast({
        variant: "destructive",
        description: errorMessage,
        onOpenChange: removeAssociatedSearchParam("error"),
      })
    }

    if (successMessage) {
      toast({
        description: successMessage,
        onOpenChange: removeAssociatedSearchParam("success"),
      })
    }
  }, [toast, errorMessage, successMessage, removeAssociatedSearchParam])

  return null
}

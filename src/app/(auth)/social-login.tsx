"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SiGoogle, SiGoogleHex } from "@icons-pack/react-simple-icons"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { getGoogleAuthorizationURL } from "./actions"

export default function SocialLogin() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const redirectUrlAfterLogin = searchParams.get("from") || "/"

  const signinWithGoogle = useCallback(async () => {
    const { error, authorizeUrl } = await getGoogleAuthorizationURL({
      redirectUrlAfterLogin,
    })

    if (error)
      toast({
        description: error,
      })

    if (authorizeUrl) {
      router.push(authorizeUrl)
    }
  }, [router, toast, redirectUrlAfterLogin])

  return (
    <Button className="w-full" variant="outline" onClick={signinWithGoogle}>
      <SiGoogle color={SiGoogleHex} className="mr-4 h-4 w-4" />
      Google
    </Button>
  )
}

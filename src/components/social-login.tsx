"use client"

import { useCallback, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getGoogleAuthorizationURLAction } from "@/actions/auth"
import { SiGoogle, SiGoogleHex } from "@icons-pack/react-simple-icons"
import { useAction } from "next-safe-action/hooks"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

type Props = {
  mode: "login" | "signup"
}

export function SocialLogin({ mode }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const redirectUrlAfterLogin = useMemo(() => {
    const from = searchParams.get("from")
    return !from || from === "/" ? "/dashboard" : from
  }, [searchParams])
  const { executeAsync: getGoogleAuthorizationURL, isExecuting } = useAction(
    getGoogleAuthorizationURLAction
  )

  const signinWithGoogle = useCallback(async () => {
    const res = await getGoogleAuthorizationURL({
      redirectUrlAfterLogin,
      mode,
    })

    if (res?.data?.authorizeUrl) {
      router.push(res?.data.authorizeUrl)
    } else if (res?.serverError) {
      toast({
        variant: "destructive",
        description: res?.serverError,
      })
    }
  }, [router, toast, redirectUrlAfterLogin, mode, getGoogleAuthorizationURL])

  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={signinWithGoogle}
      isLoading={isExecuting}
    >
      <SiGoogle color={SiGoogleHex} className="mr-4 h-4 w-4" />
      Google
    </Button>
  )
}

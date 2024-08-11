"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { logout } from "./actions"

const LogoutButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ children, ...props }, ref) => {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onClick() {
    setIsLoading(true)
    const res = await logout()

    if ("error" in res) {
      toast({
        variant: "destructive",
        description: res.error,
      })
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    router.push("/login")
  }
  return (
    <Button {...props} ref={ref} onClick={onClick} isLoading={isLoading}>
      {children || "Logout"}
    </Button>
  )
})

LogoutButton.displayName = "LogoutButton"

export default LogoutButton

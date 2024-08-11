"use client"

import React from "react"
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

  async function onClick() {
    const res = await logout()

    if ("error" in res) {
      toast({
        variant: "destructive",
        description: res.error,
      })
      return
    }

    router.push("/login")
  }
  return (
    <Button {...props} ref={ref} onClick={onClick}>
      {children || "Logout"}
    </Button>
  )
})

LogoutButton.displayName = "LogoutButton"

export default LogoutButton

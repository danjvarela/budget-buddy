"use client"

import { SiGoogle, SiGoogleHex } from "@icons-pack/react-simple-icons"
import { Button } from "@/components/ui/button"

export default function SocialLogin() {
  return (
    <Button className="w-full" variant="outline">
      <SiGoogle color={SiGoogleHex} className="mr-4 h-4 w-4" />
      Google
    </Button>
  )
}

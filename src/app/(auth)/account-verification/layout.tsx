import React from "react"
import { Card } from "@/components/ui/card"

export default function AccountVerificationLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex justify-center pt-20">
      <Card className="w-full max-w-lg">{children}</Card>
    </div>
  )
}

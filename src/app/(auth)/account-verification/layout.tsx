import React from "react"
import { Card } from "@/components/ui/card"

export default function AccountVerificationLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return <Card className="w-full max-w-lg">{children}</Card>
}

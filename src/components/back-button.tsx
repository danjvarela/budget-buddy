"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "./ui/button"

export default function BackButton({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const router = useRouter()

  return (
    <Button onClick={router.back} size="icon" variant="ghost" {...props}>
      {children || <ChevronLeft />}
    </Button>
  )
}

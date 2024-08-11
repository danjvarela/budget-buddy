import React from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex h-screen flex-col">
      <div className="fixed w-full pt-8">
        <div className="container relative max-w-screen-xl">
          <Link href="/" className="mr-2">
            <Button variant="ghost">
              <ChevronLeft className="h-5 w-5" /> Go back home
            </Button>
          </Link>
        </div>
      </div>
      <div className="container flex flex-1 items-center justify-center">
        {children}
      </div>
    </div>
  )
}

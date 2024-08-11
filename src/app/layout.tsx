import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { getCurrentSessionServerSide } from "@/lib/session"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import SearchParamToastMessages from "@/components/search-params-toast-messages"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Budget Buddy",
  description: "A simple tool to help you in budgeting",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getCurrentSessionServerSide()

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        <SearchParamToastMessages />
        <Providers session={session}>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}

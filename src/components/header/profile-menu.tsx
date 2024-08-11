"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { logoutAction } from "@/actions/auth"
import { LogOut, User } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "@/components/auth-provider"

export function ProfileMenu() {
  const session = useSession()
  const router = useRouter()
  const { executeAsync: logout, isExecuting } = useAction(logoutAction)

  async function handleLogOut() {
    const res = await logout()
    if (res?.data?.success) {
      router.push("/")
    }
  }

  return (
    <>
      {isExecuting && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-muted/50 backdrop-blur">
          Signing out...
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="max-w-[200px]">
            <span className="w-full truncate">{session?.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[150px]">
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleLogOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

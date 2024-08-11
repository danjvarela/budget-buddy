"use client"

import React, { MouseEventHandler, useCallback, useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu } from "lucide-react"
import { HEADER_HEIGHT } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSession } from "@/components/auth-provider"
import { Logo } from "@/components/logo"
import { NavLink, NavLinkProps } from "./nav-link"
import { ProfileMenu } from "./profile-menu"

function NavLinks({
  closeSheet,
  navLinks,
}: {
  navLinks: NavLinkProps[]
  closeSheet?: () => void
}) {
  const resolvedOnClick: (
    onClick: NavLinkProps["onClick"]
  ) => MouseEventHandler<HTMLAnchorElement> = useCallback(
    (onClick) => (e) => {
      onClick?.(e)
      closeSheet?.()
    },
    [closeSheet]
  )

  return (
    <>
      {navLinks.map(({ onClick, id, ...props }) => (
        <NavLink
          key={id}
          id={id}
          onClick={resolvedOnClick(onClick)}
          {...props}
        />
      ))}
    </>
  )
}

const Header = React.forwardRef<
  React.ElementRef<"header">,
  { navLinks: NavLinkProps[] }
>(({ navLinks }, ref) => {
  const [open, setOpen] = useState(false)
  const session = useSession()

  function closeSheet() {
    setOpen(false)
  }

  return (
    <header className="border-b" ref={ref} style={{ height: HEADER_HEIGHT }}>
      <div className="container flex h-full max-w-screen-xl items-center justify-between">
        <div className="flex items-center gap-12">
          <Logo className="hidden md:block" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden" asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="rounded-b-xl">
              <SheetHeader className="text-start">
                <SheetTitle>
                  <Logo onClick={closeSheet} />
                </SheetTitle>
              </SheetHeader>

              <ul className="mt-6 flex flex-col gap-2">
                <NavLinks navLinks={navLinks} closeSheet={closeSheet} />
              </ul>
            </SheetContent>
          </Sheet>

          <ul className="hidden gap-8 md:flex">
            <NavLinks navLinks={navLinks} closeSheet={closeSheet} />
          </ul>
        </div>

        {session ? (
          <ProfileMenu />
        ) : (
          <Link href="/login">
            <Button size="sm">
              Log in <ArrowRight className="ml-2 inline h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
})

Header.displayName = "Header"

export default Header

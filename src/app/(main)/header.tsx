"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu } from "lucide-react"
import { API_DOCS_URL } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Logo from "@/components/logo"

interface NavLinkProps extends React.ComponentProps<typeof Link> {}

function NavLink({ href, children, ...props }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-base leading-none text-muted-foreground transition-colors hover:text-foreground md:text-sm"
      {...props}
    >
      {children}
    </Link>
  )
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <NavLink href="#features" onClick={onClick}>
        Features
      </NavLink>
      <NavLink href={API_DOCS_URL} target="_blank" onClick={onClick}>
        API Documentation
      </NavLink>
      <NavLink href="/blogs" onClick={onClick}>
        Blogs
      </NavLink>
    </>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  function closeSheet() {
    setOpen(false)
  }

  return (
    <header className="border-b">
      <div className="container flex max-w-screen-xl items-center justify-between py-4">
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
                <NavLinks />
              </ul>
            </SheetContent>
          </Sheet>

          <ul className="hidden gap-8 md:flex">
            <NavLinks />
          </ul>
        </div>

        <Link href="/login">
          <Button size="sm">
            Log in <ArrowRight className="ml-2 inline h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  )
}

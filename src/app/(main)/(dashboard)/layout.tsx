import { HEADER_HEIGHT } from "@/lib/constants"
import Header from "@/components/header"
import { NavLinkProps } from "@/components/header/nav-link"

const navLinks: NavLinkProps[] = [
  { children: "Overview", href: "/dashboard", id: "dashboard" },
  { children: "Transactions", href: "/transactions", id: "transactions" },
  { children: "Settings", href: "/settings", id: "settings" },
]

export default function DashboardLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header navLinks={navLinks} />
      <div
        className="container flex max-w-screen-xl items-center justify-center overflow-auto border"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        {children}
      </div>
    </>
  )
}

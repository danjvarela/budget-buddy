import { HEADER_HEIGHT } from "@/lib/constants"
import Header from "@/components/header"
import { NavLinkProps } from "@/components/header/nav-link"
import Messages from "@/components/messages"

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
        className="container max-w-screen-xl overflow-auto"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <Messages />
        {children}
      </div>
    </>
  )
}

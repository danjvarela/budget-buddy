import Link from "next/link"
import { cn } from "@/lib/utils"
import { useSession } from "../auth-provider"

export interface NavLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "id"> {
  requireAuth?: boolean
  id: string
}

export default function NavLink({
  href,
  children,
  className,
  requireAuth,
  ...props
}: NavLinkProps) {
  const session = useSession()

  if (requireAuth && !session) return null

  return (
    <Link
      href={href}
      className={cn(
        "text-base leading-none text-muted-foreground transition-colors hover:text-foreground md:text-sm",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

import Link from "next/link"
import { Calculator } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "children" | "href">) {
  return (
    <Link href="/" className={cn("font-bold md:block", className)} {...props}>
      <Calculator className="inline" />
      <span>Budget Buddy</span>
    </Link>
  )
}

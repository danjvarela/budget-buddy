"use client"

import { useUrlState } from "@/lib/url-state-manager"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export function ExpensesSearchInput({ className }: { className?: string }) {
  const [value, setValue] = useUrlState<string>("s", "")

  return (
    <Input
      placeholder="Search expenses"
      className={cn("h-8", className)}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

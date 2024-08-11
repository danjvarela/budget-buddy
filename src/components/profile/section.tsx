import { cn } from "@/lib/utils"

export function Section({
  children,
  title,
  dangerZone,
  className,
}: React.PropsWithChildren<{
  title: string
  dangerZone?: boolean
  className?: string
}>) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-2xl p-4",
        dangerZone && "border border-destructive bg-destructive/20",
        className
      )}
    >
      <h2 className="text-2xl font-bold leading-none tracking-tight">
        {title}
      </h2>

      {children}
    </section>
  )
}

import { cn } from "@/lib/utils"

export default function PageHeading({
  pageTitle,
  pageDescription,
  className,
}: React.PropsWithChildren<{
  pageTitle: string
  pageDescription?: React.ReactNode
  className?: string
}>) {
  return (
    <div className={cn("border-b py-4", className)}>
      <h1 className="text-2xl font-bold leading-none tracking-tight md:text-3xl">
        {pageTitle}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground md:text-base">
        {pageDescription}
      </p>
    </div>
  )
}

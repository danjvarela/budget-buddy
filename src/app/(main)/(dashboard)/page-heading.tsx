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
    <div className={cn("border-b py-6", className)}>
      <h1 className="text-3xl font-bold leading-none tracking-tight">
        {pageTitle}
      </h1>
      <p className="mt-1 text-muted-foreground">{pageDescription}</p>
    </div>
  )
}

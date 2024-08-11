export default function Section({
  children,
  title,
}: React.PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col gap-4 border-b pb-8 last:border-b-0">
      <h2 className="text-2xl font-bold leading-none tracking-tight">
        {title}
      </h2>

      {children}
    </div>
  )
}

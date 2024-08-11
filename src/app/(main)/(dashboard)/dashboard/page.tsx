export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="border-b py-6">
        <h1 className="text-3xl font-bold leading-none tracking-tight">
          Overview
        </h1>
        <p className="mt-1 text-muted-foreground">
          Summary of all your transactions
        </p>
      </div>
    </div>
  )
}

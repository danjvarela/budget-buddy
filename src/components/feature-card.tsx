import { Card, CardContent } from "@/components/ui/card"

type Props = {
  icon: React.ReactNode
  description: string
  title: string
}

export function FeatureCard({ icon, description, title }: Props) {
  return (
    <Card className="aspect-[1.618] w-full max-w-xs">
      <CardContent className="flex flex-col items-start gap-3 py-4">
        <div className="space-y-1">
          <div className="flex aspect-square h-16 items-center">{icon}</div>
          <p className="text-lg font-bold tracking-tight">{title}</p>
        </div>
        <p className="leading-tight tracking-tight text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

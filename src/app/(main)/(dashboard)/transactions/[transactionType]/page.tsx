import { notFound } from "next/navigation"
import { match } from "ts-pattern"
import { cn } from "@/lib/utils"
import { TabsContent } from "@/components/ui/tabs"

type Props = {
  params: {
    transactionType: "expenses" | "incomes" | "transfers"
  }
}

function TransactionTabContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsContent>) {
  return (
    <TabsContent
      className={cn(
        "flex h-[500px] w-full flex-col items-center justify-center bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </TabsContent>
  )
}

export default function TransactionTypePage({ params }: Props) {
  return match(params.transactionType)
    .with("expenses", () => (
      <TransactionTabContent value="expenses">
        Wow, such empty
      </TransactionTabContent>
    ))
    .with("incomes", () => (
      <TransactionTabContent value="incomes">
        Wow, such empty
      </TransactionTabContent>
    ))
    .with("transfers", () => (
      <TransactionTabContent value="transfers">
        Wow, such empty
      </TransactionTabContent>
    ))
    .otherwise(() => notFound())
}

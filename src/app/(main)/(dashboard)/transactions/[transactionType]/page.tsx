import { notFound } from "next/navigation"
import { match } from "ts-pattern"
import { TabsContent } from "@/components/ui/tabs"

type Props = {
  params: {
    transactionType: "expenses" | "incomes" | "transfers"
  }
}

export default function TransactionTypePage({ params }: Props) {
  return match(params.transactionType)
    .with("expenses", () => (
      <TabsContent value="expenses">expenses</TabsContent>
    ))
    .with("incomes", () => <TabsContent value="incomes">incomes</TabsContent>)
    .with("transfers", () => (
      <TabsContent value="transfers">transfers</TabsContent>
    ))
    .otherwise(() => notFound())
}

import PageHeading from "../page-heading"
import TransactionTabs from "./transaction-tabs"

export default function TransactionsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        pageTitle="Transactions"
        pageDescription="Log your daily transactions as they come"
      />

      <TransactionTabs>{children}</TransactionTabs>
    </div>
  )
}

"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TransactionTabs({
  children,
}: React.PropsWithChildren<{}>) {
  const router = useRouter()
  const params = useParams()

  const value = useMemo(() => {
    if (Array.isArray(params.transactionType)) return "not-found"
    return params.transactionType
  }, [params])

  return (
    <Tabs
      value={value}
      onValueChange={(value: string) => router.push(`/transactions/${value}`)}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
        <TabsTrigger value="incomes">Incomes</TabsTrigger>
        <TabsTrigger value="transfers">Transfers</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}

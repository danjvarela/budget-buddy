export interface Category {
  id: number
  categoryType: "expense" | "income"
  name: string
}

export interface FinancialAccount {
  id: number
  name: string
  initialAmount: number
  currentBalance: number
  description?: string
}

export interface ExpenseTransaction {
  id: number
  amount: number
  description?: string | null
  financialAccount: FinancialAccount
  category: Category
  date: string
}

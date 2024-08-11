declare interface Category {
  id: number
  categoryType: "expense" | "income"
  name: string
}

declare interface FinancialAccount {
  id: number
  name: string
  initialAmount: number
  currentBalance: number
  description?: string
}

declare interface ExpenseTransaction {
  id: number
  amount: number
  description?: string | null
  financialAccount: FinancialAccount
  category: Category
  date: string
}

declare type SuccessResponse<T = {}> = T & {
  success: string
}

declare type ErrorResponse<T = {}> = T & {
  error: string
  "field-error"?: string[]
}

declare type Session = {
  email: string
  id: number
  status: "verified" | "unverified"
}

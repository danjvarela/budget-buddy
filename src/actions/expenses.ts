"use server"

import { api } from "@/lib/api"
import { authActionClient } from "@/lib/safe-action"

export const getExpensesAction = authActionClient.action(async function () {
  return await api.get("expenses").json<ExpenseTransaction[]>()
})

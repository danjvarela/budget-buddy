"use server"

import api, { ErrorResponse } from "@/lib/api"
import { ExpenseTransaction } from "./types"

export async function getExpenses() {
  try {
    const { data } = await api.get<ExpenseTransaction[] | ErrorResponse>(
      "/expenses"
    )
    return data
  } catch (err) {
    console.error(err)
    return []
  }
}

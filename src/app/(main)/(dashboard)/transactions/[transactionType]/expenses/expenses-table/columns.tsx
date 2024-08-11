"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ExpenseTransaction } from "../../../types"

const columnHelper = createColumnHelper<ExpenseTransaction>()

export const columns = [
  columnHelper.display({
    id: "select",
    header: () => <Checkbox className="mt-1" />,
    cell: () => <Checkbox className="mt-1" />,
  }),
  columnHelper.accessor((row) => row.financialAccount.name, {
    id: "account",
    cell: (info) => info.getValue(),
    header: "Account",
  }),
  columnHelper.accessor(
    (row) => ({ category: row.category.name, description: row.description }),
    {
      id: "description",
      cell: (info) => (
        <div className="flex">
          <Badge variant="outline" className="mr-2">
            {info.getValue().category}
          </Badge>
          <span className="line-clamp-1">{info.getValue().description}</span>
        </div>
      ),
      header: "Description",
    }
  ),
  columnHelper.accessor("amount", {
    cell: (info) => <span>₱{info.getValue()}</span>,
    header: "Amount",
  }),
  columnHelper.accessor("date", {
    cell: (info) => info.getValue(),
    header: "Date",
  }),
]

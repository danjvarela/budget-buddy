"use client"

import { useCallback, useEffect, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Loader2 } from "lucide-react"
import { match, P } from "ts-pattern"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { getExpenses } from "../actions"
import { ExpenseTransaction } from "../types"
import { columns } from "./expenses-table-columns"

export default function TransactionsTable() {
  const [expenses, setExpenses] = useState<ExpenseTransaction[]>()
  const { toast } = useToast()

  const table = useReactTable<ExpenseTransaction>({
    data: expenses || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    getExpenses().then((data) => {
      return match(data)
        .with(
          P.union(
            { error: P.not(P.nullish) },
            { ["field-error"]: P.not(P.nullish) }
          ),
          (data) => {
            toast({
              description: data.error,
            })
            setExpenses([])
          }
        )
        .otherwise((expenses) => {
          return setExpenses(expenses)
        })
    })
  }, [toast])

  const renderData = useCallback(() => {
    if (typeof expenses === "undefined")
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          </TableCell>
        </TableRow>
      )

    return table.getRowModel().rows?.length ? (
      table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    )
  }, [table, expenses])

  return (
    <Table className="h-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>{renderData()}</TableBody>
    </Table>
  )
}

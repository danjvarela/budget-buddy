import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TabsContent } from "@/components/ui/tabs"
import TransactionsTable from "./expenses-table"

export default function ExpensesTabContent() {
  return (
    <TabsContent value="expenses">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex gap-4">
            <Input placeholder="Search expenses" className="h-9 w-[250px]" />
            <Select defaultValue="today">
              <SelectTrigger className="h-9 w-[150px]">
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="custom-date">Custom Date</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Count per page"
              className="h-9 w-[150px]"
              type="number"
              defaultValue={20}
            />
          </div>
          <div className="flex gap-4">
            <Button size="sm">
              Add <Plus className="inline h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm">
              Export to CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TransactionsTable />
        </CardContent>
      </Card>
    </TabsContent>
  )
}

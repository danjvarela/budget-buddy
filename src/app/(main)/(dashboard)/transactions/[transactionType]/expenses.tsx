import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"

export default function ExpensesPage() {
  return (
    <TabsContent value="expenses">
      <Card className="max-h-[700px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex gap-4">
            <Input placeholder="Search" />
            <Input placeholder="Date filter" />
          </div>
          <div className="flex gap-4">
            <Button>
              Add <Plus className="inline h-4 w-4" />
            </Button>

            <Button variant="outline">Export to CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <Checkbox />
                </TableCell>
                <TableCell>Cash</TableCell>
                <TableCell>
                  <Badge variant="outline" className="mr-2">
                    Food
                  </Badge>
                  Dinner
                </TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  <Checkbox />
                </TableCell>
                <TableCell>Cash</TableCell>
                <TableCell>
                  <Badge variant="outline" className="mr-2">
                    Food
                  </Badge>
                  Dinner
                </TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

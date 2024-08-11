import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
          <CardDescription>
            We couldn&apos;t find the page you were looking for.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Link href="/transactions/expenses">
            <Button>Go to expenses page instead</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

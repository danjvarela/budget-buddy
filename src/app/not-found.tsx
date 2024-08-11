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
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
          <CardDescription>
            We couldn&apos;t find the page you were looking for.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Link href="/">
            <Button>Go back to home page</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

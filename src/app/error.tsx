"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>
            Some error occurred while trying to process that request
          </CardDescription>
        </CardHeader>
        <CardFooter className="gap-4">
          <Button onClick={reset}>Try again</Button>
          <Link href="/">
            <Button variant="secondary">Go to homepage instead</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

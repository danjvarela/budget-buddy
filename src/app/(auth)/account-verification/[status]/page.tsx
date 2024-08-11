import { useMemo } from "react"
import Link from "next/link"
import { match } from "ts-pattern"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ResendVerificationForm from "./resend-verification-form"

type Props = {
  params: {
    status: "nokey" | "success" | "fail"
  }
}

export default function AccountVerification({ params }: Props) {
  const cardBody = useMemo(() => {
    return match(params.status)
      .with("fail", () => (
        <>
          <CardHeader>
            <CardTitle>We are unable to verify your account</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Your link might already have expired. Enter the email you used to
            signup and click the button below to send a new verification email.
          </CardContent>
          <CardFooter>
            <ResendVerificationForm />
          </CardFooter>
        </>
      ))
      .with("nokey", () => (
        <>
          <CardHeader>
            <CardTitle>We are unable to verify your account</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            No key was present on your link. Either it has been tampered with or
            this is bug.
          </CardContent>
          <CardFooter>
            <Button>
              <Link href="/">Go to homepage</Link>
            </Button>
          </CardFooter>
        </>
      ))
      .with("success", () => (
        <>
          <CardHeader>
            <CardTitle>Account verified successfully</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Click the link below to continue logging in.
          </CardContent>
          <CardFooter>
            <Button>
              <Link href="/login">Continue to log in</Link>
            </Button>
          </CardFooter>
        </>
      ))
      .otherwise(() => null)
  }, [params])

  return (
    <div className="flex justify-center pt-20">
      <Card className="w-full max-w-lg">{cardBody}</Card>
    </div>
  )
}

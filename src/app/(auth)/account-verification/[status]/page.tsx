import Link from "next/link"
import { match } from "ts-pattern"
import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ResendVerificationForm from "../resend-verification-form"

type Props = {
  params: {
    status: "nokey" | "success" | "fail"
  }
}

export default function AccountVerification({ params }: Props) {
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
          <Link href="/">
            <Button>Go to homepage</Button>
          </Link>
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
          <Link href="/login">
            <Button>Continue to log in</Button>
          </Link>
        </CardFooter>
      </>
    ))
    .otherwise(() => null)
}

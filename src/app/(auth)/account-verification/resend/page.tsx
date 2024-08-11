import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ResendVerificationForm from "../resend-verification-form"

export default function AccountVerificationResend() {
  return (
    <>
      <CardHeader>
        <CardTitle>Resend verification email</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Enter the email you used to signup and click the button below to send a
        new verification email.
      </CardContent>
      <CardFooter>
        <ResendVerificationForm />
      </CardFooter>
    </>
  )
}

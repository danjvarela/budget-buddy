import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
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
        <CardTitle className="flex items-center gap-2">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/login">
              <ChevronLeft />
            </Link>
          </Button>{" "}
          Resend verification email
        </CardTitle>
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

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ResendVerificationForm from "../resend-verification-form"

export default function AccountVerificationResend() {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link href="/login">
            <Button size="icon" variant="ghost">
              <ChevronLeft />
            </Button>
          </Link>{" "}
          Resend verification email
        </CardTitle>
        <CardDescription>
          Enter the email you used to signup and click submit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResendVerificationForm />
      </CardContent>
    </>
  )
}

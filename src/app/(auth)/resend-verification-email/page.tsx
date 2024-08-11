import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResendVerificationEmailForm } from "@/components/forms/resend-verification-email"

export default function AccountVerificationResend() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link href="/login">
            <Button size="icon" variant="ghost">
              <ChevronLeft />
            </Button>
          </Link>
          Resend verification email
        </CardTitle>
        <CardDescription>
          Enter the email you used to signup and click submit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResendVerificationEmailForm />
      </CardContent>
    </Card>
  )
}

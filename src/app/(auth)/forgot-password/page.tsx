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
import RequestPasswordResetForm from "./form"

export default function ResetPasswordSendPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Link href="/login" className="mr-2">
            <Button size="icon" variant="ghost">
              <ChevronLeft />
            </Button>
          </Link>
          Forgot Password
        </CardTitle>
        <CardDescription>
          Enter your email and click submit to receive a password reset email
          from us.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RequestPasswordResetForm />
      </CardContent>
    </Card>
  )
}

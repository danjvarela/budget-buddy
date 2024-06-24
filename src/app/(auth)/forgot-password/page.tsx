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
        <CardTitle>Forgot Password</CardTitle>
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

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
import ResetPasswordForm from "./form"

export default function ResetPasswordPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Link href="/forgot-password" className="mr-2">
            <Button size="icon" variant="ghost">
              <ChevronLeft />
            </Button>
          </Link>{" "}
          Reset Password
        </CardTitle>
        <CardDescription>
          Enter your new password and click submit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
    </Card>
  )
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import SocialLogin from "../social-login"
import LoginForm from "./form"

export default function LoginPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Login to Budget Buddy
        </CardTitle>
        <CardDescription>
          Enter your email and password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <LoginForm />
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Separator />
          </div>
          <span className="text-sm text-muted-foreground">
            or continue with
          </span>
          <div className="flex-1">
            <Separator />
          </div>
        </div>
        <SocialLogin />
      </CardContent>
    </Card>
  )
}

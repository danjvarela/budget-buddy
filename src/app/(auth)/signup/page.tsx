import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SignupForm } from "@/components/forms/signup"
import { SocialLogin } from "@/components/social-login"

export default function SignupPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Sign up to Budget Buddy
        </CardTitle>
        <CardDescription>
          Enter your email and password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <div className="flex items-center gap-2 py-4">
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
        <SocialLogin mode="signup" />
      </CardContent>
    </Card>
  )
}

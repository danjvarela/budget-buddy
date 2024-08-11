import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import BackButton from "@/components/back-button"
import SocialLogin from "../social-login"
import SignupForm from "./form"

export default function SignupPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BackButton />
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
        <SocialLogin />
      </CardContent>
    </Card>
  )
}

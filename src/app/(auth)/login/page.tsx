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
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Login to Budget Buddy</CardTitle>
          <CardDescription>
            Enter your email and password to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
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
    </div>
  )
}

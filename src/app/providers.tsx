import { Session } from "@/lib/session"
import AuthProvider from "@/components/auth-provider"

export default function Providers({
  session,
  children,
}: React.PropsWithChildren<{
  session: Session | null
}>) {
  return <AuthProvider session={session}>{children}</AuthProvider>
}

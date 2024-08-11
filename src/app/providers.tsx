import { AuthProvider } from "@/components/auth-provider"

export function Providers({
  session,
  children,
}: React.PropsWithChildren<{
  session: Session | null
}>) {
  return <AuthProvider session={session}>{children}</AuthProvider>
}

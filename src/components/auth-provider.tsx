"use client"

import { createContext, PropsWithChildren, useContext } from "react"
import { Session } from "@/lib/session"

const AuthContext = createContext<{ session: Session | null }>({
  session: null,
})

export function useSession() {
  const ctx = useContext(AuthContext)
  return ctx.session
}

export default function AuthProvider({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) {
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  )
}

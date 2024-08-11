"use client"

import { createContext, PropsWithChildren, useContext } from "react"

const AuthContext = createContext<{ session: Session | null }>({
  session: null,
})

export function useSession() {
  const ctx = useContext(AuthContext)
  return ctx.session
}

export function AuthProvider({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) {
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  )
}

import React from "react"

export default function AuthLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-2">
      {children}
    </div>
  )
}

import React from "react"
import { getCurrentSessionServerSide } from "@/lib/session"
import ChangeEmail from "./change-email"
import ChangePassword from "./change-password"

export default async function ProfilePage() {
  const session = await getCurrentSessionServerSide()

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="border-b py-6">
        <h1 className="text-3xl font-bold leading-none tracking-tight">
          Profile
        </h1>
        <p className="mt-1 text-muted-foreground">
          You are logged in as{" "}
          <span className="font-semibold text-foreground">
            {session?.email}
          </span>
        </p>
      </div>

      <ChangeEmail />
      <ChangePassword />
    </div>
  )
}

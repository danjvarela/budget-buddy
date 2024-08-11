import React from "react"
import { getCurrentSessionServerSide } from "@/lib/session"
import { Separator } from "@/components/ui/separator"
import ChangeEmail from "./change-email"
import ChangePassword from "./change-password"
import DeleteAccount from "./delete-account"

export default async function ProfilePage() {
  const session = await getCurrentSessionServerSide()

  return (
    <div className="flex h-full flex-col pb-8">
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
      <Separator className="my-8" />
      <ChangePassword />
      <Separator className="my-8" />
      <DeleteAccount />
    </div>
  )
}

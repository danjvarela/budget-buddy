import React from "react"
import { getCurrentSessionServerSide } from "@/lib/session"
import { Separator } from "@/components/ui/separator"
import PageHeading from "../page-heading"
import ChangeEmail from "./change-email"
import ChangePassword from "./change-password"
import DeleteAccount from "./delete-account"

export default async function ProfilePage() {
  const session = await getCurrentSessionServerSide()

  return (
    <div className="flex h-full flex-col pb-8">
      <PageHeading
        pageTitle="Profile"
        pageDescription={
          <>
            You are logged in as{" "}
            <span className="font-semibold text-foreground">
              {session?.email}
            </span>
          </>
        }
      />

      <ChangeEmail />
      <Separator className="my-8" />
      <ChangePassword />
      <Separator className="my-8" />
      <DeleteAccount />
    </div>
  )
}

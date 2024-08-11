import React from "react"
import { getCurrentSessionServerSide } from "@/lib/session"
import { Separator } from "@/components/ui/separator"
import { DeleteAccountDialog } from "@/components/dialogs/delete-account"
import { ChangeEmailForm } from "@/components/forms/change-email"
import { ChangePasswordForm } from "@/components/forms/change-password"
import { PageHeading } from "@/components/page-heading"
import { Section } from "@/components/profile/section"

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

      <Section title="Change Email" className="mt-8">
        <ChangeEmailForm />
      </Section>

      <Separator className="my-8" />

      <Section title="Change Password">
        <ChangePasswordForm />
      </Section>

      <Separator className="my-8" />

      <Section title="Delete Account" dangerZone>
        <DeleteAccountDialog />
      </Section>
    </div>
  )
}

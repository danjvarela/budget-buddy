import Link from "next/link"
import { getCurrentSessionServerSide } from "@/lib/session"
import LogoutButton from "@/components/logout-button"

export default async function Home() {
  const session = await getCurrentSessionServerSide()

  return (
    <main className="">
      {session ? (
        <>
          <div>You are logged in as {JSON.stringify(session)}</div>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}
    </main>
  )
}

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LineChart, Loader2, LogOut } from "lucide-react"
import { toast } from "sonner"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [loading, user, router])

  async function handleSignOut() {
    await signOut()
    toast.success("Signed out.")
    router.replace("/login")
  }

  if (loading || !user) {
    return (
      <main className="flex min-h-svh flex-1 items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" aria-label="Loading" />
      </main>
    )
  }

  const displayName = user.displayName?.split(" ")[0] ?? user.email

  return (
    <main className="flex min-h-svh flex-1 flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LineChart className="size-5" aria-hidden="true" />
          </div>
          <span className="font-serif text-xl font-medium tracking-tight">LifeCFO AI</span>
        </div>
        <Button variant="ghost" size="lg" onClick={handleSignOut}>
          <LogOut data-icon="inline-start" />
          Sign out
        </Button>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-pretty font-serif text-4xl font-medium tracking-tight">
            Welcome, {displayName}.
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            You&apos;re signed in. Next, we&apos;ll set up your goals and income so your agent can
            start building your plan.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Set up your first goal</CardTitle>
            <CardDescription>
              Moving out, tuition, an emergency fund — tell us what you&apos;re working toward and
              we&apos;ll show you how to get there.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" disabled>
              Coming next
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

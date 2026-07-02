import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/auth-shell"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Sign in — LifeCFO AI",
  description: "Sign in to your LifeCFO AI account.",
}

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to pick up where you left off.">
      <AuthForm mode="signin" />
    </AuthShell>
  )
}

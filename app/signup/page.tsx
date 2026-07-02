import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/auth-shell"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Create account — LifeCFO AI",
  description: "Create your LifeCFO AI account and start planning toward your goals.",
}

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start turning your money into a plan for the life you want."
    >
      <AuthForm mode="signup" />
    </AuthShell>
  )
}

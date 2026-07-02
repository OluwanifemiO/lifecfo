"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { getAuthErrorMessage, useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { GoogleIcon } from "@/components/auth/google-icon"

type AuthFormProps = {
  mode: "signin" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const { signIn, signUp, signInWithGoogle } = useAuth()

  const isSignUp = mode === "signup"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const disabled = submitting || googleLoading

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (isSignUp && password.length < 6) {
      setError("Password should be at least 6 characters.")
      return
    }

    setSubmitting(true)
    try {
      if (isSignUp) {
        await signUp(email, password, name.trim() || undefined)
        toast.success("Account created. Welcome to LifeCFO AI.")
      } else {
        await signIn(email, password)
        toast.success("Welcome back.")
      }
      router.push("/")
    } catch (err) {
      setError(getAuthErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogle() {
    setError(null)
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
      toast.success("Signed in with Google.")
      router.push("/")
    } catch (err) {
      setError(getAuthErrorMessage(err))
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full"
        onClick={handleGoogle}
        disabled={disabled}
      >
        {googleLoading ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : (
          <GoogleIcon className="size-4" />
        )}
        Continue with Google
      </Button>

      <FieldSeparator>or</FieldSeparator>

      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          {isSignUp && (
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={disabled}
              />
            </Field>
          )}

          <Field data-invalid={!!error || undefined}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error || undefined}
              disabled={disabled}
            />
          </Field>

          <Field data-invalid={!!error || undefined}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              {!isSignUp && (
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                placeholder={isSignUp ? "At least 6 characters" : "Enter your password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!error || undefined}
                disabled={disabled}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {isSignUp && !error && (
              <FieldDescription>Use at least 6 characters.</FieldDescription>
            )}
            <FieldError>{error}</FieldError>
          </Field>

          <Button type="submit" className="h-11 w-full" disabled={disabled}>
            {submitting && <Loader2 className="animate-spin" aria-hidden="true" />}
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
        </FieldGroup>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <Link
          href={isSignUp ? "/login" : "/signup"}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {isSignUp ? "Sign in" : "Create one"}
        </Link>
      </p>
    </div>
  )
}

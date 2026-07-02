"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

type AuthContextValue = {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signUp: async (email, password, name) => {
        const credential = await createUserWithEmailAndPassword(auth, email, password)
        if (name) {
          await updateProfile(credential.user, { displayName: name })
        }
      },
      signIn: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
      },
      signInWithGoogle: async () => {
        await signInWithPopup(auth, googleProvider)
      },
      signOut: async () => {
        await firebaseSignOut(auth)
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

/**
 * Maps Firebase auth error codes to friendly messages.
 */
export function getAuthErrorMessage(error: unknown): string {
  const code = (error as { code?: string })?.code ?? ""
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address."
    case "auth/user-disabled":
      return "This account has been disabled."
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password."
    case "auth/email-already-in-use":
      return "An account with this email already exists."
    case "auth/weak-password":
      return "Password should be at least 6 characters."
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled."
    case "auth/popup-blocked":
      return "Popup blocked. Please allow popups and try again."
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later."
    default:
      return "Something went wrong. Please try again."
  }
}

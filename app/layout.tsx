import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Fraunces } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LifeCFO AI — Money decisions, aligned with your life goals",
  description:
    "LifeCFO AI is a goal-first personal finance agent that helps you connect everyday money decisions to the life you're trying to build.",
}

export const viewport: Viewport = {
  themeColor: "#1f3a5f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

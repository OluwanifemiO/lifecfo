import { LineChart } from "lucide-react"
import { BrandPanel } from "@/components/auth/brand-panel"

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <main className="grid min-h-svh flex-1 lg:grid-cols-2">
      <BrandPanel />

      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-8">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LineChart className="size-5" aria-hidden="true" />
            </div>
            <span className="font-serif text-xl font-medium tracking-tight">LifeCFO AI</span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-pretty font-serif text-3xl font-medium tracking-tight">{title}</h1>
            <p className="text-pretty text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </main>
  )
}

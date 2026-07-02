import { Compass, LineChart, Target } from "lucide-react"

const highlights = [
  {
    icon: Target,
    title: "Goal-first planning",
    description: "Turn moving out, tuition, or an emergency fund into a clear, fundable plan.",
  },
  {
    icon: Compass,
    title: "Can I afford this?",
    description: "Simulate a purchase or life decision and see the impact before you commit.",
  },
  {
    icon: LineChart,
    title: "Always on track",
    description: "Proactive check-ins tell you when you're ahead, behind, or at risk.",
  },
]

export function BrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground/10">
          <LineChart className="size-5" aria-hidden="true" />
        </div>
        <span className="font-serif text-xl font-medium tracking-tight">LifeCFO AI</span>
      </div>

      <div className="max-w-md">
        <h2 className="text-pretty font-serif text-4xl leading-tight font-medium">
          Tell us where you want your life to go.
        </h2>
        <p className="mt-4 text-pretty text-base leading-relaxed text-primary-foreground/70">
          We&apos;ll help you make the financial decisions to get there — not just track where your
          money went.
        </p>

        <ul className="mt-10 flex flex-col gap-6">
          {highlights.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex gap-4">
              <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-primary-foreground/70">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-primary-foreground/60">
        Before you spend, see how it affects your goals.
      </p>
    </aside>
  )
}

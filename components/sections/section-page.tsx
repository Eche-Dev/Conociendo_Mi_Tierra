import type { ReactNode } from 'react'

export function SectionPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-32 text-foreground md:px-12">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="text-sm uppercase tracking-[0.24em] text-primary">← Venezuela</a>
        <p className="mt-16 text-sm uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-9xl">{title}</h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-foreground/70">{intro}</p>
        <div className="mt-20">{children}</div>
      </div>
    </main>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type Chapter = { id: string; name: string }

export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(chapters.findIndex((c) => c.id === entry.target.id))
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    const targets = ['prologo', ...chapters.map((c) => c.id), 'epilogo']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [chapters])

  const current = active >= 0 ? chapters[active] : null

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-foreground/10" aria-hidden="true">
        <div className="page-progress h-full bg-primary" />
      </div>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-gradient-to-b from-background/70 to-transparent px-6 pb-8 pt-5 md:px-12">
        <a
          href="#inicio"
          className="pointer-events-auto font-display text-lg uppercase tracking-widest text-foreground"
        >
          Venezuela
        </a>
        <div className="pointer-events-auto flex items-center gap-4">
          <nav aria-label="Secciones principales" className="hidden items-center gap-4 text-[10px] uppercase tracking-[0.16em] text-foreground/70 md:flex">
            <a href="/turismo" className="transition-colors hover:text-primary">Turismo</a>
            <a href="/gastronomia" className="transition-colors hover:text-primary">Gastronomía</a>
            <a href="/espiritualidad" className="transition-colors hover:text-primary">Espiritualidad</a>
            <a href="/cultura" className="transition-colors hover:text-primary">Cultura</a>
            <a href="/naturaleza" className="transition-colors hover:text-primary">Naturaleza</a>
            <a href="/guia" className="transition-colors hover:text-primary">Guía</a>
          </nav>
          <p className="flex items-center gap-3 text-sm text-foreground/80" aria-live="polite">
            {current ? (
              <>
                <span className="font-display tracking-widest text-primary">
                  {String(active + 1).padStart(2, '0')} / {chapters.length}
                </span>
                <span className="hidden italic sm:inline">{current.name}</span>
              </>
            ) : (
              <span className="italic">Tierra de Gracia</span>
            )}
          </p>
        </div>
      </header>

      <nav
        aria-label="Capítulos del viaje"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ol className="flex flex-col items-end gap-3">
          {chapters.map((chapter, i) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={i === active ? 'true' : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={cn(
                    'text-sm italic text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100',
                    i === active && 'opacity-100',
                  )}
                >
                  {chapter.name}
                </span>
                <span
                  className={cn(
                    'block h-px w-4 bg-foreground/40 transition-all duration-500 group-hover:w-8 group-hover:bg-foreground',
                    i === active && 'w-10 bg-primary group-hover:bg-primary',
                  )}
                />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

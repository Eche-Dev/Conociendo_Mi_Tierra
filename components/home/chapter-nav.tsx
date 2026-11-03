'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { destinations } from '@/lib/data/destinations'

type Chapter = { id: string; name: string }

const chapters: Chapter[] = destinations.map(({ id, name }) => ({ id, name }))

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/turismo', label: 'Turismo' },
  { href: '/gastronomia', label: 'Gastronomía' },
  { href: '/espiritualidad', label: 'Espiritualidad' },
  { href: '/cultura', label: 'Cultura' },
  { href: '/naturaleza', label: 'Naturaleza' },
  { href: '/guia', label: 'Guía' },
]

export function ChapterNav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [active, setActive] = useState(-1)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isHome) {
      setActive(-1)
      return
    }
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
  }, [isHome, pathname])

  const current = active >= 0 ? chapters[active] : null
  const homeHref = isHome ? '#inicio' : '/'

  return (
    <>
      {isHome && (
        <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-foreground/10" aria-hidden="true">
          <div className="page-progress h-full bg-primary" />
        </div>
      )}

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-background/80 to-transparent px-6 pb-8 pt-5 md:px-12 backdrop-blur-[2px]">
        <a
          href={homeHref}
          className="pointer-events-auto font-display text-lg uppercase tracking-widest text-foreground hover:text-primary transition-colors"
        >
          Venezuela
        </a>
        <div className="pointer-events-auto flex items-center gap-4">
          <nav aria-label="Secciones principales" className="hidden items-center gap-4 text-[10px] uppercase tracking-[0.16em] text-foreground/70 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href === '/' ? homeHref : link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href && 'text-primary',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {isHome && (
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
          )}
          {/* Botón menú hamburguesa en móviles */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-background/80 text-foreground md:hidden transition-colors hover:border-primary hover:text-primary"
          >
            {mobileOpen ? <X className="h-4 w-4 text-primary" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* MENÚ MÓVIL PLEGABLE */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-xl px-6 pt-24 pb-10 md:hidden animate-in fade-in duration-200">
          <nav aria-label="Menú móvil" className="flex flex-col gap-5 border-t border-border/40 pt-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href === '/' ? homeHref : link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'font-display text-2xl uppercase tracking-wider transition-colors',
                  pathname === link.href ? 'text-primary' : 'text-foreground/80 hover:text-primary',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      {isHome && (
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
                      'pointer-events-none text-sm italic text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100',
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
      )}
    </>
  )
}

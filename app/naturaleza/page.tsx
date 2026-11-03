import type { Metadata } from 'next'
import Image from 'next/image'
import { BackLink } from '@/components/sections/back-link'
import { NaturalezaGrid } from '@/components/naturaleza/naturaleza-grid'

export const metadata: Metadata = {
  title: 'Naturaleza y Fauna · Santuarios de Biodiversidad',
  description:
    'Santuarios naturales y fauna emblemática de Venezuela: jaguares, cóndores andinos, delfines rosados, araguaneyes, orquídeas y las cumbres milenarias de los tepuyes.',
  alternates: {
    canonical: '/naturaleza',
  },
  openGraph: {
    title: 'Naturaleza y Fauna · Santuarios de Biodiversidad en Venezuela',
    description:
      'Santuarios naturales y fauna emblemática de Venezuela: jaguares, cóndores andinos, delfines rosados, araguaneyes, orquídeas y las cumbres de los tepuyes.',
    url: '/naturaleza',
    images: [
      {
        url: '/images/naturaleza/tepuy-cerro-autana-sagrado.jpg',
        width: 1200,
        height: 675,
        alt: 'Naturaleza virgen y el sagrado Cerro Autana en el estado Amazonas, Venezuela',
      },
    ],
  },
}

export default function NaturalezaPage() {
  return (
    <div className="relative">
      <BackLink />
      <main className="relative overflow-hidden bg-background text-foreground">
        {/* HERO HEADER INMERSIVO CON IMAGEN DE FONDO */}
        <div className="relative min-h-svh">
          <Image
            src="/images/naturaleza/tepuy-cerro-autana-sagrado.jpg"
            alt="Monumento Natural Cerro Autana emergiendo sobre la selva virgen de Amazonas, Venezuela"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
          <div className="relative z-10 flex min-h-svh flex-col justify-end gap-8 px-6 pb-16 pt-32 md:px-12 md:pb-24">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">04 · Vida y Biodiversidad Megadiversa</p>
            <h1 className="max-w-5xl font-display text-[clamp(3.4rem,11vw,10rem)] uppercase leading-[0.9]">
              Naturaleza y fauna
            </h1>
            <p className="max-w-3xl text-xl leading-relaxed text-foreground/85 md:text-2xl font-serif">
              Un santuario de contrastes biológicos que figura entre los diez países más megadiversos del planeta: desde los arrecifes de coral y manglares caribeños hasta los páramos helados, sabanas interminables y los tepuyes milenarios del escudo guayanés.
            </p>
          </div>
        </div>

        {/* CONTENEDOR CON LA CUADRÍCULA */}
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              Ecosistemas y Vida Silvestre
            </span>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight text-foreground md:text-5xl">
              Atlas de la naturaleza venezolana
            </h2>
          </div>
          <NaturalezaGrid />
        </div>
      </main>
    </div>
  )
}

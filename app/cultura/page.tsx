import type { Metadata } from 'next'
import Image from 'next/image'
import { BackLink } from '@/components/sections/back-link'
import { CulturaGrid } from '@/components/cultura/cultura-grid'

export const metadata: Metadata = {
  title: 'Cultura y Tradiciones · Memoria e Identidad',
  description:
    'Manifestaciones vivas del patrimonio inmaterial venezolano: tambores de San Juan, joropo llanero, gaita zuliana, carnavales de El Callao y artesanías ancestrales.',
  alternates: {
    canonical: '/cultura',
  },
  openGraph: {
    title: 'Cultura y Tradiciones · Memoria e Identidad Venezolana',
    description:
      'Manifestaciones vivas del patrimonio inmaterial venezolano: tambores de San Juan, joropo llanero, gaita zuliana, carnavales de El Callao y artesanías ancestrales.',
    url: '/cultura',
    images: [
      {
        url: '/images/cultura/carnaval-madamas-el-callao.jpg',
        width: 1200,
        height: 630,
        alt: 'Cultura y tradiciones vivas de Venezuela',
      },
    ],
  },
}

export default function CulturaPage() {
  return (
    <div className="relative">
      <BackLink />
      <main className="relative overflow-hidden bg-background text-foreground">
        {/* HERO HEADER INMERSIVO CON IMAGEN DE FONDO */}
        <div className="relative min-h-svh">
          <Image
            src="/images/cultura/carnaval-madamas-el-callao.jpg"
            alt="Manifestaciones culturales, danzas y tradiciones vivas de Venezuela"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
          <div className="relative z-10 flex min-h-svh flex-col justify-end gap-8 px-6 pb-16 pt-32 md:px-12 md:pb-24">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">03 · Identidad y Patrimonio Vivo</p>
            <h1 className="max-w-5xl font-display text-[clamp(3.4rem,11vw,10rem)] uppercase leading-[0.9]">
              Cultura y tradiciones
            </h1>
            <p className="max-w-3xl text-xl leading-relaxed text-foreground/85 md:text-2xl font-serif">
              Una cultura hecha de ritmo, oficio, celebración y memoria colectiva: del repique de tambores de Barlovento y el joropo llanero al calipso de El Callao, las gaitas zulianas y el tejido ancestral.
            </p>
          </div>
        </div>

        {/* CONTENEDOR CON LA CUADRÍCULA */}
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              Fiestas, Ritmos y Saberes
            </span>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight text-foreground md:text-5xl">
              Atlas de la identidad venezolana
            </h2>
          </div>
          <CulturaGrid />
        </div>
      </main>
    </div>
  )
}

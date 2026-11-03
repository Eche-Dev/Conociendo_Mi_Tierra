import type { Metadata } from 'next'
import Image from 'next/image'
import { BackLink } from '@/components/sections/back-link'
import { GuiaGrid } from '@/components/guia/guia-grid'
import { RegionTour } from '@/components/sections/region-tour'

export const metadata: Metadata = {
  title: 'Guía del Viajero · Consejos Prácticos y Logística',
  description:
    'Todo lo que necesitas saber antes de viajar por Venezuela: logística de transporte, clima por regiones, moneda y pagos, salud y vacunas, equipo recomendado y turismo responsable.',
  alternates: {
    canonical: '/guia',
  },
  openGraph: {
    title: 'Guía del Viajero · Consejos Prácticos y Logística en Venezuela',
    description:
      'Todo lo que necesitas saber antes de viajar por Venezuela: transporte, clima, moneda y pagos, salud, equipo y turismo ético.',
    url: '/guia',
    images: [
      {
        url: '/images/guia/guia-equipo-trekking-sabana-contemplando.jpg',
        width: 1200,
        height: 675,
        alt: 'Expedicionario contemplando los horizontes y tepuyes de Venezuela en la Gran Sabana',
      },
    ],
  },
}

export default function GuiaPage() {
  return (
    <div className="relative">
      <BackLink />
      <main className="relative overflow-hidden bg-background text-foreground">
        {/* HERO HEADER INMERSIVO CON IMAGEN DE FONDO */}
        <div className="relative min-h-svh">
          <Image
            src="/images/guia/guia-equipo-trekking-sabana-contemplando.jpg"
            alt="Viajero contemplando la inmensidad de la Gran Sabana y los tepuyes de Venezuela"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
          <div className="relative z-10 flex min-h-svh flex-col justify-end gap-8 px-6 pb-16 pt-32 md:px-12 md:pb-24">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">05 · Preparar el viaje y Logística</p>
            <h1 className="max-w-5xl font-display text-[clamp(3.4rem,11vw,10rem)] uppercase leading-[0.9]">
              Guía del viajero
            </h1>
            <p className="max-w-3xl text-xl leading-relaxed text-foreground/85 md:text-2xl font-serif">
              Información esencial, recomendaciones prácticas, clima, transporte, moneda, salud y equipo para recorrer con respeto, curiosidad y sentido de aventura los diversos ecosistemas de Venezuela.
            </p>
          </div>
        </div>

        {/* CONTENEDOR CON LA CUADRÍCULA Y EL RECORRIDO REGIONAL */}
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              Consejos Prácticos y Logística
            </span>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight text-foreground md:text-5xl">
              Atlas práctico del viajero
            </h2>
          </div>
          <GuiaGrid />
          <RegionTour />
        </div>
      </main>
    </div>
  )
}

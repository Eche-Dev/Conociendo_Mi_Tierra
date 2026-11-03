import type { Metadata } from 'next'
import { SectionPage } from '@/components/sections/section-page'
import { TurismoGrid } from '@/components/turismo/turismo-grid'
import { destinations } from '@/lib/data/destinations'

export const metadata: Metadata = {
  title: 'Turismo · Atlas Vivo de Venezuela',
  description:
    'Explora los 30 grandes destinos de Venezuela en un atlas visual interactivo con vuelos y tours 3D: Los Roques, Salto Ángel, Canaima, Roraima, Mérida, Catatumbo y más.',
  alternates: {
    canonical: '/turismo',
  },
  openGraph: {
    title: 'Turismo · Atlas Vivo de Venezuela',
    description:
      'Explora los 30 grandes destinos de Venezuela en un atlas visual interactivo con vuelos y tours 3D: Los Roques, Salto Ángel, Canaima, Roraima, Mérida, Catatumbo y más.',
    url: '/turismo',
    images: [
      {
        url: '/images/destinations/salto-angel/1.jpg',
        width: 1200,
        height: 675,
        alt: 'Salto Ángel en el Parque Nacional Canaima, Venezuela',
      },
    ],
  },
}

export default function TurismoPage() {
  return (
    <SectionPage
      eyebrow="01 · Territorio"
      title="Turismo"
      intro="Del Caribe de coral a los tepuyes del Escudo Guayanés: un atlas vivo de paisajes, memoria y aventura."
    >
      <TurismoGrid destinations={destinations} />
    </SectionPage>
  )
}

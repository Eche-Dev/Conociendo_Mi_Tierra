import type { Metadata } from 'next'
import { SectionPage } from '@/components/sections/section-page'
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
        url: '/images/destinations/canaima/1.jpg',
        width: 1200,
        height: 675,
        alt: 'Naturaleza y paisajes del Parque Nacional Canaima',
      },
    ],
  },
}

export default function NaturalezaPage() {
  return (
    <SectionPage
      eyebrow="04 · Vida"
      title="Naturaleza y fauna"
      intro="Un país de contrastes biológicos: manglares, páramos, sabanas y selvas que sostienen especies únicas."
    >
      <NaturalezaGrid />
    </SectionPage>
  )
}

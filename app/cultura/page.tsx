import type { Metadata } from 'next'
import { SectionPage } from '@/components/sections/section-page'
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
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Cultura y tradiciones vivas de Venezuela',
      },
    ],
  },
}

export default function CulturaPage() {
  return (
    <SectionPage
      eyebrow="03 · Identidad"
      title="Cultura y tradiciones"
      intro="Una cultura hecha de ritmo, oficio, celebración y memoria colectiva."
    >
      <CulturaGrid />
    </SectionPage>
  )
}

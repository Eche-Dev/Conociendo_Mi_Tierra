import type { Metadata } from 'next'
import { Spirituality } from '@/components/home/spirituality'
import { BackLink } from '@/components/sections/back-link'

export const metadata: Metadata = {
  title: 'Espiritualidad y Fe Popular · Venezuela Sagrada',
  description:
    'El mapa espiritual de Venezuela: el culto místico a María Lionza en Sorte, el fervor mariano de la Divina Pastora, el Nazareno de San Pablo, la Virgen de Coromoto y las cosmovisiones indígenas.',
  alternates: {
    canonical: '/espiritualidad',
  },
  openGraph: {
    title: 'Espiritualidad y Fe Popular · Venezuela Sagrada',
    description:
      'El mapa espiritual de Venezuela: el culto a María Lionza en Sorte, la Divina Pastora, el Nazareno de San Pablo, la Virgen de Coromoto y tradiciones ancestrales.',
    url: '/espiritualidad',
    images: [
      {
        url: '/images/sorte.png',
        width: 1200,
        height: 675,
        alt: 'Espiritualidad y devoción en Venezuela',
      },
    ],
  },
}

export default function EspiritualidadPage() {
  return (
    <div className="relative">
      <BackLink />
      <Spirituality />
    </div>
  )
}

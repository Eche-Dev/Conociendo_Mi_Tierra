import type { Metadata } from 'next'
import { SectionPage } from '@/components/sections/section-page'
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
        url: '/images/destinations/los-roques/1.jpg',
        width: 1200,
        height: 675,
        alt: 'Guía del viajero para recorrer Venezuela',
      },
    ],
  },
}

export default function GuiaPage() {
  return (
    <SectionPage
      eyebrow="05 · Preparar el viaje"
      title="Guía del viajero"
      intro="Información esencial para moverte con respeto, curiosidad y sentido práctico por los diversos ecosistemas de Venezuela."
    >
      <>
        <GuiaGrid />
        <RegionTour />
      </>
    </SectionPage>
  )
}

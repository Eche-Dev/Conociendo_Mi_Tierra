import type { Metadata } from 'next'
import { Gastronomy } from '@/components/home/gastronomy'
import { BackLink } from '@/components/sections/back-link'

export const metadata: Metadata = {
  title: 'Gastronomía Tradicional · Sabores de Venezuela',
  description:
    'Un recorrido culinario por las recetas emblemáticas venezolanas: arepas de budare, pabellón criollo, hallacas navideñas, cachapas de maíz tierno, bebidas tradicionales y dulcería criolla.',
  alternates: {
    canonical: '/gastronomia',
  },
  openGraph: {
    title: 'Gastronomía Tradicional · Sabores de Venezuela',
    description:
      'Un recorrido culinario por las recetas emblemáticas venezolanas: arepas, pabellón criollo, hallacas, cachapas, asado negro y dulcería criolla.',
    url: '/gastronomia',
    images: [
      {
        url: '/images/arepas.png',
        width: 1200,
        height: 675,
        alt: 'Gastronomía y arepas tradicionales de Venezuela',
      },
    ],
  },
}

export default function GastronomiaPage() {
  return (
    <div className="relative">
      <BackLink />
      <Gastronomy />
    </div>
  )
}

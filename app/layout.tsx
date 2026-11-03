import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Source_Serif_4 } from 'next/font/google'
import { ChapterNav } from '@/components/home/chapter-nav'
import './globals.css'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' })
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  style: ['normal', 'italic'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://conociendo-mi-tierra.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Venezuela · Un viaje por la Tierra de Gracia',
    template: '%s | Conociendo Mi Tierra',
  },
  description:
    'Un recorrido inmersivo y atlas visual por los 30 grandes destinos de Venezuela: Los Roques, Salto Ángel, Roraima, Mérida, Catatumbo, Morrocoy, Delta del Orinoco, gastronomía, espiritualidad y biodiversidad.',
  applicationName: 'Conociendo Mi Tierra',
  authors: [{ name: 'Conociendo Mi Tierra', url: siteUrl }],
  creator: 'Conociendo Mi Tierra',
  publisher: 'Conociendo Mi Tierra',
  keywords: [
    'Venezuela',
    'Turismo Venezuela',
    'Salto Ángel',
    'Los Roques',
    'Canaima',
    'Monte Roraima',
    'Mérida',
    'Sierra Nevada',
    'Relámpago del Catatumbo',
    'Morrocoy',
    'Gastronomía venezolana',
    'Viajes Venezuela',
    'Guía turística Venezuela',
    'Tierra de Gracia',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: siteUrl,
    siteName: 'Conociendo Mi Tierra',
    title: 'Venezuela · Un viaje por la Tierra de Gracia',
    description:
      'Guía interactiva y atlas visual de Venezuela: 30 destinos inmersivos en 3D, gastronomía ancestral, espiritualidad, tradiciones vivas y naturaleza.',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Conociendo Mi Tierra - Paisajes y Maravillas de Venezuela',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venezuela · Un viaje por la Tierra de Gracia',
    description:
      'Guía interactiva y atlas visual de Venezuela: 30 destinos inmersivos en 3D, gastronomía, espiritualidad y naturaleza.',
    images: ['/images/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#11192a',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Conociendo Mi Tierra',
      description: 'Guía turística inmersiva y atlas cultural de Venezuela',
      inLanguage: 'es',
    },
    {
      '@type': 'TravelGuide',
      '@id': `${siteUrl}/#guide`,
      name: 'Guía de Viaje de Venezuela · Tierra de Gracia',
      description:
        'Recorrido integral por los 30 destinos patrimoniales, parques nacionales, gastronomía típica, tradiciones y vida silvestre de Venezuela.',
      about: {
        '@type': 'Country',
        name: 'Venezuela',
      },
      inLanguage: 'es',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${anton.variable} ${sourceSerif.variable} bg-background scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-serif antialiased">
        <ChapterNav />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

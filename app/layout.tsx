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
    default: 'Conociendo Mi Tierra · Un viaje por la Tierra de Gracia',
    template: '%s | Conociendo Mi Tierra',
  },
  description:
    'Un recorrido sonoro y visual por la riqueza de Venezuela: Salto Ángel, Los Roques, Roraima, Los Llanos, sabores criollos y la memoria cultural de un país inolvidable.',
  applicationName: 'Conociendo Mi Tierra',
  authors: [{ name: 'Conociendo Mi Tierra', url: siteUrl }],
  creator: 'Conociendo Mi Tierra',
  publisher: 'Conociendo Mi Tierra',
  keywords: [
    'Venezuela',
    'Conociendo Mi Tierra',
    'Turismo Venezuela',
    'Salto Ángel',
    'Los Roques',
    'Canaima',
    'Monte Roraima',
    'Los Llanos',
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
    title: 'Conociendo Mi Tierra · Un viaje por la Tierra de Gracia',
    description:
      'Un recorrido sonoro y visual por la riqueza de Venezuela: Salto Ángel, Los Roques, Roraima, Los Llanos, sabores criollos y la memoria cultural de un país inolvidable.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Conociendo Mi Tierra · Atardecer en Los Llanos venezolanos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conociendo Mi Tierra · Un viaje por la Tierra de Gracia',
    description:
      'Un recorrido sonoro y visual por la riqueza de Venezuela: Salto Ángel, Los Roques, Roraima, Los Llanos, sabores criollos y la memoria cultural de un país inolvidable.',
    images: ['/og-image.jpg'],
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
      { url: '/favicon.ico' },
      { url: '/icon-light-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  verification: {
    google: '2eP1uWUcRkT2hYPCCnJ6qUt-qUYH3ECbHy_PPwj3L6M',
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
        <meta name="google-site-verification" content="2eP1uWUcRkT2hYPCCnJ6qUt-qUYH3ECbHy_PPwj3L6M" />
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

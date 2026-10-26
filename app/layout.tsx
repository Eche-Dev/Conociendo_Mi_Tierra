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

export const metadata: Metadata = {
  title: 'Venezuela · Un viaje por la Tierra de Gracia',
  description:
    'Un recorrido inmersivo por los paisajes de Venezuela: Los Roques, Margarita, Médanos de Coro, el Relámpago del Catatumbo, Mérida, Los Llanos, el Delta del Orinoco, Canaima, el Salto Ángel y el Roraima.',
  generator: 'v0.app',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${anton.variable} ${sourceSerif.variable} bg-background scroll-smooth`}>
      <body className="font-serif antialiased">
        <ChapterNav />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Conociendo Mi Tierra · Venezuela',
    short_name: 'Conociendo Mi Tierra',
    description:
      'Guía interactiva y atlas visual de Venezuela: paisajes, cultura, gastronomía y naturaleza viva.',
    start_url: '/',
    display: 'standalone',
    background_color: '#11192a',
    theme_color: '#11192a',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

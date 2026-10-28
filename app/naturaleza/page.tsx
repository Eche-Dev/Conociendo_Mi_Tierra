import { SectionPage } from '@/components/sections/section-page'
import { NaturalezaGrid } from '@/components/naturaleza/naturaleza-grid'

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

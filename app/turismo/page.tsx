import { SectionPage } from '@/components/sections/section-page'
import { TurismoGrid } from '@/components/turismo/turismo-grid'
import { destinations } from '@/lib/data/destinations'

export default function TurismoPage() {
  return (
    <SectionPage
      eyebrow="01 · Territorio"
      title="Turismo"
      intro="Del Caribe de coral a los tepuyes del Escudo Guayanés: un atlas vivo de paisajes, memoria y aventura."
    >
      <TurismoGrid destinations={destinations} />
    </SectionPage>
  )
}

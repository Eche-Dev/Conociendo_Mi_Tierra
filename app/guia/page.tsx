import { SectionPage } from '@/components/sections/section-page'
import { GuiaGrid } from '@/components/guia/guia-grid'
import { RegionTour } from '@/components/sections/region-tour'

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

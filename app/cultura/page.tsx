import { SectionPage } from '@/components/sections/section-page'
import { CulturaGrid } from '@/components/cultura/cultura-grid'

export default function CulturaPage() {
  return (
    <SectionPage
      eyebrow="03 · Identidad"
      title="Cultura y tradiciones"
      intro="Una cultura hecha de ritmo, oficio, celebración y memoria colectiva."
    >
      <CulturaGrid />
    </SectionPage>
  )
}

import { SectionPage } from '@/components/sections/section-page'
import { InfoCard } from '@/components/sections/info-card'
import { destinations } from '@/lib/data/destinations'

export default function TurismoPage() {
  return (
    <SectionPage
      eyebrow="01 · Territorio"
      title="Turismo"
      intro="Del Caribe de coral a los tepuyes del Escudo Guayanés: un atlas vivo de paisajes, memoria y aventura."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {destinations.map((d) => (
          <InfoCard key={d.id} title={d.name} text={d.description} image={d.image} />
        ))}
      </div>
    </SectionPage>
  )
}

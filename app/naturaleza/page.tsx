import { SectionPage } from '@/components/sections/section-page'
import { InfoCard } from '@/components/sections/info-card'

export default function NaturalezaPage() {
  return (
    <SectionPage
      eyebrow="04 · Vida"
      title="Naturaleza y fauna"
      intro="Un país de contrastes biológicos: manglares, páramos, sabanas y selvas que sostienen especies únicas."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard
          title="Fauna emblemática"
          image="/images/catatumbo.png"
          text="El jaguar, el oso frontino, la tonina del Orinoco, el araguato, el chigüire y el cóndor andino forman parte de la memoria natural venezolana. Sus hábitats van desde selvas y ríos hasta páramos y sabanas."
        />
        <InfoCard
          title="Aves"
          image="/images/delta.png"
          text="Guacamayas, garzas, corocoras, colibríes y el guácharo atraviesan cielos muy distintos: desde los manglares del Delta del Orinoco hasta las cumbres andinas. Venezuela es un destino privilegiado para observar aves."
        />
        <InfoCard
          title="Flora"
          image="/images/roraima.png"
          text="Frailejones, moriches, orquídeas, bromelias y manglares revelan cómo cada ecosistema inventa su propia forma de vida. Los tepuyes también guardan especies endémicas que no existen en ningún otro lugar."
        />
        <InfoCard
          title="Cuidar el territorio"
          image="/images/los-roques.png"
          text="Viajar con guías locales, no extraer especies, reducir residuos y respetar áreas protegidas mantiene vivos estos paisajes. La conservación también significa apoyar a las comunidades que protegen el territorio."
        />
      </div>
    </SectionPage>
  )
}

import { SectionPage } from '@/components/sections/section-page'
import { InfoCard } from '@/components/sections/info-card'

export default function CulturaPage() {
  return (
    <SectionPage
      eyebrow="03 · Identidad"
      title="Cultura y tradiciones"
      intro="Una cultura hecha de ritmo, oficio, celebración y memoria colectiva."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard
          title="Joropo"
          image="/images/llanos.png"
          text="El arpa, el cuatro y las maracas sostienen una música de encuentro nacida en los Llanos. El baile combina zapateo, giros y diálogo entre pareja; sus letras hablan de trabajo, paisaje y amor."
        />
        <InfoCard
          title="Tambores de Barlovento"
          image="/images/choroni.png"
          text="En la costa central, los tambores afrovenezolanos reúnen comunidad, canto y danza. San Juan Bautista es una de sus celebraciones más vibrantes, con repiques que cambian según cada pueblo."
        />
        <InfoCard
          title="Carnaval y ferias"
          image="/images/galipan.png"
          text="De El Callao a Mérida, las fiestas populares transforman calles y plazas con comparsas, máscaras, música y promesas compartidas. Las ferias también celebran cosechas, santos y oficios locales."
        />
        <InfoCard
          title="Artesanía"
          image="/images/canaima.png"
          text="Chinchorros, cestería warao, cerámica, tejidos de Tintorero y tallas de madera cuentan historias de territorio y saber transmitido. Cada objeto conserva una técnica y una memoria familiar."
        />
      </div>
    </SectionPage>
  )
}

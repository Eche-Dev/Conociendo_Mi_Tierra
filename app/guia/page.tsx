import { SectionPage } from '@/components/sections/section-page'
import { InfoCard } from '@/components/sections/info-card'
import { RegionTour } from '@/components/sections/region-tour'

export default function GuiaPage() {
  return (
    <SectionPage
      eyebrow="05 · Preparar el viaje"
      title="Guía del viajero"
      intro="Información esencial para moverte con respeto, curiosidad y sentido práctico."
    >
      <>
        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard
            title="Clima y equipaje"
            image="/images/hero.png"
            text="Venezuela cambia mucho según la región: Caribe cálido, Andes fríos, Llanos con estación seca y lluviosa, y selvas húmedas. Lleva protección solar, repelente, impermeable y capas abrigadas para la montaña; revisa la temporada antes de partir."
          />
          <InfoCard
            title="Moneda y pagos"
            image="/images/medanos-coro.png"
            text="La moneda oficial es el bolívar. Lleva alternativas de pago, consulta las condiciones locales y considera que en zonas remotas puede haber poca señal, cajeros limitados y necesidad de efectivo."
          />
          <InfoCard
            title="Transporte y planificación"
            image="/images/canaima.png"
            text="Caracas y las principales ciudades conectan por carretera y vuelos nacionales. Para cayos, delta y tepuyes suelen ser necesarios peñeros, curiaras, vehículos 4x4 o guías autorizados. Reserva con operadores formales."
          />
          <InfoCard
            title="Viaje responsable"
            image="/images/los-roques.png"
            text="Respeta comunidades y sitios sagrados, evita comprar fauna o piezas arqueológicas, no dejes residuos y pide permiso antes de fotografiar personas o ceremonias. En áreas protegidas, sigue siempre las indicaciones locales."
          />
        </div>
        <RegionTour />
      </>
    </SectionPage>
  )
}

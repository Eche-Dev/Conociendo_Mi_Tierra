'use client'

import { useState } from 'react'
import { Compass, Sparkles, ArrowUpRight } from 'lucide-react'
import { IMMERSIVE_TOURS, type ImmersiveTour } from '@/lib/data/immersive-tours'
import { ImmersiveTourViewer } from '@/components/tours/immersive-tour-viewer'

export interface GuiaCard {
  id: string
  title: string
  eyebrow: string
  coords: string
  tagline: string
  image: string
  alt: string
  description: string
  facts: { label: string; value: string }[]
  hasTour?: boolean
}

export const GUIA_CARDS: GuiaCard[] = [
  {
    id: 'clima-y-temporadas',
    title: 'Clima, Pisos Térmicos y Temporadas de Viaje',
    eyebrow: 'Andes · Caribe · Llanos · Selva · Gran Sabana',
    coords: 'Ecuatorial y Microclimas Diversos',
    tagline: 'De la nieve de Mérida al sol del Caribe, sequía llanera y las lluvias del sur',
    image: '/images/guia/guia-clima-canaima-salto-angel.jpg',
    alt: 'Imponente vista del Salto Ángel con caudal pleno en temporada de lluvias en Canaima',
    description:
      'Venezuela no posee las cuatro estaciones templadas, sino un dinámico régimen tropical marcado por dos periodos (seco y de lluvias) y una extraordinaria variedad de pisos térmicos dictados por la altitud. Conocer el calendario climático es la clave para ver el Salto Ángel con caudal pleno, avistar fauna congregada en los esteros de los Llanos o coronar las cumbres andinas despejadas de niebla.',
    facts: [
      { label: 'Periodo Seco', value: 'Dic a Abril (Verano)' },
      { label: 'Periodo Lluvias', value: 'Mayo a Nov (Invierno)' },
      { label: 'Pisos Térmicos', value: 'De -5°C a +35°C' },
    ],
    hasTour: true,
  },
  {
    id: 'transporte-y-rutas',
    title: 'Transporte, Rutas y Conectividad',
    eyebrow: 'Vuelos · Peñeros · Curiaras · 4x4 · Carreteras',
    coords: 'Movilidad Multimodal Nacional',
    tagline: 'Del puente aéreo de Maiquetía a las curiaras fluviales y pistas de tierra de la selva',
    image: '/images/guia/guia-transporte-avioneta-canaima.jpg',
    alt: 'Avioneta Cessna de pasajeros en la pista de aterrizaje frente a la selva en Canaima',
    description:
      'Moverse por Venezuela es una aventura multimodal: vuelos comerciales y avionetas Cessna enlazan Caracas con Los Roques o Canaima, mientras peñeros tradicionales conducen a cayos vírgenes de Morrocoy y Mochima, curiaras indígenas remontan ríos guayaneses y rústicos 4x4 dominan las pistas de la Gran Sabana.',
    facts: [
      { label: 'Hub Principal', value: 'Maiquetía (Caracas)' },
      { label: 'Vía Acuática', value: 'Peñeros y Curiaras' },
      { label: 'Terrestre Remoto', value: 'Tracción 4x4 Obligatoria' },
    ],
    hasTour: true,
  },
  {
    id: 'moneda-salud-conectividad',
    title: 'Moneda, Conectividad y Salud del Viajero',
    eyebrow: 'Bolívares · Divisas · SIM Local · Vacunas · Efectivo',
    coords: 'Guía Práctica de Servicios',
    tagline: 'Efectivo en zonas remotas, tarjetas digitales, chips locales y prevención sanitaria',
    image: '/images/guia/guia-moneda-billetes-bolivares.jpg',
    alt: 'Billetes de bolívares de Venezuela y medios de pago para gastos de viaje',
    description:
      'En las grandes ciudades rige el pago móvil y puntos de venta bancarios junto al dólar en efectivo, pero en destinos remotos como Canaima, Roraima o pueblos costeros el efectivo en billetes de baja denominación es indispensable. La vacuna contra la fiebre amarilla es obligatoria para zonas selváticas y se recomienda adquirir SIM cards locales.',
    facts: [
      { label: 'Moneda Oficial', value: 'Bolívar (Bs.) y Multidivisa' },
      { label: 'Salud Obligatoria', value: 'Fiebre Amarilla (Selva)' },
      { label: 'Zonas Aisladas', value: 'Efectivo Físico Esencial' },
    ],
    hasTour: true,
  },
  {
    id: 'viaje-responsable-comunidades',
    title: 'Viaje Responsable y Respeto a Comunidades',
    eyebrow: 'Pueblos Originarios · Inparques · Dejar Cero Huella',
    coords: 'Ética y Conservación Biocultural',
    tagline: 'Territorios sagrados Pemón, Warao y Wayúu, custodia de parques y turismo regenerativo',
    image: '/images/guia/guia-comunidad-pemon-san-francisco.jpg',
    alt: 'Poblado indígena Pemón en San Francisco de Yuruaní con tepuyes al fondo',
    description:
      'Gran parte de los tesoros naturales de Venezuela están dentro de Parques Nacionales y territorios ancestrales de naciones originarias. Viajar con respeto implica solicitar permiso antes de fotografiar a las comunidades, contratar guías locales nativos, no extraer cristales, corales ni plantas y regresar toda la basura inorgánica generada en expediciones.',
    facts: [
      { label: 'Comunidades', value: 'Pemón, Warao, Wayúu' },
      { label: 'Normativa', value: 'Reglamento INPARQUES' },
      { label: 'Principio Ético', value: 'Cero Huella Ecológica' },
    ],
    hasTour: true,
  },
  {
    id: 'equipamiento-y-seguridad',
    title: 'Equipamiento y Logística por Ecosistema',
    eyebrow: 'Trekking · Buceo · Selva · Páramo · Dunas',
    coords: 'Checklist del Aventurero',
    tagline: 'Capas térmicas, botas de montaña, esnórquel, linternas frontales y preparación',
    image: '/images/guia/guia-equipo-trekking-sabana-contemplando.jpg',
    alt: 'Viajero contemplando la inmensidad de la Gran Sabana con equipamiento técnico',
    description:
      'Desde el frío extremo bajo cero en las cumbres de Mérida hasta la humedad de la selva y el sol reflectivo de los cayos de coral, empacar de forma estratégica marca la diferencia entre el disfrute y el riesgo: capas técnicas de ropa, calzado de montaña con buen agarre, bolsas secas estancas y sistemas de iluminación confiables.',
    facts: [
      { label: 'Montaña', value: 'Capas y Cortavientos' },
      { label: 'Selva y Río', value: 'Bolsas Secas Estancas' },
      { label: 'Caribe', value: 'Protección UV y Rashguard' },
    ],
    hasTour: true,
  },
]

export function GuiaGrid() {
  const [activeTour, setActiveTour] = useState<ImmersiveTour | null>(null)

  const handleOpenTour = (cardId: string) => {
    const tour = IMMERSIVE_TOURS[cardId]
    if (tour) {
      setActiveTour(tour)
    }
  }

  const handleCloseTour = () => {
    setActiveTour(null)
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        {GUIA_CARDS.map((d) => {
          const hasTour = Boolean(d.hasTour && IMMERSIVE_TOURS[d.id])

          return (
            <article
              key={d.id}
              className={`group relative overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                hasTour
                  ? 'border-primary/40 bg-card/70 hover:border-primary hover:shadow-2xl hover:shadow-primary/10'
                  : 'border-foreground/15 bg-card/40 hover:border-foreground/30'
              }`}
            >
              <div>
                {/* Imagen de la tarjeta con aspect-[16/9] exacto de Turismo */}
                <div
                  className={`relative aspect-[16/9] w-full overflow-hidden bg-background/50 ${
                    hasTour ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => hasTour && handleOpenTour(d.id)}
                >
                  <img
                    src={d.image}
                    alt={d.alt || `Guía del viajero: ${d.title}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Badge de Scroll World si tiene tour interactivo */}
                  {hasTour && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-background/90 px-3.5 py-1 text-xs font-mono font-semibold text-primary border border-primary/50 backdrop-blur-md shadow-lg">
                      <Sparkles className="h-3.5 w-3.5 animate-spin" />
                      <span>Scroll World · Vuelo 3D</span>
                    </div>
                  )}

                  {/* Overlay interactivo para temas con tour */}
                  {hasTour && (
                    <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-background shadow-xl">
                        <Compass className="h-4 w-4" />
                        Gira la rueda para entrar
                      </span>
                    </div>
                  )}
                </div>

                {/* Contenido de la tarjeta con padding y tipografías idénticas a Turismo */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-primary/80">
                      {d.eyebrow}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{d.coords}</span>
                  </div>

                  <h2 className="mt-2 font-display text-3xl md:text-4xl uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {d.title}
                  </h2>

                  <p className="mt-1 font-serif text-sm italic text-primary/90">
                    «{d.tagline}»
                  </p>

                  <p className="mt-4 leading-relaxed text-foreground/75 text-sm md:text-base font-serif">
                    {d.description}
                  </p>

                  {/* Datos rápidos en 3 columnas idénticos a Turismo */}
                  {d.facts && d.facts.length > 0 && (
                    <div className="mt-6 grid grid-cols-3 gap-2 border-t border-foreground/10 pt-4">
                      {d.facts.map((fact, idx) => (
                        <div key={idx} className="text-center">
                          <span className="block text-[11px] font-mono uppercase text-muted-foreground">
                            {fact.label}
                          </span>
                          <span className="block font-display text-sm md:text-base text-foreground mt-0.5">
                            {fact.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Pie de tarjeta con ÚNICAMENTE el botón de acción de Turismo */}
              {hasTour && (
                <div className="p-6 pt-0 md:p-8 md:pt-0">
                  <button
                    onClick={() => handleOpenTour(d.id)}
                    className="w-full flex items-center justify-center gap-2 rounded-md border border-primary/60 bg-primary/10 hover:bg-primary text-primary hover:text-background py-3 px-4 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md group/btn"
                  >
                    <Compass className="h-4 w-4 transition-transform group-hover/btn:rotate-45" />
                    <span>Iniciar Vuelo Inmersivo (Rueda del ratón)</span>
                    <ArrowUpRight className="h-4 w-4 ml-auto" />
                  </button>
                </div>
              )}
            </article>
          )
        })}
      </div>

      {/* Visor modal inmersivo a pantalla completa */}
      {activeTour && (
        <ImmersiveTourViewer
          tour={activeTour}
          isOpen={Boolean(activeTour)}
          onClose={handleCloseTour}
        />
      )}
    </>
  )
}

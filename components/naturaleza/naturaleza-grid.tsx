'use client'

import { useState } from 'react'
import { Compass, Sparkles, ArrowUpRight } from 'lucide-react'
import { IMMERSIVE_TOURS, type ImmersiveTour } from '@/lib/data/immersive-tours'
import { ImmersiveTourViewer } from '@/components/tours/immersive-tour-viewer'

export interface NatureCard {
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

export const NATURE_CARDS: NatureCard[] = [
  {
    id: 'fauna-emblematica',
    title: 'Fauna Emblemática de Venezuela',
    eyebrow: 'Amazonas · Los Llanos · Andes · Guayana',
    coords: 'Biodiversidad Megadiversa',
    tagline: 'El jaguar, el oso frontino, la tonina del Orinoco y los gigantes del reino salvaje',
    image: '/images/naturaleza/fauna-jaguar-venezolano.jpg',
    alt: 'Majestuoso jaguar venezolano en su entorno natural con mirada atenta',
    description:
      'Venezuela figura entre los 10 países con mayor biodiversidad del planeta. Desde el señorío del jaguar en las selvas vírgenes del Caura hasta el esquivo oso frontino en las cumbres de Mérida, las toninas rosadas en los ríos de la Orinoquía y manadas pacíficas de chigüires en los esteros llaneros, su territorio resguarda tesoros zoológicos irrepetibles.',
    facts: [
      { label: 'Rango Mundial', value: 'Top 10 Megadiverso' },
      { label: 'Especie Única', value: 'Oso Frontino Andino' },
      { label: 'Símbolo Río', value: 'Tonina del Orinoco' },
    ],
    hasTour: true,
  },
  {
    id: 'aves-de-venezuela',
    title: 'Aves y Cielos de Venezuela',
    eyebrow: 'Caripe · Delta · Caracas · Llanos · Andes',
    coords: '+1.400 Especies Registradas',
    tagline: 'Del canto del turpial y el vuelo del guácharo a las guacamayas libres y el águila arpía',
    image: '/images/naturaleza/aves-turpial-nacional.jpg',
    alt: 'Turpial venezolano posado en una rama luciendo su plumaje amarillo y negro',
    description:
      'Un paraíso ornitológico con casi el 15% de las aves del mundo: el turpial (Ave Nacional), el Guácharo en sus cavernas sagradas de Caripe, las bandadas multicolores de guacamayas sobre Caracas, las corocoras rojas en los esteros y el colosal vuelo del águila arpía en el dosel guayanés.',
    facts: [
      { label: 'Ave Nacional', value: 'Turpial Amarillo' },
      { label: 'Cueva Sagrada', value: 'Guácharo (Caripe)' },
      { label: 'Poder Aéreo', value: 'Águila Arpía' },
    ],
    hasTour: true,
  },
  {
    id: 'flora-y-endemismo',
    title: 'Flora y Ecosistemas Únicos',
    eyebrow: 'Tepuyes · Páramos · Sabanas · Selvas Nubladas',
    coords: 'Endemismo Prehistórico',
    tagline: 'Frailejones centenarios, plantas carnívoras de los tepuyes y la flor de mayo',
    image: '/images/naturaleza/flora-orquidea-flor-de-mayo.jpg',
    alt: 'Hermosa flor de mayo Cattleya mossiae orquídea nacional de Venezuela',
    description:
      'Los tepuyes del Escudo Guayanés albergan islas de evolución prehistórica con especies botánicas que no existen en ningún otro lugar del planeta. En las cumbres andinas reinan los frailejones que capturan el agua de la niebla, mientras el araguaney dorado y la orquídea Flor de Mayo visten de orgullo los bosques.',
    facts: [
      { label: 'Flor Nacional', value: 'Orquídea (Cattleya)' },
      { label: 'Árbol Nacional', value: 'Araguaney Dorado' },
      { label: 'Planta de Agua', value: 'Frailejón de Páramo' },
    ],
    hasTour: true,
  },
  {
    id: 'parques-y-santuarios',
    title: 'Santuarios y Conservación: Parques Nacionales',
    eyebrow: 'Red Nacional de Parques de Venezuela',
    coords: '44 Parques Nacionales',
    tagline: 'Canaima, Henri Pittier, Los Roques, El Ávila y la custodia de la tierra',
    image: '/images/naturaleza/parques-henri-pittier.jpg',
    alt: 'Paisaje y frondosa selva nublada en el Parque Nacional Henri Pittier, primer parque nacional de Venezuela',
    description:
      'Venezuela protege más del 20% de su territorio en 44 Parques Nacionales y monumentos naturales. Desde el pionero Henri Pittier (1937) hasta los gigantescos Canaima y Parima Tapirapecó, la conservación es un compromiso sagrado para preservar las fuentes de agua, la memoria ancestral y el futuro.',
    facts: [
      { label: 'Primer Parque', value: 'Henri Pittier (1937)' },
      { label: 'Área Protegida', value: '+20% del Territorio' },
      { label: 'Patrimonio Mundial', value: 'P.N. Canaima (UNESCO)' },
    ],
    hasTour: true,
  },
  {
    id: 'tepuyes-y-guayana',
    title: 'Tepuyes y el Escudo Guayanés: Islas en el Tiempo',
    eyebrow: 'Roraima · Kukenán · Autana · Chimantá · Auyantepui',
    coords: 'Geología de 2.000 Millones de Años',
    tagline: 'Los titanes de cuarcita del Precámbrico, valles de cuarzo y el árbol sagrado de la vida',
    image: '/images/naturaleza/tepuy-roraima-pared.jpg',
    alt: 'Paredes verticales de roca milenaria del Monte Roraima elevándose sobre la Gran Sabana',
    description:
      'Las mesetas tabulares o tepuyes del Escudo Guayanés constituyen algunas de las formaciones geológicas más antiguas de la corteza terrestre. Aisladas durante milenios sobre mares de nubes, sus cumbres albergan ecosistemas prehistóricos donde conviven valles de cristales de cuarzo, lagunas pseudocársticas y leyendas cósmicas sagradas de los pueblos Pemón y Piaroa.',
    facts: [
      { label: 'Era Geológica', value: 'Precámbrico (2.000 Ma)' },
      { label: 'Tepuy Sagrado', value: 'Cerro Autana (Piaroa)' },
      { label: 'Cima Mítica', value: 'Monte Roraima (2.810 m)' },
    ],
    hasTour: true,
  },
  {
    id: 'rios-y-cuencas',
    title: 'Ríos y Cuencas: Del Orinoco al Caroní',
    eyebrow: 'Orinoco · Caroní · Casiquiare · Caura · Apure · Catatumbo',
    coords: 'Venas de la Patria y Red Fluvial',
    tagline: 'El Padre de los Ríos, aguas negras cristalinas, el delta infinito y la bifurcación del Casiquiare',
    image: '/images/naturaleza/rios-orinoco-padre.jpg',
    alt: 'Atardecer dorado sobre el majestuoso Río Orinoco y el Puente Angostura',
    description:
      'Venezuela está bendecida por una de las redes hidrológicas más ricas y portentosas del mundo. El colosal Río Orinoco vertebra el país hacia el Atlántico, mientras el Caroní genera su energía vital, el río Caura custodia selvas vírgenes, el Apure baña las sabanas y el prodigioso Brazo Casiquiare enlaza de forma natural las cuencas del Orinoco y del Amazonas.',
    facts: [
      { label: 'Padre Fluvial', value: 'Orinoco (3° Mundial)' },
      { label: 'Fenómeno Único', value: 'Brazo Casiquiare' },
      { label: 'Energía Limpia', value: 'Cuenca del Caroní' },
    ],
    hasTour: true,
  },
]

export function NaturalezaGrid() {
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
        {NATURE_CARDS.map((d) => {
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
                    alt={d.alt || `Naturaleza y fauna: ${d.title}`}
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

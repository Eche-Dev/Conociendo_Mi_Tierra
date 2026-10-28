'use client'

import { useState } from 'react'
import { Compass, Sparkles, ArrowUpRight } from 'lucide-react'
import { IMMERSIVE_TOURS, type ImmersiveTour } from '@/lib/data/immersive-tours'
import { ImmersiveTourViewer } from '@/components/tours/immersive-tour-viewer'

export interface CultureTradition {
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

export const CULTURE_TRADITIONS: CultureTradition[] = [
  {
    id: 'joropo',
    title: 'El Joropo Tradicional y Llanero',
    eyebrow: 'Los Llanos · Apure · Barinas · Portuguesa · Miranda',
    coords: 'Patrimonio Cultural de la Nación',
    tagline: 'Arpa, cuatro, maracas, zapateo recio y la copla que desafía al horizonte llanero',
    image: '/images/cultura/joropo-baile-recio.jpg',
    alt: 'Pareja bailando joropo llanero en traje típico con liquiliqui y falda floreada en Venezuela',
    description:
      'El joropo es la máxima expresión musical y coreográfica del mestizaje venezolano. Nacido en los hatos ganaderos de los Llanos y enriquecido en los valles centrales y costas, articula el arpa de 32 cuerdas, el cuatro acompañante y las maracas de capacho. Se baila con diálogo de pareja entre el sutil escobillao y el vigoroso zapateo, mientras los copleros improvisan versos y contrapunteos en honor a la tierra y la libertad.',
    facts: [
      { label: 'Instrumentos', value: 'Arpa, Cuatro & Maraca' },
      { label: 'Métrica Rítmica', value: '3/4 y 6/8 Sincopado' },
      { label: 'Patrimonio Vivo', value: 'Nacional & UNESCO' },
    ],
    hasTour: true,
  },
  {
    id: 'tambores-de-barlovento',
    title: 'Tambores de Barlovento y San Juan',
    eyebrow: 'Miranda · Barlovento · Curiepe · Costa Central',
    coords: 'Patrimonio Inmaterial UNESCO',
    tagline: 'El repique del mina, la curbata y la memoria cimarrona libre',
    image: '/images/cultura/barlovento-baile-tambor-curiepe.jpg',
    alt: 'Baile tradicional de tambor afrovenezolano en Curiepe, Barlovento, Miranda',
    description:
      'En la costa central y los valles de Miranda, los tambores afrovenezolanos reúnen comunidad, canto y danza. San Juan Bautista es una de sus celebraciones más vibrantes, con repiques ancestrales como el mina, la curbata y el culo e\' puya que cambian de cadencia según cada pueblo cimarrón.',
    facts: [
      { label: 'Tambor Mayor', value: 'Mina & Curbata' },
      { label: 'Fiesta Sagrada', value: 'San Juan (24 Jun)' },
      { label: 'Región Raíz', value: 'Curiepe & Barlovento' },
    ],
    hasTour: true,
  },
  {
    id: 'carnaval-y-ferias',
    title: 'Carnavales y Ferias Populares',
    eyebrow: 'Bolívar · Mérida · Falcón · Lara · Zulia',
    coords: 'Patrimonio Inmaterial UNESCO',
    tagline: 'De las madamas de El Callao al frío festivo de los Andes y los Zaragozas',
    image: '/images/cultura/carnaval-madamas-el-callao.jpg',
    alt: 'Las Madamas de El Callao desfilando con elegantes trajes en el Carnaval del Oro',
    description:
      'De El Callao (Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO con su calipso y madamas) a las ferias andinas de Mérida y San Sebastián en San Cristóbal, las fiestas populares transforman plazas y avenidas con comparsas, máscaras, música y promesas compartidas.',
    facts: [
      { label: 'UNESCO', value: 'Carnaval El Callao' },
      { label: 'Ritmo Insigne', value: 'Calipso Callaoense' },
      { label: 'Tradición Viva', value: 'Madamas & Zaragozas' },
    ],
    hasTour: true,
  },
  {
    id: 'artesania-tradicional',
    title: 'Artesanía Ancestral y Oficios Vivos',
    eyebrow: 'Zulia · Delta · Lara · Bolívar · Amazonas',
    coords: 'Patrimonio Cultural Vivo',
    tagline: 'Mochilas wayúu, cestería warao de moriche, telares de Tintorero y tallas sagradas',
    image: '/images/cultura/artesania-wayuu-tejedora-mochilas.jpg',
    alt: 'Tejedora indígena wayúu exhibiendo mochilas artesanales tradicionales en Zulia',
    description:
      'Chinchorros wayúu, cestería warao de fibra de moriche, cerámica de Quíbor, telares milenarios de Tintorero y tallas sagradas pemón y ye\'kwana cuentan historias de territorio y comunión con el medio ambiente. Cada pieza preserva técnicas heredadas intactas por generaciones.',
    facts: [
      { label: 'Tejido Ancestral', value: 'Wayúu & Tintorero' },
      { label: 'Fibra Sagrada', value: 'Palma de Moriche' },
      { label: 'Oficios Vivos', value: 'Talla, Barro y Cesto' },
    ],
    hasTour: true,
  },
  {
    id: 'tintorero-ruta-artesanal',
    title: 'Pueblo de Tintorero y Ruta de Oficios de Lara',
    eyebrow: 'Lara · Municipio Jiménez · Tintorero & Quíbor',
    coords: 'Capital Artesanal de Venezuela',
    tagline: 'La capital de los telares de madera, los tintes naturales y la alfarería milenaria',
    image: '/images/cultura/tintorero-vitrina-hamacas.jpg',
    alt: 'Vitrina de hamacas multicolores y tejidos artesanales en Tintorero, estado Lara',
    description:
      'En Tintorero casi el 100% de la población se dedica a la artesanía. En cada zaguán repican los telares de madera herencia de las dinastías Siolo y Torrealba, tejiendo cobijas de lana teñidas con añil y tintes vegetales. Junto a la alfarería de Quíbor y las tallas de Guadalupe, conforma la ruta artesanal más emblemática de Venezuela.',
    facts: [
      { label: 'Pueblo Telar', value: '+85% Artesanos' },
      { label: 'Herencia Viva', value: 'Tintes Vegetales' },
      { label: 'Feria Cumbre', value: 'Agosto Internacional' },
    ],
    hasTour: true,
  },
  {
    id: 'tamunangue-sones-de-negro',
    title: 'El Tamunangue y Sones de Negro',
    eyebrow: 'Lara · El Tocuyo · Curarigua · Sanare',
    coords: 'Patrimonio Cultural de la Nación',
    tagline: 'La batalla ritual de garrotes, los siete sones y la devoción a San Antonio de Padua',
    image: '/images/cultura/tamunangue-la-batalla-garrote.jpg',
    alt: 'Bailadores de Tamunangue ejecutando el combate ritual de La Batalla con garrotes en Lara',
    description:
      'Considerado una de las expresiones folclóricas y devocionales más complejas de América. Cada 13 de junio se bailan los siete sones rituales (La Batalla, La Bella, La Juruminga, El Yeyevilo, El Poco a Poco con sus calambres fingidos, La Perrendenga y El Seis Figuriao) al compás del cinco larense y el tambor tamunanguero.',
    facts: [
      { label: 'Rito Mayor', value: 'Batalla de Garrotes' },
      { label: 'Ciclo Ritual', value: '7 Sones Sagrados' },
      { label: 'Instrumento', value: 'El Cinco Larense' },
    ],
    hasTour: true,
  },
  {
    id: 'gaita-zuliana',
    title: 'La Gaita Zuliana y el Canto del Lago',
    eyebrow: 'Zulia · Maracaibo · El Saladillo · Santa Lucía',
    coords: 'Patrimonio Cultural de la Nación',
    tagline: 'El furro, la tambora, la charrasca y el alma indoblegable del Zulia',
    image: '/images/cultura/gaita-santa-lucia-esquina-popular.jpg',
    alt: 'Esquina tradicional del barrio Santa Lucía en Maracaibo con la torre azul de fondo',
    description:
      'La gaita de furro zuliana es el periódico sonoro, el canto de devoción a La Chinita y el himno de resistencia e identidad popular del occidente venezolano. Con el rugido grave del furro encerado, la tambora sincopada y la charrasca de bronce, las esquinas del Saladillo y Santa Lucía resuenan con la poesía de Ricardo Aguirre y los grandes juglares marabinos.',
    facts: [
      { label: 'Instrumento Rey', value: 'Furro Encerado' },
      { label: 'Barrios Cuna', value: 'Saladillo & Santa Lucía' },
      { label: 'Patrimonio', value: 'Bien Cultural Nacional' },
    ],
    hasTour: true,
  },
  {
    id: 'diversiones-orientales',
    title: 'Diversiones Orientales y Tradición Costera',
    eyebrow: 'Sucre · Nueva Esparta · Anzoátegui · Monagas',
    coords: 'Tradición Marinera del Caribe',
    tagline: 'El Carite, El Pájaro Guarandol, el galerón y el canto de los pescadores del mar Caribe',
    image: '/images/cultura/oriente-pescadores-chinchorro-margarita.jpg',
    alt: 'Pescadores margariteños halando comunitariamente la red de chinchorro en El Manglillo',
    description:
      'En las costas y bahías orientales el teatro popular, la danza y el mar se funden en «Las Diversiones»: comparsas callejeras con armazones de El Carite, El Pájaro Guarandol y El Pez Espada. Al son del bandolín oriental, el cuatro y las maracas, los cantadores improvisan décimas espinelas de galerón bajo la protección maternal de la Virgen del Valle.',
    facts: [
      { label: 'Teatro Popular', value: 'El Carite & Guarandol' },
      { label: 'Canto Mayor', value: 'Galerón en Décimas' },
      { label: 'Patrona Marina', value: 'Virgen del Valle' },
    ],
    hasTour: true,
  },
  {
    id: 'paradura-del-nino-andes',
    title: 'La Paradura del Niño y Tradiciones Andinas',
    eyebrow: 'Mérida · Táchira · Trujillo · Páramos Andinos',
    coords: 'Fe y Devoción de las Alturas',
    tagline: 'El robo del Niño Jesús, los violines de páramo y la devoción campesina de Los Andes',
    image: '/images/cultura/paradura-capilla-de-piedra-mucuchies.jpg',
    alt: 'Exterior de la famosa Capilla de Piedra construida por Juan Félix Sánchez en Mucuchíes',
    description:
      'Desde Año Nuevo hasta la Candelaria, los páramos andinos celebran la Paradura del Niño Jesús. Padrinos con pañuelos blancos de seda, velas encendidas y cánticos de romance a violín recorren las casas campesinas. Una devoción encarnada en maestros místicos como Juan Félix Sánchez y sus capillas de piedra erigidas a más de 3.000 metros de altitud.',
    facts: [
      { label: 'Rito Central', value: 'Paradura con Pañuelos' },
      { label: 'Música Andina', value: 'Violín & Romance Criollo' },
      { label: 'Monumento Vivo', value: 'Capillas de Piedra' },
    ],
    hasTour: true,
  },
]

export function CulturaGrid() {
  const [activeTour, setActiveTour] = useState<ImmersiveTour | null>(null)

  const handleOpenTour = (traditionId: string) => {
    const tour = IMMERSIVE_TOURS[traditionId]
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
        {CULTURE_TRADITIONS.map((d) => {
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
                    alt={d.alt || `Expresión cultural de ${d.title}`}
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

                  {/* Overlay interactivo para tradiciones con tour */}
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

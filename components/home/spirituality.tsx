'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Compass,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react'
import { IMMERSIVE_TOURS, type ImmersiveTour } from '@/lib/data/immersive-tours'
import { ImmersiveTourViewer } from '@/components/tours/immersive-tour-viewer'

const traditions = [
  {
    id: 'maria-lionza',
    title: 'María Lionza',
    eyebrow: 'Yaracuy · Montaña de Sorte',
    coords: '10°05′N · 68°58′O',
    tagline: 'Reina de las aguas, protectora de la montaña y madre de las Tres Potencias',
    image: '/images/espiritualidad/baile-en-candela.jpg',
    alt: 'Creyente en trance danzando sobre brasas ardientes en el Baile en Candela en la Montaña de Sorte, Venezuela',
    description:
      'En la selva sagrada de Yaracuy late la devoción popular más auténtica y viva de Venezuela. Aquí no hay templos de ladrillo: el santuario es la selva misma y sus ríos sagrados, donde los creyentes acuden a purificarse, consultar el oráculo del tabaco y rendir devoción a las Tres Potencias (María Lionza, Guaicaipuro y Negro Felipe). Cada medianoche del 12 de octubre, sus materias cruzan descalzas el fuego en el asombroso Baile en Candela.',
    facts: [
      { label: 'Santuario', value: 'M. de Sorte' },
      { label: 'Trinidad', value: '3 Potencias' },
      { label: 'Rito Mayor', value: '12 de Octubre' },
    ],
    hasTour: true,
  },
  {
    id: 'catolicismo-popular',
    title: 'Catolicismo Popular',
    eyebrow: 'Lara · Zulia · Caracas · Portuguesa',
    coords: 'Geografía de Fe Nacional',
    tagline: 'Procesiones multitudinarias, promesas y santos del pueblo',
    image: '/images/catolicismo/divina-pastora-procesion.jpg',
    alt: 'Multitud de millones de devotos en la procesión de la Divina Pastora en Barquisimeto, Venezuela',
    description:
      'La fe venezolana desborda los templos y toma las calles: la Divina Pastora en Barquisimeto con más de 3 a 4 millones de peregrinos, la Virgen de Coromoto en Guanare como patrona nacional, el Nazareno de San Pablo con sus túnicas moradas en Caracas, la Chinita gaitera en Maracaibo y la inmensa devoción al Beato Dr. José Gregorio Hernández. Promesas andantes de rodillas y exvotos que revelan el corazón creyente del país.',
    facts: [
      { label: 'Procesión Mayor', value: '+3 a 4M Fieles' },
      { label: 'Patrona Nacional', value: 'Coromoto' },
      { label: 'Médico Santo', value: 'José Gregorio' },
    ],
    hasTour: true,
  },
  {
    id: 'cosmovisiones-indigenas',
    title: 'Cosmovisiones Indígenas',
    eyebrow: 'Amazonas · Bolívar · Zulia · Delta',
    coords: 'Pueblos Originarios',
    tagline: 'El territorio sagrado, la selva viva y los espíritus tutelares',
    image: '/images/roraima.png',
    alt: 'Paisaje sagrado ancestral tepuyano en la Gran Sabana, Venezuela',
    description:
      'Para los pueblos pemón, piaroa, warao, wayúu y yanomami la tierra no es una mercancía que explotar, sino un pariente vivo emparentado con el ser humano. Los tepuyes son casas de los dioses Mawari, los ríos arterias sagradas, el Autana el Árbol de la Vida y la Yonna la danza de equilibrio del desierto. Una memoria viva de más de 40 etnias que guardan el alma milenaria de Venezuela.',
    facts: [
      { label: 'Pilar Sagrado', value: 'Mawari & Tepuy' },
      { label: 'Árbol de Vida', value: 'Autana & Wadaka' },
      { label: 'Pueblos Vivos', value: '+40 Etnias' },
    ],
    hasTour: true,
  },
  {
    id: 'afrovenezolana',
    title: 'Espiritualidad Afrovenezolana',
    eyebrow: 'Miranda · Vargas · Aragua · Yaracuy',
    coords: 'Costa y Valles Centrales',
    tagline: 'El repique del tambor, los Diablos Danzantes y la memoria cimarrona',
    image: '/images/choroni.png',
    alt: 'Costas de Aragua donde se celebran las fiestas y tambores afrovenezolanos',
    description:
      'Nacida de la resistencia de los esclavizados que llegaron a las plantaciones de cacao y caña. Se manifiesta con vigor en los Diablos Danzantes de Yare (Patrimonio Cultural Inmaterial de la Humanidad), en las fiestas de San Juan Bautista al son del cumaco y en la adoración a San Benito de Palermo en las riberas del Lago de Maracaibo.',
    facts: [
      { label: 'Patrimonio UNESCO', value: 'Diablos de Yare' },
      { label: 'Ritmo Sagrado', value: 'Tambor Cumaco' },
      { label: 'Santos Clave', value: 'San Juan y Benito' },
    ],
    hasTour: false,
  },
]

export function Spirituality() {
  const [activeTour, setActiveTour] = useState<ImmersiveTour | null>(null)

  const handleOpenTour = (destinationId: string) => {
    const tour = IMMERSIVE_TOURS[destinationId]
    if (tour) {
      setActiveTour(tour)
    }
  }

  const handleCloseTour = () => {
    setActiveTour(null)
  }

  return (
    <>
      <section id="espiritualidad" className="relative overflow-hidden bg-background text-foreground">
        {/* HERO HEADER */}
        <div className="relative min-h-svh">
          <Image
            src="/images/espiritualidad/cerro-maria-lionza.jpg"
            alt="Monumento Natural Cerro María Lionza envuelto en neblina mística en el estado Yaracuy"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
          <div className="relative z-10 flex min-h-svh flex-col justify-end gap-8 px-6 pb-16 pt-32 md:px-12 md:pb-24">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Capítulo especial · Fe y Raíces</p>
            <h2 className="max-w-5xl font-display text-[clamp(3.4rem,11vw,10rem)] uppercase leading-[0.9]">
              El lado espiritual
            </h2>
            <p className="max-w-3xl text-xl leading-relaxed text-foreground/85 md:text-2xl font-serif">
              Un mapa de devociones vivas, mitos originarios y sabiduría popular que palpitan en las montañas, ríos y
              ciudades de Venezuela.
            </p>
          </div>
        </div>

        {/* CONTENEDOR CON LA CUADRÍCULA EXACTA DE TURISMO */}
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              Tradiciones y Creencias
            </span>
            <h3 className="mt-2 font-display text-3xl uppercase tracking-tight text-foreground md:text-5xl">
              Atlas de la fe venezolana
            </h3>
          </div>

          {/* GRID IDENTICO A TURISMO: grid gap-8 md:grid-cols-2 */}
          <div className="grid gap-8 md:grid-cols-2">
            {traditions.map((d) => {
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
                        alt={d.alt || `Tradición espiritual de ${d.title}`}
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

                      {/* Datos rápidos en 3 columnas */}
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
        </div>

        {/* PIE DE PÁGINA: MIRAR CON RESPETO */}
        <div className="mx-auto max-w-4xl px-6 pb-28 text-center md:px-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Mirar con Respeto</span>
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg font-serif">
            Las creencias no son una atracción ni un espectáculo: son experiencias íntimas de personas y
            comunidades reales. Este atlas documenta su dimensión histórica y cultural sin convertir rituales privados
            en espectáculo ni mercantilizar sus símbolos.
          </p>
        </div>
      </section>

      {/* VISOR MODAL INMERSIVO A PANTALLA COMPLETA */}
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

'use client'

import { useState } from 'react'
import type { Destination } from '@/lib/types'
import { IMMERSIVE_TOURS, type ImmersiveTour } from '@/lib/data/immersive-tours'
import { ImmersiveTourViewer } from '@/components/tours/immersive-tour-viewer'
import { Compass, Sparkles, ArrowUpRight } from 'lucide-react'

interface TurismoGridProps {
  destinations: Destination[]
}

export function TurismoGrid({ destinations }: TurismoGridProps) {
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
      <div className="grid gap-8 md:grid-cols-2">
        {destinations.map((d) => {
          const hasTour = Boolean(IMMERSIVE_TOURS[d.id])

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
                {/* Imagen de la tarjeta */}
                <div
                  className={`relative aspect-[16/9] w-full overflow-hidden bg-background/50 ${
                    hasTour ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => hasTour && handleOpenTour(d.id)}
                >
                  <img
                    src={d.image}
                    alt={d.alt || `Paisaje relacionado con ${d.name}`}
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

                  {/* Overlay interactivo para destinos con tour */}
                  {hasTour && (
                    <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-background shadow-xl">
                        <Compass className="h-4 w-4" />
                        Gira la rueda para entrar
                      </span>
                    </div>
                  )}
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-primary/80">
                      {d.region}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{d.coords}</span>
                  </div>

                  <h2 className="mt-2 font-display text-3xl md:text-4xl uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {d.name}
                  </h2>

                  <p className="mt-1 font-serif text-sm italic text-primary/90">
                    «{d.tagline}»
                  </p>

                  <p className="mt-4 leading-relaxed text-foreground/75 text-sm md:text-base font-serif">
                    {d.description}
                  </p>

                  {/* Datos rápidos */}
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

              {/* Pie de tarjeta con botón de acción */}
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

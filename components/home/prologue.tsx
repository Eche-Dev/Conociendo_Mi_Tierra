import type { Destination } from '@/lib/types'

export function Prologue({ destinations }: { destinations: Destination[] }) {
  return (
    <section
      id="prologo"
      aria-labelledby="prologo-title"
      className="relative flex min-h-svh items-start px-6 py-32 md:px-12"
    >
      <div className="mx-auto grid w-full max-w-6xl items-start gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Columna editorial narrativa que acompaña el recorrido completo */}
        <div className="flex flex-col gap-12">
          {/* Encabezado del Prólogo */}
          <div className="flex flex-col gap-6">
            <p className="reveal text-sm uppercase tracking-[0.3em] text-primary">
              Prólogo · Carta de Navegación
            </p>
            <h2
              id="prologo-title"
              className="reveal text-balance font-display text-5xl uppercase leading-[0.9] md:text-7xl"
            >
              Un país que cabe en un mapa y no en una vida
            </h2>
            <p className="reveal text-pretty text-lg leading-relaxed text-muted-foreground">
              En agosto de 1498, deslumbrado por la inmensidad de las bocas del Orinoco y la pureza
              de sus aguas dulces sobre el océano, Cristóbal Colón escribió en su diario náutico
              que había tocado las puertas de la «Tierra de Gracia». Más de cinco siglos después, esa
              fascinación sigue intacta: pocos rincones en el planeta concentran en un solo territorio
              el arrecife de coral más transparente, el desierto que camina, los páramos nevados, el
              fulgor constante de un faro cósmico y mesetas de roca que vieron surgir la vida hace dos
              mil millones de años.
            </p>
            <p className="reveal text-pretty text-lg leading-relaxed text-muted-foreground">
              Esta travesía es un viaje de norte a sur y de este a oeste: empieza en las aguas
              turquesas del Caribe insular y desciende por ríos caudalosos, selvas milenarias y
              cumbres heladas hasta tocar el corazón primigenio de la Tierra.
            </p>
          </div>

          {/* Desglose de las 5 Grandes Regiones */}
          <div className="flex flex-col gap-8 border-t border-border pt-10">
            <p className="reveal font-display text-xs uppercase tracking-[0.25em] text-primary">
              Las Cinco Geografías del Territorio
            </p>

            <div className="reveal flex flex-col gap-3" style={{ '--delay': '100ms' } as React.CSSProperties}>
              <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                I. El Mar Caribe y los Cayos de Coral
              </h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                Desde las arenas de concha blanca de Los Roques y las bahías históricas de Margarita
                hasta los manglares transparentes de Morrocoy, Mochima y la salvaje península de Paria.
                Un litoral donde la salitre convive con el repique de los tambores afrovenezolanos y
                el aroma profundo del cacao de exportación.
              </p>
            </div>

            <div className="reveal flex flex-col gap-3" style={{ '--delay': '150ms' } as React.CSSProperties}>
              <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                II. La Cordillera Andina y los Páramos
              </h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                Cumbres que rozan los cinco mil metros en la Sierra Nevada de Mérida. Valles agrícolas
                tallados por los timoto-cuicas, frailejones centenarios que atrapan la humedad de la
                niebla y pueblos de piedra donde el tiempo parece haberse detenido entre el silencio
                y el café recién colado.
              </p>
            </div>

            <div className="reveal flex flex-col gap-3" style={{ '--delay': '200ms' } as React.CSSProperties}>
              <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                III. La Llanura Infinita y los Grandes Caudales
              </h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                El horizonte sin bordes de Apure y Guárico, las aguas cristalinas del Cinaruco y el
                monumental laberinto del Delta del Orinoco. Una tierra indómita marcada por el ciclo
                de lluvias e inundaciones, el canto de ordeño y arreo, los chigüires, las toninas
                rosadas y bandadas de corocoras rojas al atardecer.
              </p>
            </div>

            <div className="reveal flex flex-col gap-3" style={{ '--delay': '250ms' } as React.CSSProperties}>
              <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                IV. El Macizo Guayanés y los Tepuyes Sagrados
              </h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                El escudo geológico más arcaico del planeta custodia fortalezas de roca como el Monte
                Roraima y el Auyantepui. Desde sus cimas cortadas a pico se desprende el Salto Ángel
                hacia la selva virgen en una caída de casi un kilómetro de agua y niebla perpetua.
              </p>
            </div>

            <div className="reveal flex flex-col gap-3" style={{ '--delay': '300ms' } as React.CSSProperties}>
              <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                V. El Occidente Telúrico y los Enigmas Naturales
              </h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                Bajo la noche del Lago de Maracaibo destella sin descanso el Relámpago del Catatumbo,
                mientras los Médanos de Coro mudan de forma al impulso de los alisios, las cavernas
                del Guácharo guardan ríos subterráneos y los valles de Aragua preservan la herencia
                alpina de la Colonia Tovar.
              </p>
            </div>
          </div>

          {/* Ficha Cartográfica de la Expedición */}
          <div
            className="reveal rounded-md border border-border/80 bg-card/60 p-6 backdrop-blur-sm"
            style={{ '--delay': '350ms' } as React.CSSProperties}
          >
            <p className="font-display text-xs uppercase tracking-[0.25em] text-primary">
              Bitácora de la Expedición
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <p className="font-display text-3xl text-foreground">30</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Destinos Esenciales
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-foreground">4.978 m</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  De Cumbres a Nivel del Mar
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-foreground">2.000 Ma</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Antigüedad Geológica
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-foreground">43</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Parques Nacionales
                </p>
              </div>
            </div>
          </div>

          {/* Cita histórica de cierre */}
          <blockquote
            className="reveal border-l-2 border-primary pl-6 italic text-foreground/90"
            style={{ '--delay': '400ms' } as React.CSSProperties}
          >
            <p className="text-base leading-relaxed">
              «En ninguna parte la naturaleza se muestra tan majestuosa, fecunda y grandiosa como en
              las montañas, selvas y llanuras de este territorio prodigioso.»
            </p>
            <footer className="mt-2 text-xs uppercase not-italic tracking-[0.2em] text-muted-foreground">
              Alexander von Humboldt, 1799
            </footer>
          </blockquote>

          {/* Invitación de navegación */}
          <p
            className="reveal text-sm text-muted-foreground"
            style={{ '--delay': '450ms' } as React.CSSProperties}
          >
            Explora el índice a la derecha y pulsa cualquier hito para trasladarte de inmediato a su
            historia, o continúa deslizando para descubrir los treinta santuarios de nuestra tierra.
          </p>
        </div>

        {/* Columna con los 30 destinos turísticos */}
        <ol className="flex flex-col">
          {destinations.map((d, i) => (
            <li
              key={d.id}
              className="reveal border-b border-border first:border-t"
              style={{ '--delay': `${Math.min(i * 30, 600)}ms` } as React.CSSProperties}
            >
              <a
                href={`#${d.id}`}
                className="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-primary focus-visible:text-primary"
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-display text-sm tracking-widest text-muted-foreground group-hover:text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-2xl uppercase md:text-3xl">{d.name}</span>
                </span>
                <span className="hidden text-sm italic text-muted-foreground sm:block">
                  {d.region.split(' · ')[0]}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import type { Destination } from '@/lib/types'

export function Prologue({ destinations }: { destinations: Destination[] }) {
  return (
    <section
      id="prologo"
      aria-labelledby="prologo-title"
      className="relative flex min-h-svh items-center px-6 py-32 md:px-12"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col gap-8">
          <p className="reveal text-sm uppercase tracking-[0.3em] text-primary">Prólogo</p>
          <h2
            id="prologo-title"
            className="reveal text-balance font-display text-5xl uppercase leading-none md:text-7xl"
          >
            Un país que cabe en un mapa y no en una vida
          </h2>
          <p className="reveal text-pretty text-lg leading-relaxed text-muted-foreground">
            En 1498 Cristóbal Colón llegó a estas costas y escribió que había encontrado la «Tierra
            de Gracia». Más de cinco siglos después, Venezuela sigue reuniendo en un solo
            territorio playas de coral, desiertos, glaciares extintos, tormentas eternas, ríos
            inmensos y montañas de dos mil millones de años.
          </p>
          <p className="reveal text-pretty text-lg leading-relaxed text-muted-foreground">
            Este viaje va del norte al sur: empieza en el mar Caribe y termina en lo alto del Mundo
            Perdido.
          </p>
        </div>

        <ol className="flex flex-col self-end">
          {destinations.map((d, i) => (
            <li
              key={d.id}
              className="reveal border-b border-border first:border-t"
              style={{ '--delay': `${i * 60}ms` } as React.CSSProperties}
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
                <span className="hidden text-sm italic text-muted-foreground sm:block">{d.region.split(' · ')[0]}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

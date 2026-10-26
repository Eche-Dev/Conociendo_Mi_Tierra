import Image from 'next/image'
import type { Destination } from '@/lib/types'

type SceneProps = {
  destination: Destination
  index: number
  total: number
}

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties

export function Scene({ destination: d, index, total }: SceneProps) {
  const chapter = String(index + 1).padStart(2, '0')

  return (
    <section id={d.id} data-scene aria-labelledby={`${d.id}-title`} className="relative">
      <div className="sticky top-0 h-svh overflow-hidden">
        <Image src={d.image} alt={d.alt} fill sizes="100vw" className="scene-image object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent [background-size:100%_18%] bg-no-repeat" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="scene-tint absolute inset-0 bg-background" />
      </div>

      <div className="relative z-10 -mt-[100svh]">
        <div className="flex min-h-svh flex-col justify-end gap-6 px-6 pb-16 md:px-12 md:pb-20">
          <p className="reveal flex flex-wrap items-center gap-x-4 gap-y-1 text-sm uppercase tracking-[0.3em] text-foreground/90">
            <span className="font-display tracking-widest text-primary">
              Capítulo {chapter} / {total}
            </span>
            <span>{d.region}</span>
          </p>
          <h2
            id={`${d.id}-title`}
            className="reveal text-balance pt-[0.12em] font-display text-[clamp(3.25rem,12vw,11rem)] uppercase leading-[0.92] text-foreground"
            style={delay(120)}
          >
            {d.name}
          </h2>
          <div
            className="reveal flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between"
            style={delay(240)}
          >
            <p className="text-2xl italic text-foreground md:text-3xl">{d.tagline}</p>
            <p className="font-display text-sm tracking-[0.25em] text-foreground/80">{d.coords}</p>
          </div>
        </div>

        <div className="flex min-h-svh items-center px-6 py-24 md:px-12">
          <article className="reveal flex max-w-xl flex-col gap-8 rounded-sm border border-border bg-background/75 p-8 backdrop-blur-md md:p-12">
            <h3 className="text-sm uppercase tracking-[0.3em] text-primary">El paisaje</h3>
            <p className="text-pretty text-lg leading-relaxed text-foreground md:text-xl md:leading-relaxed">
              {d.description}
            </p>
            <dl className="grid grid-cols-3 gap-4 border-t border-border pt-6">
              {d.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="text-sm leading-snug text-muted-foreground">{fact.label}</dt>
                  <dd className="font-display text-xl tracking-wide text-foreground md:text-2xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </div>

        <div className="flex min-h-svh items-center justify-end px-6 py-24 md:px-12">
          <article className="reveal flex max-w-xl flex-col gap-6 rounded-sm border border-border bg-background/75 p-8 backdrop-blur-md md:p-12">
            <h3 className="text-sm uppercase tracking-[0.3em] text-primary">La historia</h3>
            {d.history.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'text-pretty text-lg leading-relaxed text-foreground first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:text-primary md:text-xl md:leading-relaxed'
                    : 'text-pretty text-lg leading-relaxed text-foreground/85'
                }
              >
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </div>
    </section>
  )
}

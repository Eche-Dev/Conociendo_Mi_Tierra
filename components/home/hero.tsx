import Image from 'next/image'

export function Hero() {
  return (
    <section
      id="inicio"
      data-scene
      className="relative flex h-svh items-end overflow-hidden"
      aria-labelledby="hero-title"
    >
      <Image
        src="/images/hero.png"
        alt="Tepuyes de la Gran Sabana emergiendo entre la niebla al amanecer"
        fill
        priority
        sizes="100vw"
        className="hero-image object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />

      <div className="hero-title relative z-10 flex w-full flex-col gap-6 px-6 pb-20 md:px-12 md:pb-24">
        <p className="reveal text-base italic text-foreground/90 md:text-lg">
          Un viaje por la Tierra de Gracia
        </p>
        <h1
          id="hero-title"
          className="reveal font-display text-[clamp(4.5rem,19vw,18rem)] uppercase leading-[0.8] text-foreground"
          style={{ '--delay': '150ms' } as React.CSSProperties}
        >
          Venezuela
        </h1>
        <div
          className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"
          style={{ '--delay': '300ms' } as React.CSSProperties}
        >
          <p className="max-w-md text-pretty text-lg leading-relaxed text-foreground/90">
            De las aguas cristalinas del Caribe y las cumbres andinas a los tepuyes sagrados
            del origen del mundo. Treinta destinos vivos, sus memorias ancestrales y el alma
            noble de nuestra tierra.
          </p>
          <div className="flex items-center gap-4 text-sm uppercase tracking-widest text-foreground/80">
            <span className="relative block h-12 w-px overflow-hidden bg-foreground/20" aria-hidden="true">
              <span className="scroll-cue absolute inset-x-0 top-0 block h-1/2 bg-primary" />
            </span>
            Desliza para comenzar
          </div>
        </div>
      </div>
    </section>
  )
}

import { ArrowUp } from 'lucide-react'

export function Epilogue() {
  return (
    <section
      id="epilogo"
      aria-labelledby="epilogo-title"
      className="relative flex min-h-svh flex-col justify-between px-6 pb-10 pt-40 md:px-12"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <p className="reveal text-sm uppercase tracking-[0.3em] text-primary">Epílogo</p>
        <h2
          id="epilogo-title"
          className="reveal text-balance font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.85]"
        >
          Venezuela te espera
        </h2>
        <blockquote className="reveal flex max-w-2xl flex-col gap-4">
          <p className="text-pretty text-xl italic leading-relaxed text-foreground/90 md:text-2xl">
            «Grandes indicios son estos del Paraíso Terrenal.»
          </p>
          <footer className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Cristóbal Colón, 1498
          </footer>
        </blockquote>
        <a
          href="#inicio"
          className="reveal mt-6 inline-flex items-center gap-3 rounded-sm border border-primary px-6 py-3 text-sm uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
          Volver al inicio
        </a>
      </div>

      <footer className="mt-24 flex flex-col justify-between gap-2 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
        <p>Un recorrido por veintinueve paisajes de Venezuela, del Caribe a la Gran Sabana.</p>
        <p className="italic">Imágenes ilustrativas.</p>
      </footer>
    </section>
  )
}

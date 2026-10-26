const regions = [
  [
    'Costa Caribeña',
    'Pescados, mariscos, cazón, coco y empanadas. En Margarita, Sucre, Mochima y Paria, el mar llega a la mesa con ají dulce, limón y plátano.',
  ],
  [
    'Andes',
    'La cocina de montaña abraza la pizca andina, los panes artesanales, la trucha, los quesos, las arepas de trigo y el calentao.',
  ],
  [
    'Llanos',
    'Carne en vara, pisillo de chigüire, cachapas, queso criollo y dulces de leche acompañan la música y los fogones de los hatos.',
  ],
  [
    'Oriente y Guayana',
    'El pelao guayanés, el casabe, el mañoco, el pescado de río, el moriche y el cacao cuentan historias indígenas y ribereñas.',
  ],
  [
    'Centro y Occidente',
    'Coro, Lara y Aragua reúnen chivo, queso de cabra, cocuy, vinos, cacao, salsas de ají y tradiciones afrovenezolanas.',
  ],
]

export function RegionTour() {
  return (
    <section className="mt-20 border-t border-border pt-12">
      <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-primary">Un recorrido región por región</h3>
      <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {regions.map(([name, description]) => (
          <article key={name}>
            <h4 className="text-2xl text-foreground">{name}</h4>
            <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

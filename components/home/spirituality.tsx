'use client'

import Image from 'next/image'

const traditions = [
  {
    title: 'Cosmovisiones indígenas',
    eyebrow: 'Raíces ancestrales',
    text: 'Las espiritualidades pemón, warao, wayúu, yanomami y piaroa entienden el territorio como un ser vivo. Tepuyes, ríos, selvas y animales forman parte de una red de parentesco, memoria y cuidado.',
  },
  {
    title: 'María Lionza',
    eyebrow: 'Yaracuy · Montaña de Sorte',
    text: 'El culto a María Lionza reúne símbolos indígenas, africanos y católicos. Sorte y Quibayo son espacios de peregrinación, promesas y ceremonias, especialmente durante el Baile en Candela. Se presenta aquí como patrimonio vivo y tradición popular.',
  },
  {
    title: 'Santería y religiones afrovenezolanas',
    eyebrow: 'Memoria de la diáspora',
    text: 'En distintas comunidades venezolanas sobreviven prácticas de raíz africana mezcladas con elementos del catolicismo popular. La música, los tambores, las ofrendas y la devoción a santos expresan identidad, comunidad y memoria familiar.',
  },
  {
    title: 'Catolicismo popular',
    eyebrow: 'Fiestas y peregrinaciones',
    text: 'La Virgen de Coromoto, la Divina Pastora, José Gregorio Hernández y el Nazareno de San Pablo forman parte de una geografía de fe marcada por procesiones, promesas, altares domésticos y celebraciones que reúnen a millones de personas.',
  },
  {
    title: 'Iglesias evangélicas',
    eyebrow: 'Comunidades contemporáneas',
    text: 'Las iglesias evangélicas tienen una presencia activa en barrios y ciudades de todo el país. Sus cultos, coros, redes de ayuda y espacios comunitarios forman parte del paisaje espiritual venezolano actual. Comparten la centralidad de la Biblia, pero no constituyen una sola iglesia: cada denominación tiene su historia y forma de culto.',
  },
  {
    title: 'Pentecostalismo',
    eyebrow: 'Fe carismática y comunitaria',
    text: 'Las iglesias pentecostales, parte del amplio mundo evangélico, crecieron con fuerza durante el siglo XX. Sus reuniones suelen destacar la oración comunitaria, la música, el testimonio y la experiencia de los dones del Espíritu Santo. Cada congregación organiza su vida y liderazgo de manera propia.',
  },
  {
    title: 'La Iglesia de Jesucristo de los Santos de los Últimos Días',
    eyebrow: 'Tradición restauracionista · Mormonismo',
    text: 'Llegó a Venezuela en el siglo XX y se reconoce por su énfasis en Jesucristo, el Libro de Mormón, la familia, la obra misional y una organización comunitaria internacional. Su teología, escrituras y prácticas familiares son distintas de las del catolicismo y de las iglesias evangélicas.',
  },
  {
    title: 'Adventistas del Séptimo Día',
    eyebrow: 'Protestantismo · Salud y esperanza',
    text: 'La Iglesia Adventista tiene presencia educativa, médica y comunitaria en Venezuela. Además de estudiar la Biblia y esperar el regreso de Cristo, sus comunidades suelen promover el descanso sabático del séptimo día, hábitos saludables y programas de servicio.',
  },
  {
    title: 'Testigos de Jehová',
    eyebrow: 'Cristianismo restauracionista',
    text: 'Sus congregaciones venezolanas se reúnen en Salones del Reino y son conocidas por la predicación, el estudio bíblico y una estructura internacional de congregaciones. Mantienen convicciones propias sobre la neutralidad política, las celebraciones y la sangre, diferentes de otras iglesias cristianas.',
  },
  {
    title: 'Comunidades judías y otras religiones',
    eyebrow: 'Pluralidad espiritual',
    text: 'Venezuela también alberga comunidades judías, musulmanas, budistas, bahá’ís y otras expresiones religiosas. Sus historias, celebraciones, espacios de oración y redes familiares enriquecen la diversidad del país sin quedar reducidas a una sola tradición.',
  },
]

export function Spirituality() {
  return (
    <section id="espiritualidad" className="relative overflow-hidden bg-background text-foreground">
      <div className="relative min-h-svh">
        <Image
          src="/images/sorte.png"
          alt="Velas y vegetación en un espacio ceremonial de la Montaña de Sorte"
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/55 to-background" />
        <div className="relative z-10 flex min-h-svh flex-col justify-end gap-8 px-6 pb-16 pt-32 md:px-12 md:pb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Capítulo especial · Cultura viva</p>
          <h2 className="max-w-5xl font-display text-[clamp(3.4rem,11vw,10rem)] uppercase leading-[0.9]">El lado espiritual</h2>
          <p className="max-w-2xl text-xl leading-relaxed text-foreground/85 md:text-2xl">
            Un mapa de creencias, símbolos y comunidades que acompañan a Venezuela desde sus pueblos originarios hasta sus ciudades contemporáneas.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-5 px-6 py-24 md:grid-cols-2 md:px-12 md:py-32">
        {traditions.map((tradition, index) => (
          <article key={tradition.title} className="flex min-h-72 flex-col justify-between border border-border bg-card/70 p-7 backdrop-blur-md md:p-10">
            <div className="flex items-start justify-between gap-6">
              <p className="text-sm uppercase tracking-[0.25em] text-primary">{tradition.eyebrow}</p>
              <span className="font-display text-2xl text-muted-foreground">0{index + 1}</span>
            </div>
            <div className="mt-12">
              <h3 className="font-display text-3xl uppercase leading-none md:text-4xl">{tradition.title}</h3>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/80">{tradition.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-32 text-center md:px-12">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Mirar con respeto</p>
        <p className="mt-6 text-xl leading-relaxed text-foreground/75 md:text-2xl">
          Las creencias no son una atracción ni un espectáculo: son experiencias íntimas de comunidades reales. Este capítulo documenta su presencia cultural sin convertir rituales privados en instrucciones ni apropiarse de sus símbolos.
        </p>
      </div>
    </section>
  )
}

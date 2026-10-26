import Image from 'next/image'

const classics = [
  ['Pabellón criollo', 'Arroz blanco, caraotas negras, carne mechada y tajadas de plátano: el plato nacional por excelencia.', '/images/pabellon.png'],
  ['Arepas', 'El pan cotidiano de maíz, con rellenos como reina pepiada, pelúa, catira, sifrina y dominó.', '/images/arepas.png'],
  ['Hallaca', 'Masa de maíz con guiso de res, cerdo y pollo, aceitunas, alcaparras y pasas, envuelta en hoja de plátano.', '/images/hallaca.png'],
  ['Cachapa y queso de mano', 'Maíz tierno convertido en una torta dulce, doblada con queso fresco hilado y mantequilla.', '/images/cachapa.png'],
  ['Tequeños y empanadas', 'Bocados de fiesta: queso fundido envuelto en masa de trigo, o masa de maíz frita con cazón, carne, pollo o queso.'],
  ['Asado negro y hervido', 'Dos clásicos de la mesa familiar: res en salsa de papelón y sopas profundas con tubérculos, gallina, pescado o mondongo.'],
]

const sweets = [
  ['Quesillo', 'Flan venezolano de leche condensada, huevos y caramelo.'],
  ['Bienmesabe', 'Bizcocho humedecido en licor, crema de coco y merengue.'],
  ['Dulce de lechosa y majarete', 'Papaya verde en almíbar de papelón, o coco, maíz y canela en textura cremosa.'],
  ['Marquesa y golfeados', 'Capas frías de chocolate, o panes enrollados con papelón, queso y anís.'],
]

const regions = [
  ['Costa Caribeña', 'Pescados, mariscos, cazón, coco y empanadas. En Margarita, Sucre, Mochima y Paria, el mar llega a la mesa con ají dulce, limón y plátano.'],
  ['Andes', 'La cocina de montaña abraza la pizca andina, los panes artesanales, la trucha, los quesos, las arepas de trigo y el calentao.'],
  ['Llanos', 'Carne en vara, pisillo de chigüire, cachapas, queso criollo y dulces de leche acompañan la música y los fogones de los hatos.'],
  ['Oriente y Guayana', 'El pelao guayanés, el casabe, el mañoco, el pescado de río, el moriche y el cacao cuentan historias indígenas y ribereñas.'],
  ['Centro y Occidente', 'Coro, Lara y Aragua reúnen chivo, queso de cabra, cocuy, vinos, cacao, salsas de ají y tradiciones afrovenezolanas.'],
]

export function Gastronomy() {
  return (
    <section id="gastronomia" aria-labelledby="gastronomia-title" className="relative overflow-hidden border-t border-border bg-background px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 max-w-4xl">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-primary">Capítulo final · La mesa</p>
          <h2 id="gastronomia-title" className="font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.88] text-foreground">Venezuela se saborea</h2>
          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">Una cocina mestiza donde el maíz, el plátano, el queso blanco, el coco y el papelón unen territorios, memorias y celebraciones.</p>
        </div>

        <div className="grid gap-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-primary">Los clásicos nacionales</h3>
            <div className="divide-y divide-border border-y border-border">
              {classics.map(([name, description, image], index) => (
                <article key={name} className="grid gap-5 py-7 md:grid-cols-[4rem_11rem_1fr] md:items-center">
                  <span className="font-display text-xl text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                  {image ? <Image src={image} alt={`Fotografía de ${name}`} width={176} height={112} className="aspect-[16/10] w-full object-cover" /> : <div className="hidden md:block" />}
                  <div><h4 className="text-2xl text-foreground">{name}</h4><p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">{description}</p></div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-16">
            <div>
              <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-primary">Dulces y postres</h3>
              <div className="space-y-7">
                <Image src="/images/postres.png" alt="Selección de postres venezolanos" width={720} height={420} className="mb-8 aspect-[16/9] w-full object-cover" />
                {sweets.map(([name, description]) => <article key={name}><h4 className="text-xl text-foreground">{name}</h4><p className="mt-1 leading-relaxed text-muted-foreground">{description}</p></article>)}
              </div>
            </div>
            <div className="border-t border-border pt-10">
              <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-primary">Bebidas</h3>
              <Image src="/images/bebidas.png" alt="Bebidas tradicionales venezolanas" width={720} height={420} className="mb-8 aspect-[16/9] w-full object-cover" />
              <p className="leading-relaxed text-muted-foreground">Papelón con limón, chicha de arroz, cocada, guarapo de caña, chicha andina y ponche crema acompañan la vida cotidiana y las fiestas.</p>
            </div>
          </div>
        </div>

        <div className="mt-32 border-t border-border pt-16">
          <h3 className="mb-10 text-sm uppercase tracking-[0.3em] text-primary">Un recorrido región por región</h3>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{regions.map(([name, description]) => <article key={name}><h4 className="text-2xl text-foreground">{name}</h4><p className="mt-3 leading-relaxed text-muted-foreground">{description}</p></article>)}</div>
        </div>
      </div>
    </section>
  )
}

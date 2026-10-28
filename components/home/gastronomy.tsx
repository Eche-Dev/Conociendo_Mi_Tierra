import Image from 'next/image'

const classics = [
  [
    'Pabellón criollo',
    'Arroz blanco suelto, caraotas negras, carne mechada jugosa y tajadas de plátano maduro frito: el plato nacional por excelencia.',
    '/images/pabellon.png',
  ],
  [
    'Arepas',
    'El pan cotidiano de maíz asado al budare, con rellenos icónicos como reina pepiada, carne mechada, pelúa, catira, sifrina y dominó.',
    '/images/arepas.png',
  ],
  [
    'Hallaca',
    'Masa de maíz sazonada con manteca de onoto, guiso denso de tres carnes con vino y papelón, aceitunas, alcaparras y pasas, envuelta en hoja de plátano.',
    '/images/hallaca.png',
  ],
  [
    'Tequeños artesanales',
    'Bocado insignia de fiesta: bastones de queso blanco firme y salado envueltos en masa fina de trigo, fritos hasta dorar y fundir por dentro.',
    '/images/gastronomia/tequenos.jpg',
  ],
  [
    'Cachapa con queso de mano + queso llanero + cochino',
    'Maíz tierno (jojoto) recién molido al budare, servida como manda la tradición: con queso de mano hilado, queso llanero rallado, cochino frito crujiente de acompañamiento y la mantequilla criolla derretida que no puede faltar.',
    '/images/gastronomia/cachapa-con-cochino.jpg',
  ],
  [
    'Empanadas criollas',
    'Masa delgada y crujiente de maíz con toque dulzón, frita en paila honda con relleno de cazón guisado con ají dulce, carne mechada o queso.',
    '/images/gastronomia/empanadas-de-carne-mechada.jpg',
  ],
  [
    'Asado negro caraqueño',
    'Muchacho redondo sellado en caramelo de papelón hasta quedar oscuro, estofado a fuego muy lento con vino, cebolla, ajo y ají dulce.',
    '/images/gastronomia/asado-negro-mantuano.webp',
  ],
  [
    'Mandocas zulianas',
    'Herraduras fritas de harina de maíz, plátano maduro, papelón con anís dulce y queso blanco rallado, servidas con nata zuliana.',
    '/images/gastronomia/mandocas-zulianas.jpg',
  ],
  [
    'Casabe ancestral y naiboa',
    'Torta crujiente de yuca brava horneada al budare con técnica indígena milenaria; su variante naiboa se intercala con melado y queso blanco.',
    '/images/gastronomia/casabe-ancestral.jpg',
  ],
  [
    'Quesería criolla tradicional',
    'El arte del queso de mano hilado en agua caliente, la suavidad del queso guayanés, el telita en suero y el llanero duro rallado.',
    '/images/gastronomia/queso-de-mano.jpg',
  ],
]

const soups = [
  [
    'Sancocho y hervido de res',
    'Costilla de res a la leña, ocumo, ñame, yuca, auyama, jojoto tierno y abundante cilantro de monte.',
  ],
  [
    'Sopa de mondongo criollo',
    'Panza de res lavada con limón criollo, cocida lentamente con verduras de raíz, maíz dulce y arepita asada.',
  ],
  [
    'Hervido de gallina criolla',
    'Caldo reconfortante de gallina de patio, verduras tiernas, cebollín y zumo de limón recién exprimido.',
  ],
]

const sweets = [
  ['Quesillo tradicional', 'Flan criollo de textura porosa, leche condensada, vainilla, un toque de ron añejo y caramelo ambarino.'],
  ['Golfeados con queso de mano', 'Panecillos enrollados con melaza de papelón, semillas de anís dulce y abundante queso blanco salado.'],
  ['Dulce de lechosa verde', 'Láminas crocantes y traslúcidas de papaya verde confitadas en almíbar de papelón, canela y clavos de olor.'],
  ['Cacao fino de Chuao', 'El grano criollo con denominación de origen más cotizado del mundo, secado al sol en las costas de Aragua.'],
  ['Bienmesabe y majarete', 'Bizcocho bañado en licor y crema de coco con merengue tostado, o pudín mestizo de maíz, coco y canela.'],
]

export function Gastronomy() {
  return (
    <section id="gastronomia" aria-labelledby="gastronomia-title" className="relative overflow-hidden border-t border-border bg-background px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 max-w-4xl">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-primary">Capítulo final · La mesa</p>
          <h2 id="gastronomia-title" className="font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.88] text-foreground">Venezuela se saborea</h2>
          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">Una cocina mestiza donde el maíz, el plátano, el queso blanco, el coco, el cacao y el papelón unen territorios, memorias y celebraciones.</p>
        </div>

        <div className="grid gap-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-primary">Los clásicos nacionales</h3>
            <div className="divide-y divide-border border-y border-border">
              {classics.map(([name, description, image], index) => (
                <article key={name} className="grid gap-5 py-7 md:grid-cols-[4rem_11rem_1fr] md:items-center">
                  <span className="font-display text-xl text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                  {image ? (
                    <div className="overflow-hidden rounded-sm aspect-[16/10] w-full bg-background/40">
                      <Image
                        src={image}
                        alt={`Fotografía de ${name}`}
                        width={176}
                        height={112}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                  <div>
                    <h4 className="text-2xl text-foreground">{name}</h4>
                    <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-16">
            <div>
              <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-primary">Sopas y hervidos</h3>
              <div className="space-y-7">
                <div className="mb-8 overflow-hidden rounded-sm aspect-[16/9] w-full bg-background/40">
                  <Image
                    src="/images/gastronomia/sancocho-de-res.jpg"
                    alt="Sancocho criollo venezolano de res a la leña con verduras"
                    width={720}
                    height={420}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105 cursor-pointer"
                  />
                </div>
                {soups.map(([name, description]) => (
                  <article key={name}>
                    <h4 className="text-xl text-foreground">{name}</h4>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-10">
              <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-primary">Dulces y postres</h3>
              <div className="space-y-7">
                <div className="mb-8 overflow-hidden rounded-sm aspect-[16/9] w-full bg-background/40">
                  <Image
                    src="/images/postres.png"
                    alt="Selección de postres tradicionales venezolanos"
                    width={720}
                    height={420}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105 cursor-pointer"
                  />
                </div>
                {sweets.map(([name, description]) => (
                  <article key={name}>
                    <h4 className="text-xl text-foreground">{name}</h4>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-10">
              <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-primary">Bebidas tradicionales</h3>
              <div className="mb-8 overflow-hidden rounded-sm aspect-[16/9] w-full bg-background/40">
                <Image
                  src="/images/bebidas.png"
                  alt="Bebidas tradicionales venezolanas, papelón con limón, chicha y cocada"
                  width={720}
                  height={420}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105 cursor-pointer"
                />
              </div>
              <p className="leading-relaxed text-muted-foreground">
                Papelón con limón bien helado, chicha criolla de arroz con leche condensada y canela, chicha andina fermentada de maíz y piña, cocada cremosa y guarapo dulce de caña fresca acompañan la vida cotidiana y las fiestas populares.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

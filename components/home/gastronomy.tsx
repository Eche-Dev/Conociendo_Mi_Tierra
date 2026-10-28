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
  [
    'Patacón zuliano',
    'Dos tapas crujientes de plátano verde o maduro frito aplastado, rellenas a modo de sándwich con carne mechada o pernil, queso de mano, jamón, repollo y salsas.',
    '/images/gastronomia/patacon-zuliano.jpg',
  ],
  [
    'Tostones con queso blanco y ensalada',
    'El rey indiscutible de las playas venezolanas: ruedas gruesas de plátano verde fritas, aplastadas y vueltas a freír crocantes, coronadas con queso blanco rallado y ensalada rallada.',
    '/images/gastronomia/tostones-con-queso.jpg',
  ],
  [
    'Carne en vara llanera',
    'Cortes enteros de res ensartados en varas de madera verde sobre brasas de leña a cielo abierto en los Llanos, sazonados únicamente con sal gruesa y servidos con yuca.',
    '/images/gastronomia/carne-en-vara.jpg',
  ],
  [
    'Chivo en coco',
    'Clásico insigne del Zulia y Falcón: carne de chivo estofada a fuego muy lento en leche fresca de coco con ají dulce, cebollín y onoto hasta quedar sumamente tierna.',
    '/images/gastronomia/chivo-en-coco.jpg',
  ],
  [
    'Pastel de chucho margariteño',
    'Obra cumbre de la cocina oriental y de Nueva Esparta: capas alternadas de tajadas de plátano maduro frito, guiso especiado de cazón o chucho y queso blanco gratinado.',
    '/images/gastronomia/pastel-de-chucho.jpg',
  ],
]

const soups = [
  [
    'Sancocho y hervido de res',
    'Costilla de res a la leña, ocumo, ñame, yuca, auyama, jojoto tierno y abundante cilantro de monte.',
    '/images/gastronomia/sancocho-de-res.jpg',
  ],
  [
    'Sopa de mondongo criollo',
    'Panza de res lavada con limón criollo, cocida lentamente con verduras de raíz, maíz dulce y arepita asada.',
    '/images/gastronomia/sopa-de-mondongo.jpg',
  ],
  [
    'Hervido de gallina criolla',
    'Caldo reconfortante de gallina de patio, verduras tiernas, cebollín y zumo de limón recién exprimido.',
    '/images/gastronomia/hervido-de-gallina.jpg',
  ],
]

const sweets = [
  [
    'Quesillo tradicional',
    'Flan criollo de textura porosa inconfundible, leche condensada, vainilla, un toque de ron añejo venezolano y caramelo ambarino.',
    '/images/gastronomia/quesillo-venezolano.jpg',
  ],
  [
    'Golfeados con queso de mano',
    'Panecillos enrollados en espiral con melaza de papelón, semillas de anís dulce y abundante queso blanco salado por encima.',
    '/images/gastronomia/golfeados.jpg',
  ],
  [
    'Dulce de lechosa verde',
    'Láminas crocantes y traslúcidas de papaya verde confitadas en almíbar de papelón, canela en rama y clavos de olor.',
    '/images/gastronomia/dulce-de-lechosa.jpg',
  ],
  [
    'Arroz con leche tradicional',
    'Postre casero por excelencia: arroz cocido lentamente en leche con azúcar o leche condensada, aromatizado con clavos y canela molida.',
    '/images/gastronomia/arroz-con-leche.jpg',
  ],
  [
    'Cacao fino de Chuao',
    'El grano criollo con Denominación de Origen más cotizado del mundo, secado al sol en el patio colonial de la costa de Aragua.',
    '/images/gastronomia/cacao-chuao.jpg',
  ],
  [
    'Majarete criollo',
    'Pudín mestizo ancestral elaborado con harina de maíz, leche fresca de coco, papelón y un manto aromático de canela en polvo.',
    '/images/gastronomia/majarete.jpg',
  ],
]

const drinks = [
  [
    'Papelón con limón helado',
    'El refresco nacional por excelencia: melaza pura de caña disuelta con abundante jugo de limón criollo recién exprimido y hielo picado.',
    '/images/gastronomia/papelon-con-limon.jpg',
  ],
  [
    'Chicha criolla venezolana',
    'Bebida cremosa y espesa de arroz o pasta con leche y azúcar, servida bien fría en vaso alto con cascadas de leche condensada y canela.',
    '/images/gastronomia/chicha-venezolana.jpg',
  ],
  [
    'Cocada playera tradicional',
    'Emulsión helada y refrescante de pulpa fresca de coco rallado con agua de coco, leche y un toque de canela frente a la brisa marina.',
    '/images/gastronomia/cocada-playera.jpg',
  ],
  [
    'Guarapo de caña fresca',
    'El jugo virgen recién extraído en el trapiche de caña de azúcar con hielo picado y un chorrito de limón criollo para cortar el dulzor.',
    '/images/gastronomia/guarapo-de-cana.jpg',
  ],
  [
    'Ponche Crema tradicional',
    'La bebida navideña y festiva creada por Eliodoro González P. a base de leche, huevos, azúcar y fino ron añejo venezolano.',
    '/images/gastronomia/ponche-crema.jpg',
  ],
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
                        className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.35] cursor-pointer"
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
              <div className="divide-y divide-border border-y border-border">
                {soups.map(([name, description, image]) => (
                  <article key={name} className="grid gap-5 py-6 grid-cols-[1fr_8rem] sm:grid-cols-[1fr_10.5rem] items-center">
                    <div>
                      <h4 className="text-xl text-foreground">{name}</h4>
                      <p className="mt-1.5 max-w-md leading-relaxed text-muted-foreground text-sm sm:text-base">{description}</p>
                    </div>
                    {image && (
                      <div className="overflow-hidden rounded-sm aspect-[16/10] w-full bg-background/40 flex-shrink-0">
                        <Image
                          src={image}
                          alt={`Fotografía de ${name}`}
                          width={176}
                          height={112}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.35] cursor-pointer"
                        />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-10">
              <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-primary">Dulces y postres</h3>
              <div className="divide-y divide-border border-y border-border">
                {sweets.map(([name, description, image]) => (
                  <article key={name} className="grid gap-5 py-6 grid-cols-[1fr_8rem] sm:grid-cols-[1fr_10.5rem] items-center">
                    <div>
                      <h4 className="text-xl text-foreground">{name}</h4>
                      <p className="mt-1.5 max-w-md leading-relaxed text-muted-foreground text-sm sm:text-base">{description}</p>
                    </div>
                    {image && (
                      <div className="overflow-hidden rounded-sm aspect-[16/10] w-full bg-background/40 flex-shrink-0">
                        <Image
                          src={image}
                          alt={`Fotografía de ${name}`}
                          width={176}
                          height={112}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.35] cursor-pointer"
                        />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-10">
              <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-primary">Bebidas tradicionales</h3>
              <div className="divide-y divide-border border-y border-border">
                {drinks.map(([name, description, image]) => (
                  <article key={name} className="grid gap-5 py-6 grid-cols-[1fr_8rem] sm:grid-cols-[1fr_10.5rem] items-center">
                    <div>
                      <h4 className="text-xl text-foreground">{name}</h4>
                      <p className="mt-1.5 max-w-md leading-relaxed text-muted-foreground text-sm sm:text-base">{description}</p>
                    </div>
                    {image && (
                      <div className="overflow-hidden rounded-sm aspect-[16/10] w-full bg-background/40 flex-shrink-0">
                        <Image
                          src={image}
                          alt={`Fotografía de ${name}`}
                          width={176}
                          height={112}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.35] cursor-pointer"
                        />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

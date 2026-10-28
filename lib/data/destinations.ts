import type { Destination } from '@/lib/types'

export const destinations: Destination[] = [
  {
    id: 'los-roques',
    name: 'Los Roques',
    tagline: 'El acuario del Caribe',
    region: 'Dependencias Federales · Mar Caribe',
    coords: '11°51′N · 66°45′O',
    image: '/images/destinations/los-roques/2.webp',
    alt: 'Vista aérea de cayos de arena blanca rodeados de agua turquesa en el archipiélago de Los Roques',
    description:
      'Unas 350 islas, cayos y bancos de arena flotan sobre una laguna de coral donde el agua cambia del verde jade al azul cobalto en pocos metros. En Gran Roque, la única isla con pueblo, las calles son de arena, no circulan carros y las casas pintadas de colores miran al mar. Aquí se viene a bucear entre tortugas y peces loro, a navegar en peñero hasta cayos desiertos y a ver flamencos rosados en las salinas.',
    facts: [
      { label: 'Islas y cayos', value: '≈ 350' },
      { label: 'Parque Nacional', value: '1972' },
      { label: 'Desde la costa', value: '≈ 170 km' },
    ],
    history: [
      'Mucho antes de la llegada europea, pueblos indígenas de la costa navegaban en canoa hasta el archipiélago para pescar y recolectar botuto; sus conchas y cerámicas aún aparecen enterradas en los cayos.',
      'En el siglo XIX llegaron pescadores de Curazao y Bonaire. De ellos quedaron el viejo faro holandés de Gran Roque y nombres como Crasquí (Grass Key) o Sarquí (Salt Key). En 1972 Los Roques se convirtió en uno de los primeros parques nacionales marinos de América Latina.',
    ],
  },
  {
    id: 'margarita',
    name: 'Isla de Margarita',
    tagline: 'La Perla del Caribe',
    region: 'Nueva Esparta',
    coords: '11°00′N · 63°55′O',
    image: '/images/destinations/margarita/02-castillo-san-carlos-borromeo.jpg',
    alt: 'Fortaleza colonial de piedra sobre una bahía con botes pesqueros al atardecer en Isla de Margarita',
    description:
      'Playas de oleaje como Playa El Agua y Parguito, la calma de Juan Griego al atardecer y los manglares de La Restinga, donde se navega por túneles de raíces. Al oeste, la península de Macanao es casi un desierto; al centro, el cerro El Copey se cubre de bosque nublado. Una isla que cabe en un día y no se termina en una vida.',
    facts: [
      { label: 'Superficie', value: '1.020 km²' },
      { label: 'Avistada por Colón', value: '1498' },
      { label: 'Castillos coloniales', value: 'S. XVII' },
    ],
    history: [
      'Colón la avistó en 1498 durante su tercer viaje. Sus aguas, y las de la vecina Cubagua, guardaban tantos ostrales que la isla recibió el nombre de Margarita, «perla». En Cubagua se levantó Nueva Cádiz, uno de los primeros asentamientos europeos de Sudamérica.',
      'Para defender las perlas de los piratas se construyeron el castillo de San Carlos de Borromeo en Pampatar y el de Santa Rosa en La Asunción, donde estuvo presa la heroína Luisa Cáceres de Arismendi. Su resistencia en la Independencia le dio el nombre de Nueva Esparta.',
    ],
  },
  {
    id: 'medanos-de-coro',
    name: 'Médanos de Coro',
    tagline: 'El desierto que camina',
    region: 'Falcón',
    coords: '11°30′N · 69°40′O',
    image: '/images/destinations/medanos-de-coro/1.jpg',
    alt: 'Dunas doradas monumentales en el Parque Nacional Médanos de Coro',
    description:
      'Dunas de hasta 40 metros que los vientos alisios empujan sin descanso, cambiando de forma cada día. Ocupan el istmo que une la ciudad de Coro con la península de Paraguaná, rodeadas de cardones, cujíes y zorros del desierto. Al caer la tarde la arena se tiñe de cobre y basta con subir una cresta para sentirse en otro planeta.',
    facts: [
      { label: 'Parque Nacional', value: '1974' },
      { label: 'Superficie', value: '91 km²' },
      { label: 'Altura de dunas', value: 'hasta 40 m' },
    ],
    history: [
      'Junto a los médanos se encuentra Coro, fundada en 1527 por Juan de Ampíes: primera capital de la Provincia de Venezuela y sede del primer obispado de Sudamérica. Su casco colonial de casas de bahareque y su puerto de La Vela son Patrimonio de la Humanidad desde 1993.',
      'En agosto de 1806, Francisco de Miranda desembarcó en La Vela de Coro e izó por primera vez en tierra venezolana la bandera tricolor, el mismo amarillo, azul y rojo que hoy ondea en todo el país.',
    ],
  },
  {
    id: 'catatumbo',
    name: 'Relámpago del Catatumbo',
    tagline: 'El faro de Maracaibo',
    region: 'Zulia · Lago de Maracaibo',
    coords: '9°20′N · 71°40′O',
    image: '/images/destinations/catatumbo/1.jpg',
    alt: 'Impresionante rayo del Catatumbo bifurcado iluminando el cielo y el Lago de Maracaibo',
    description:
      'Donde el río Catatumbo desemboca en el Lago de Maracaibo, el aire cálido del lago choca con los vientos fríos de los Andes y la Sierra de Perijá. El resultado es la tormenta eléctrica más persistente del planeta: hasta 260 noches al año y casi 28 relámpagos por minuto, visibles a cientos de kilómetros. Se contempla en silencio desde los pueblos de palafitos de Congo Mirador y Ologá.',
    facts: [
      { label: 'Noches con tormenta', value: 'hasta 260/año' },
      { label: 'Relámpagos', value: '≈ 28/min' },
      { label: 'Récord Guinness', value: '2014' },
    ],
    history: [
      'Durante siglos los navegantes lo usaron como faro natural. Cuenta la tradición que en 1595 sus destellos delataron la flota del corsario Francis Drake e impidieron un ataque nocturno a Maracaibo; Lope de Vega lo recordó en su poema «La Dragontea».',
      'También se dice que iluminó la Batalla Naval del Lago en 1823, que selló la Independencia. Hoy el rayo figura en la bandera del estado Zulia y Guinness lo reconoce como el lugar con mayor concentración de relámpagos del mundo.',
    ],
  },
  {
    id: 'sierra-nevada',
    name: 'Sierra Nevada de Mérida',
    tagline: 'El techo de Venezuela',
    region: 'Mérida · Cordillera de los Andes',
    coords: '8°32′N · 71°02′O',
    image: '/images/destinations/sierra-nevada/1.jpg',
    alt: 'Picos rocosos nevados de la Sierra Nevada de Mérida sobre un páramo de frailejones y una laguna glaciar',
    description:
      'Picos de casi cinco mil metros, páramos cubiertos de frailejones plateados y lagunas de origen glaciar como Mucubají y la Laguna Negra. El teleférico Mukumbarí sube desde la ciudad de Mérida hasta el Pico Espejo, a 4.765 metros, en uno de los recorridos por cable más largos y altos del mundo. Abajo esperan pueblos de piedra como Los Nevados y Jají.',
    facts: [
      { label: 'Pico Bolívar', value: '4.978 m' },
      { label: 'Teleférico', value: '12,5 km' },
      { label: 'Parque Nacional', value: '1952' },
    ],
    history: [
      'Los pueblos timoto-cuicas cultivaron estas montañas en terrazas y consideraban sagradas sus lagunas. Mérida fue fundada en 1558, y en 1813, durante la Campaña Admirable, fue la primera ciudad en aclamar a Simón Bolívar como «Libertador».',
      'Sus cumbres guardaron glaciares durante milenios. El último, el Humboldt, se redujo hasta desaparecer como glaciar en 2024, convirtiendo a Venezuela en el primer país de la era moderna en perder todos sus hielos: un recordatorio de lo frágil que es este paisaje.',
    ],
  },
  {
    id: 'los-llanos',
    name: 'Los Llanos',
    tagline: 'Donde el horizonte no termina',
    region: 'Apure · Barinas · Guárico',
    coords: '7°50′N · 67°30′O',
    image: '/images/destinations/los-llanos/1.jpg',
    alt: 'Sabana abierta de Capanaparo en los Llanos de Apure al atardecer',
    description:
      'Una planicie que ocupa cerca de un tercio de Venezuela y vive al ritmo de dos estaciones: en invierno las lluvias la convierten en un mar de agua dulce; en verano, en una sabana dorada. Es uno de los mejores lugares del continente para ver fauna: chigüires, caimanes del Orinoco, anacondas, toninas y nubes de corocoras rojas al atardecer.',
    facts: [
      { label: 'Territorio', value: '≈ 1/3 del país' },
      { label: 'Música', value: 'Joropo' },
      { label: 'Patrimonio UNESCO', value: '2017' },
    ],
    history: [
      'Los llaneros, jinetes formidables, decidieron el rumbo de la guerra de Independencia. En 1819, en Las Queseras del Medio, José Antonio Páez y apenas 153 lanceros derrotaron a cerca de mil jinetes realistas tras su célebre grito: «¡Vuelvan caras!».',
      'De los hatos nació una cultura propia: el coleo, el arpa, el cuatro y las maracas del joropo. Los cantos de trabajo de los Llanos, con los que se arrea y ordeña el ganado, fueron declarados Patrimonio Cultural Inmaterial por la UNESCO en 2017.',
    ],
  },
  {
    id: 'delta-orinoco',
    name: 'Delta del Orinoco',
    tagline: 'La tierra de la gente de las canoas',
    region: 'Delta Amacuro',
    coords: '8°45′N · 61°15′O',
    image: '/images/destinations/delta-orinoco/1.jpg',
    alt: 'Laberinto de caños y selva inundable en el Delta del Orinoco en Delta Amacuro',
    description:
      'Antes de entregarse al Atlántico, el Orinoco se abre en un abanico de cientos de caños que atraviesan manglares y selvas de palma moriche. Se recorre en curiara, entre toninas, guacamayas y monos araguatos, durmiendo en campamentos sobre pilotes y escuchando la selva despertar entre la neblina.',
    facts: [
      { label: 'Extensión', value: '≈ 40.000 km²' },
      { label: 'Río Orinoco', value: '2.140 km' },
      { label: 'Pueblo originario', value: 'Warao' },
    ],
    history: [
      'Los warao, «la gente de las canoas», habitan el delta desde hace milenios. Viven en palafitos sobre el agua y de la palma de moriche, a la que llaman árbol de la vida, obtienen alimento, techo y fibra para sus chinchorros.',
      'En 1498, Cristóbal Colón navegó frente a sus bocas y encontró tanta agua dulce en el mar que creyó estar cerca del Paraíso Terrenal. Llamó a estas costas «Tierra de Gracia», el primer nombre europeo de Venezuela.',
    ],
  },
  {
    id: 'canaima',
    name: 'Gran Canaima',
    tagline: 'Aguas color de té',
    region: 'Bolívar · Parque Nacional Canaima',
    coords: '6°14′N · 62°51′O',
    image: '/images/destinations/canaima/1.jpg',
    alt: 'Saltos de agua cayendo en la laguna de Canaima de aguas rojizas con playa de arena rosada y tepuyes al fondo',
    description:
      'Los saltos Hacha, Ucaima, Golondrina y Wadaima se derraman sobre una laguna de aguas rojizas, teñidas por los taninos de la vegetación, con playas de arena rosada y tepuyes en el horizonte. En el Salto El Sapo se camina por detrás de la cortina de agua, empapado y con el rugido encima. Es la puerta de entrada al Salto Ángel.',
    facts: [
      { label: 'Superficie', value: '30.000 km²' },
      { label: 'Creado', value: '1962' },
      { label: 'Patrimonio UNESCO', value: '1994' },
    ],
    history: [
      'Este es territorio ancestral del pueblo pemón, cuyas comunidades siguen guiando a los viajeros por ríos y sabanas. El nombre Canaima se popularizó con la novela homónima de Rómulo Gallegos (1935), donde encarna al espíritu indomable de la selva.',
      'Creado en 1962 y ampliado en 1975 hasta alcanzar tres millones de hectáreas, es uno de los parques nacionales más grandes del mundo. La UNESCO lo declaró Patrimonio de la Humanidad en 1994 por sus tepuyes, entre las formaciones geológicas más antiguas del planeta.',
    ],
  },
  {
    id: 'salto-angel',
    name: 'Salto Ángel',
    tagline: 'Kerepakupai Merú',
    region: 'Bolívar · Auyantepui',
    coords: '5°58′N · 62°32′O',
    image: '/images/destinations/salto-angel/1.jpg',
    alt: 'El Salto Ángel cayendo 979 metros desde la muralla de arenisca del Auyantepuy en Canaima',
    description:
      'La cascada más alta del mundo se lanza desde el borde del Auyantepui y cae 979 metros, 807 de ellos sin tocar roca. En la temporada seca el agua se deshace en niebla antes de llegar al suelo. Se llega remontando los ríos Carrao y Churún en curiara desde Canaima, y luego caminando por la selva hasta el mirador Laime, frente a la pared.',
    facts: [
      { label: 'Altura total', value: '979 m' },
      { label: 'Caída libre', value: '807 m' },
      { label: 'Mejor época', value: 'Jun – Nov' },
    ],
    history: [
      'Los pemones la llaman Kerepakupai Merú, «salto del lugar más profundo». El mundo la conoció en 1933, cuando el aviador estadounidense Jimmie Angel la vio mientras buscaba oro. En 1937 aterrizó su avioneta en la cima del tepuy; las ruedas se hundieron en el pantano y tuvo que descender a pie durante 11 días.',
      'La avioneta permaneció 33 años sobre el Auyantepui y hoy se exhibe frente al aeropuerto de Ciudad Bolívar. La altura de la cascada fue medida oficialmente en 1949 por una expedición liderada por la periodista Ruth Robertson.',
    ],
  },
  {
    id: 'roraima',
    name: 'Monte Roraima',
    tagline: 'El Mundo Perdido',
    region: 'Bolívar · Triple frontera',
    coords: '5°08′N · 60°45′O',
    image: '/images/destinations/roraima/1.jpg',
    alt: 'El tepuy Roraima con sus paredes verticales envuelto en nubes sobre la Gran Sabana',
    description:
      'Una meseta de paredes verticales donde se encuentran Venezuela, Brasil y Guyana. Su cima es un paisaje lunar de rocas negras esculpidas por la lluvia, jacuzzis naturales, valles cubiertos de cristales de cuarzo y plantas carnívoras que no existen en ningún otro lugar. Se alcanza en una travesía de seis a ocho días desde Paraitepui, cruzando la Gran Sabana.',
    facts: [
      { label: 'Altura', value: '2.810 m' },
      { label: 'Edad de la roca', value: '≈ 2.000 M años' },
      { label: 'Meseta', value: '31 km²' },
    ],
    history: [
      'Para los pemones, Roraima es el tronco del gran árbol de la vida, derribado por el héroe Makunaima; de su caída brotaron los ríos y los frutos de la sabana. Su nombre suele traducirse como «la gran madre de las aguas».',
      'Everard im Thurn y Harry Perkins coronaron su cumbre por primera vez en 1884. Sus relatos inspiraron a Arthur Conan Doyle a escribir «El mundo perdido» (1912), donde imaginó dinosaurios sobreviviendo en lo alto de una meseta aislada del tiempo.',
    ],
  },
  {
    id: 'morrocoy', name: 'Parque Nacional Morrocoy', tagline: 'El Caribe entre manglares', region: 'Falcón · Costa Caribe', coords: '10°52′N · 68°16′O', image: '/images/destinations/morrocoy/1.jpg', alt: 'Cayo Sombrero con palmeras y aguas turquesas en el Parque Nacional Morrocoy', description: 'Un laberinto de cayos, manglares y arrecifes donde el mar se vuelve transparente. Desde Tucacas y Chichiriviche se navega hacia Cayo Sombrero, Cayo de Sal y La Piscina, entre tortugas, peces y corales.', facts: [{ label: 'Creado', value: '1974' }, { label: 'Ecosistemas', value: 'Cayos y manglar' }, { label: 'Acceso', value: 'Tucacas' }], history: ['Las comunidades costeras han vivido de la pesca y la navegación entre estos cayos durante generaciones.', 'El parque protege uno de los sistemas marino-costeros más valiosos del occidente venezolano.'],
  },
  {
    id: 'mochima', name: 'Parque Nacional Mochima', tagline: 'Montañas que caen al mar', region: 'Anzoátegui · Sucre', coords: '10°20′N · 64°20′O', image: '/images/destinations/mochima/1.jpg', alt: 'Playa Colorada con sus arenas doradas y aguas turquesas en el Parque Nacional Mochima', description: 'Bahías profundas, islas rocosas y playas escondidas forman un paisaje donde la cordillera oriental se sumerge directamente en el Caribe. Playa Colorada y sus aguas cristalinas son la puerta a una costa para explorar en lancha.', facts: [{ label: 'Creado', value: '1973' }, { label: 'Costa', value: '≈ 94 km' }, { label: 'Fauna', value: 'Delfines y tortugas' }], history: ['Pescadores de Cumaná y Puerto La Cruz han trazado durante siglos las rutas entre sus ensenadas.', 'Mochima fue creado para conservar este encuentro excepcional entre bosque seco, arrecife y mar abierto.'],
  },
  {
    id: 'cinaruco', name: 'Río Cinaruco', tagline: 'El espejo blanco de Apure', region: 'Apure · Parque Nacional Santos Luzardo', coords: '6°35′N · 67°25′O', image: '/images/destinations/cinaruco/1.jpg', alt: 'Laguna y aguas cristalinas del Río Cinaruco entre arenas blancas en Apure', description: 'El Cinaruco serpentea entre sabanas inmensas y playas de arena blanca. Sus aguas transparentes, palmas de moriche y bosques de galería crean uno de los escenarios más puros para contemplar toninas, aves y el pavón.', facts: [{ label: 'Región', value: 'Apure' }, { label: 'Paisaje', value: 'Río y sabana' }, { label: 'Fauna', value: 'Toninas y pavón' }], history: ['El territorio forma parte de la memoria de pueblos indígenas y de la cultura llanera, ligada al río, la pesca y el caballo.', 'El parque lleva el nombre del maestro de la pintura venezolana, Tito Salas, cuyo seudónimo fue Santos Luzardo, personaje de Doña Bárbara.'],
  },
  {
    id: 'guacharo', name: 'Cueva del Guácharo', tagline: 'La noche bajo la montaña', region: 'Monagas · Oriente', coords: '10°11′N · 63°33′O', image: '/images/destinations/guacharo/1.jpg', alt: 'Entrada monumental de 23 metros de altura de la Cueva del Guácharo en Caripe, Monagas', description: 'Una catedral de piedra caliza donde el agua ha tallado galerías, estalactitas y ríos subterráneos. Al anochecer, miles de guácharos abandonan la cueva guiándose por sonidos, como un río de alas sobre la selva.', facts: [{ label: 'Monumento', value: 'Alejandro de Humboldt' }, { label: 'Longitud', value: '≈ 10 km' }, { label: 'Habitantes', value: 'Guácharos' }], history: ['En 1799 Alexander von Humboldt exploró la cueva y describió por primera vez científicamente a estas aves frugívoras nocturnas.', 'El parque nacional creado en 1975 protege la cueva, sus ríos y el bosque nublado de la Serranía de Turimiquire.'],
  },
  {
    id: 'paria', name: 'Península de Paria', tagline: 'Donde la selva toca el Caribe', region: 'Sucre · Oriente', coords: '10°40′N · 62°35′O', image: '/images/destinations/paria/1.jpg', alt: 'Playa Medina con sus cocoteros, arenas tostadas y aguas verdes en la Península de Paria', description: 'Una península de selva exuberante, cacao y playas casi secretas como Medina y Pui Pui. El camino atraviesa montañas húmedas hasta desembocar en un Caribe verde, remoto y silencioso.', facts: [{ label: 'Parque Nacional', value: '1991' }, { label: 'Playas', value: 'Medina y Pui Pui' }, { label: 'Producto local', value: 'Cacao' }], history: ['Los pueblos originarios conocían esta costa mucho antes de que Colón la avistara en su tercer viaje.', 'Sus haciendas de cacao y pueblos pesqueros conservan una cultura mestiza ligada a la selva y al mar.'],
  },
  {
    id: 'choroni', name: 'Choroní y Bahía de Cata', tagline: 'Cacao, montaña y mar', region: 'Aragua · Costa central', coords: '10°29′N · 67°36′O', image: '/images/destinations/choroni/1.jpg', alt: 'Playa Grande de Choroní con sus palmeras y mar caribeño en Puerto Colombia, Aragua', description: 'El bosque del Henri Pittier desciende hasta pueblos de cacao, calles coloniales y playas luminosas. Choroní, Cata, Cuyagua y Cepe reúnen surf, pesca, tambores y una costa donde la montaña parece proteger cada bahía.', facts: [{ label: 'Henri Pittier', value: '1937' }, { label: 'Cultura', value: 'Cacao y tambor' }, { label: 'Playas', value: 'Cata y Cuyagua' }], history: ['Choroní fue fundado en 1616 y creció alrededor del cultivo de cacao, trabajado por comunidades afrodescendientes.', 'Henri Pittier, el parque nacional más antiguo de Venezuela, protege el corredor entre la selva nublada y el Caribe.'],
  },
  {
    id: 'patanemo', name: 'Bahía de Patanemo e Isla Larga', tagline: 'El secreto azul de Carabobo', region: 'Carabobo · Puerto Cabello', coords: '10°27′N · 67°56′O', image: '/images/destinations/patanemo/1.jpg', alt: 'Bahía de Patanemo con su ensenada de arena clara, aguas cristalinas y cocoteros en Carabobo', description: 'Una bahía serena protegida por montañas, con arena clara y aguas transparentes. Desde la costa se navega hacia Isla Larga para hacer snorkel sobre arrecifes y pecios, mientras los manglares guardan el ritmo pausado de la costa central.', facts: [{ label: 'Destino', value: 'Patanemo' }, { label: 'Actividad', value: 'Snorkel' }, { label: 'Paisaje', value: 'Bahía y manglar' }], history: ['La costa fue recorrida por comunidades pesqueras y navegantes desde mucho antes de la llegada europea.', 'Sus playas y fondos marinos forman parte del corredor natural que une Puerto Cabello con el Parque Nacional San Esteban.'],
  },
  {
    id: 'medanos-soledad', name: 'Médanos de la Soledad', tagline: 'Arena blanca en la sabana', region: 'Apure · Capanaparo', coords: '6°10′N · 67°20′O', image: '/images/destinations/medanos-soledad/1.jpg', alt: 'Dunas monumentales de los Médanos de la Soledad emergiendo en la sabana de Apure', description: 'Dunas claras aparecen de pronto entre ríos, morichales y sabanas interminables. En el Capanaparo el paisaje parece contradecirse: desierto y humedal, arena y agua, silencio y una fauna llanera que se mueve al borde del horizonte.', facts: [{ label: 'Parque', value: 'Santos Luzardo' }, { label: 'Región', value: 'Capanaparo' }, { label: 'Ecosistema', value: 'Duna y sabana' }], history: ['El territorio conserva rutas ancestrales de pueblos indígenas y una relación milenaria con los ríos apureños.', 'El parque nacional protege la inmensidad del llano, sus dunas, bosques de galería y la vida silvestre que se concentra en la estación seca.'],
  },
  {
    id: 'cueva-alfredo-jahn', name: 'Cueva Alfredo Jahn', tagline: 'La montaña por dentro', region: 'Miranda · Barlovento', coords: '10°29′N · 66°13′O', image: '/images/destinations/cueva-alfredo-jahn/1.jpg', alt: 'Boca monumental y exploradores en la Cueva Alfredo Jahn en Birongo, Barlovento', description: 'Ríos subterráneos, puentes naturales y enormes galerías convierten esta cueva en una aventura de espeleología. La luz desaparece poco a poco mientras el agua dibuja formas en la roca y la selva queda suspendida sobre la entrada.', facts: [{ label: 'Actividad', value: 'Espeleología' }, { label: 'Roca', value: 'Caliza' }, { label: 'Entorno', value: 'Selva húmeda' }], history: ['La cueva lleva el nombre de Alfredo Jahn, pionero de la exploración científica y la geografía venezolana.', 'Sus galerías forman parte del sistema kárstico de Barlovento, un paisaje subterráneo modelado durante miles de años por el agua.'],
  },
  {
    id: 'waraira-repano', name: 'Waraira Repano', tagline: 'La montaña que abraza Caracas', region: 'Caracas · La Guaira', coords: '10°34′N · 66°52′O', image: '/images/destinations/waraira-repano/1.jpg', alt: 'Majestuosa panorámica de la Cordillera del Waraira Repano y el valle de Caracas', description: 'La montaña cambia de rostro a cada paso: bosque seco, selva nublada, bromelias y miradores que dejan ver al mismo tiempo la ciudad y el mar. El teleférico y los senderos conducen hasta Sabas Nieves, Galipán y el Hotel Humboldt.', facts: [{ label: 'Altura máxima', value: '2.765 m' }, { label: 'Nombre ancestral', value: 'Waraira Repano' }, { label: 'Acceso', value: 'Teleférico y senderos' }], history: ['Waraira Repano es el nombre indígena asociado a la montaña antes de que la tradición colonial la llamara El Ávila.', 'El parque nacional fue creado en 1958 y funciona como pulmón, refugio de biodiversidad y balcón natural de la capital venezolana.'],
  },
  {
    id: 'galipan', name: 'Galipán', tagline: 'Flores entre dos horizontes', region: 'Caracas · Waraira Repano', coords: '10°35′N · 66°53′O', image: '/images/destinations/galipan/1.jpg', alt: 'Panorámica del pueblo agrícola de San José de Galipán enclavado en la ladera norte del Waraira Repano', description: 'En la cresta del Ávila, Galipán mezcla caminos de piedra, flores, huertos y cocinas de montaña con una vista doble: Caracas hacia el sur y el Caribe hacia el norte. Es un refugio fresco donde la ciudad parece lejana.', facts: [{ label: 'Altitud', value: '≈ 1.500 m' }, { label: 'Entorno', value: 'Bosque nublado' }, { label: 'Tradición', value: 'Flores y gastronomía' }], history: ['La comunidad se formó con familias canarias que llegaron a las laderas del Ávila y desarrollaron cultivos adaptados a la montaña.', 'Sus flores, restaurantes y posadas mantienen vivo un paisaje cultural entre la capital, el bosque y el mar.'],
  },
  {
    id: 'cachamay', name: 'La Llovizna y Cachamay', tagline: 'El Caroní hecho cascada', region: 'Bolívar · Puerto Ordaz', coords: '8°18′N · 62°43′O', image: '/images/destinations/cachamay/1.jpg', alt: 'Torrente impetuoso y vapor de agua en el Salto La Llovizna sobre el Río Caroní', description: 'El río Caroní se rompe en rápidos y cascadas dentro de parques urbanos cubiertos de selva. La bruma de La Llovizna, los senderos de Cachamay y la fuerza del agua convierten a Puerto Ordaz en una ciudad atravesada por un paisaje salvaje.', facts: [{ label: 'Río', value: 'Caroní' }, { label: 'Ciudad', value: 'Puerto Ordaz' }, { label: 'Experiencia', value: 'Cascadas y bosque' }], history: ['El Caroní fue una ruta fundamental para los pueblos originarios de Guayana y continúa siendo uno de los grandes ríos energéticos del país.', 'La confluencia del Caroní con el Orinoco impulsó el crecimiento de Ciudad Guayana, mientras sus parques preservan la memoria natural de los raudales.'],
  },
  {
    id: 'sorte-quibayo', name: 'Sorte y Quibayo', tagline: 'La montaña de los encuentros', region: 'Yaracuy · Sierra de Sorte', coords: '10°19′N · 68°42′O', image: '/images/destinations/sorte-quibayo/1.jpg', alt: 'Monumento Natural Cerro María Lionza en la Sierra de Sorte, Chivacoa, Yaracuy', description: 'Entre selva húmeda, quebradas y caminos de montaña, Sorte y Quibayo forman un paisaje cultural donde conviven naturaleza, memoria popular y espiritualidad venezolana. El recorrido invita a observar con respeto las velaciones, ofrendas y relatos transmitidos por las comunidades, sin convertir sus prácticas en espectáculo.', facts: [{ label: 'Paisaje', value: 'Bosque nublado' }, { label: 'Tradición', value: 'Baile en Candela' }, { label: 'Región', value: 'Yaracuy' }], history: ['La montaña es uno de los principales lugares asociados al culto de María Lionza, una tradición venezolana de raíz indígena, africana y europea que se transformó a través de generaciones.', 'Cada 12 de octubre, el Baile en Candela reúne devoción, música, promesas y encuentro comunitario. La historia del lugar también recuerda la importancia de proteger la selva, respetar a sus practicantes y rechazar la profanación de cementerios o cualquier daño a personas y patrimonio.'],
  },
  {
    id: 'brujeria-santeria', name: 'Brujería, santería y memoria espiritual', tagline: 'Creencias vivas de Venezuela', region: 'Yaracuy · Barlovento · Guayana', coords: '10°19′N · 68°42′O', image: '/images/destinations/brujeria-santeria/1.jpg', alt: 'Altar de Las Tres Potencias Venezolanas: María Lionza, Guaicaipuro y Negro Felipe', description: 'La espiritualidad venezolana reúne capas indígenas, africanas, católicas y populares. En Sorte y Quibayo se expresa alrededor del culto a María Lionza; en Barlovento, los tambores y las tradiciones afrovenezolanas conviven con prácticas de sanación y protección; y en las cosmovisiones pemón, yanomami, wayúu y piaroa la naturaleza es territorio sagrado. Este capítulo presenta estas tradiciones como patrimonio cultural vivo, no como espectáculo ni manual de rituales.', facts: [{ label: 'Tradición', value: 'María Lionza' }, { label: 'Raíces', value: 'Indígenas y afrovenezolanas' }, { label: 'Enfoque', value: 'Cultural y respetuoso' }], history: ['El culto a María Lionza se formó en Venezuela mediante el encuentro de imaginarios indígenas, devociones católicas y herencias africanas. Sus expresiones cambian según la comunidad y se transmiten de generación en generación.', 'La santería y otras religiones de matriz africana forman parte de la diversidad religiosa del país, pero no deben confundirse entre sí ni reducirse a la palabra “brujería”. Cualquier visita debe contar con permiso de la comunidad, respetar la privacidad de las ceremonias y rechazar la profanación, la explotación o el daño a personas, animales y patrimonio.'],
  },
  {
    id: 'amazonas-profunda', name: 'Amazonas profunda', tagline: 'Piedra, selva y memoria ancestral', region: 'Amazonas · Guayana', coords: '5°40′N · 67°37′O', image: '/images/destinations/amazonas-profunda/1.jpg', alt: 'El sagrado Cerro Autana alzándose sobre la selva virgen del estado Amazonas', description: 'Más allá de las rutas conocidas aparecen la Serranía de La Neblina, Parima-Tapirapecó, Cerro Yapacana, Piedra del Cocuy y Piedra La Tortuga: territorios de expedición donde la selva, los ríos y los monolitos de granito parecen guardar otra escala del tiempo.', facts: [{ label: 'Territorio', value: 'Amazonas' }, { label: 'Paisaje', value: 'Selva y tepuyes' }, { label: 'Acceso', value: 'Expedición' }], history: ['La Amazonía venezolana es territorio ancestral de pueblos yanomami, yekuana, piaroa y otros pueblos originarios, cuyas rutas y conocimientos sostienen la relación viva con la selva.', 'Sus áreas más remotas requieren permisos, guías locales y una planificación responsable: no son escenarios para el turismo masivo, sino ecosistemas y culturas que deben visitarse con cuidado.'],
  },
  {
    id: 'andes-secretos', name: 'Andes secretos', tagline: 'Lagunas bajo el viento frío', region: 'Táchira · Trujillo · Mérida', coords: '8°00′N · 71°00′O', image: '/images/destinations/andes-secretos/1.jpg', alt: 'Lagunas glaciares y crestas de alta montaña en el Páramo El Batallón y La Negra', description: 'La Teta de Niquitao, los páramos del Batallón y La Negra, y las aguas termales de Santa Ana y Chiguará amplían el mapa de la cordillera: cumbres silenciosas, lagunas glaciares, frailejones y pueblos donde el camino todavía se hace a pie.', facts: [{ label: 'Experiencia', value: 'Senderismo' }, { label: 'Ecosistema', value: 'Páramo' }, { label: 'Clima', value: 'Frío de altura' }], history: ['Estas montañas conservan caminos agrícolas y memorias de los pueblos timoto-cuicas, que domesticaron la altura mediante terrazas y sistemas de riego.', 'Las lagunas, termales y páramos forman corredores frágiles: caminar sin dejar rastro es parte esencial de la historia que se quiere preservar.'],
  },
  {
    id: 'aguaro-guariquito', name: 'Aguaro-Guariquito', tagline: 'La sabana que respira', region: 'Guárico · Llanos centrales', coords: '8°06′N · 66°22′O', image: '/images/destinations/aguaro-guariquito/1.jpg', alt: 'Inmensa sabana y morichales en el Parque Nacional Aguaro-Guariquito, estado Guárico', description: 'Enormes sabanas, morichales y cursos de agua forman uno de los paisajes menos intervenidos del centro del país. En sus temporadas, el agua transforma la llanura y reúne aves, chigüires, caimanes y una luz que parece no tener fin.', facts: [{ label: 'Ecosistema', value: 'Sabana inundable' }, { label: 'Fauna', value: 'Aves y chigüires' }, { label: 'Región', value: 'Guárico' }], history: ['El parque protege el paisaje de sabana que alimentó la cultura ganadera, el canto de trabajo y la tradición ecuestre de los Llanos.', 'Su valor está en la continuidad del ecosistema: ríos, esteros y zonas secas funcionan como una sola trama durante el ciclo de lluvias y sequía.'],
  },
  {
    id: 'angostura', name: 'Angostura', tagline: 'La ciudad que mira al Orinoco', region: 'Bolívar · Ciudad Bolívar', coords: '8°07′N · 63°33′O', image: '/images/destinations/angostura/1.jpg', alt: 'El monumental Puente de Angostura sobre el río Orinoco en Ciudad Bolívar', description: 'Calles empedradas, casas de colores y balcones coloniales descienden hasta el Orinoco. En el casco histórico de Ciudad Bolívar, la piedra, el río y la memoria de la Independencia forman una de las escenas urbanas más poderosas de Venezuela.', facts: [{ label: 'Río', value: 'Orinoco' }, { label: 'Patrimonio', value: 'Casco histórico' }, { label: 'Región', value: 'Guayana' }], history: ['Aquí se reunió el Congreso de Angostura en 1819, donde Simón Bolívar presentó su célebre discurso y una visión política para la nueva república.', 'La ciudad conserva fortalezas, plazas y muelles que cuentan la historia de la navegación por el Orinoco y del intercambio entre la Guayana colonial y el interior del país.'],
  },
  {
    id: 'piedra-pintada', name: 'Piedra Pintada', tagline: 'Los signos de los primeros caminos', region: 'Carabobo · San Esteban', coords: '10°25′N · 68°00′O', image: '/images/destinations/piedra-pintada/1.jpg', alt: 'Petroglifos indígenas grabados en la roca en el Parque Arqueológico Piedra Pintada de Vigirima', description: 'Entre bosques y montañas de San Esteban, petroglifos indígenas convierten la roca en archivo. Piedra Pintada, junto a Vigirima y otros sitios arqueológicos, recuerda que el paisaje venezolano también se lee en sus grabados, rutas y piedras ceremoniales.', facts: [{ label: 'Patrimonio', value: 'Petroglifos' }, { label: 'Parque', value: 'San Esteban' }, { label: 'Experiencia', value: 'Arqueología' }], history: ['Los grabados fueron realizados por pueblos originarios mucho antes de la colonización y forman parte de una red cultural que conectaba costa, valles y montaña.', 'Su conservación exige no tocar, pintar ni extraer fragmentos: cada marca pertenece a una historia colectiva y a un patrimonio arqueológico protegido.'],
  },
  {
    id: 'colonia-tovar', name: 'Colonia Tovar', tagline: 'La Selva Negra en el Caribe', region: 'Aragua · Cordillera de la Costa', coords: '10°24′N · 67°17′O', image: '/images/destinations/colonia-tovar/1.jpg', alt: 'Arco tradicional de bienvenida y arquitectura alpina en La Colonia Tovar', description: 'Fundada en 1843 por colonos alemanes de la Selva Negra, la Colonia Tovar es un enclave único a 2.000 metros de altitud en la cordillera aragüeña. Conserva intacta su arquitectura de entramado de madera (Fachwerk), huertos de fresas y duraznos, cervecerías artesanales, charcutería tradicional y el dialecto alemánico badense.', facts: [{ label: 'Fundación', value: '8 de abril de 1843' }, { label: 'Altitud', value: '1.800 – 2.200 m' }, { label: 'Origen', value: 'Endingen, Selva Negra' }], history: ['El sabio Agustín Codazzi y Martín Tovar Ponte gestionaron en 1843 el traslado de casi 400 colonos desde el Gran Ducado de Baden para fundar un asentamiento agrícola en las tierras altas de Aragua.', 'Durante más de un siglo la comunidad permaneció en relativo aislamiento geográfico, lo que permitió preservar sus tradiciones badenses, recetas de embutidos, trajes de fiesta como los Jokilis y una arquitectura de montaña inconfundible.'],
  },
]

export interface TourBeat {
  id: string
  title: string
  subtitle: string
  altitude?: string
  description: string
  fact?: { label: string; value: string }
  image: string
  alt: string
  focalPoint?: string
}

export interface ImmersiveTour {
  destinationId: string
  destinationName: string
  tagline: string
  beats: TourBeat[]
}

export const IMMERSIVE_TOURS: Record<string, ImmersiveTour> = {
  'los-roques': {
    destinationId: 'los-roques',
    destinationName: 'Los Roques',
    tagline: 'El gran vuelo hacia el acuario del Caribe',
    beats: [
      {
        id: 'francisqui-medio',
        title: 'La Piscinita de Francisquí',
        subtitle: 'Cayo Francisquí Medio · Aguas Esmeralda',
        altitude: 'Nivel del mar · Calma marina',
        description:
          'Una piscina natural de aguas cristalinas resguardada por una barrera de coral. Sus tonos van del verde jade al turquesa brillante sobre un lecho de arena blanca inmaculada.',
        fact: { label: 'Visibilidad', value: '+30 metros' },
        image: '/images/destinations/los-roques/1.jpg',
        alt: 'Laguna marina cristalina con tonalidades turquesa y esmeralda en Cayo Francisquí',
      },
      {
        id: 'atolon-aereo',
        title: 'El Atolón Infinito',
        subtitle: 'Archipiélago Los Roques · Vista Panorámica',
        altitude: '3.000 m · Vista Aérea',
        description:
          'Más de 350 islas, cayos y bancos de arena flotan sobre una laguna marina resguardada por dos barreras de arrecife. Desde el aire, el océano dibuja mosaicos perfectos de coral y arena.',
        fact: { label: 'Área marina', value: '221.120 ha' },
        image: '/images/destinations/los-roques/2.webp',
        alt: 'Vista aérea panorámica del archipiélago de Los Roques con sus cayos y arrecifes',
      },
      {
        id: 'cayo-crasqui',
        title: 'Las Arenas de Crasquí',
        subtitle: 'Cayo Crasquí · Playas Vírgenes',
        altitude: 'Costa Oeste · Playa Desierta',
        description:
          'Kilómetros de arena blanca coralina que nunca se calienta bajo el sol del mediodía. Un cayo tranquilo donde las gaviotas y los pelícanos planean a ras de olas mansas.',
        fact: { label: 'Temperatura arena', value: 'Siempre fresca' },
        image: '/images/destinations/los-roques/3.webp',
        alt: 'Cayo de arena blanca inmaculada rodeado de aguas turquesas transparentes en Crasquí',
      },
      {
        id: 'orilla-madrisqui',
        title: 'La Orilla de Madrisquí',
        subtitle: 'Cayo Madrisquí · Frente a Gran Roque',
        altitude: 'Orilla · Encuentro con el mar',
        description:
          'A pocos minutos de navegación de Gran Roque, Madrisquí regala una orilla suave de aguas transparentes donde se puede caminar decenas de metros mar adentro sin que el agua supere las rodillas.',
        fact: { label: 'Distancia', value: '10 min en peñero' },
        image: '/images/destinations/los-roques/4.jpg',
        alt: 'Orilla de cayo de arena blanca con agua translúcida y espuma suave en Madrisquí',
      },
      {
        id: 'francisqui-arriba',
        title: 'El Espejo del Caribe',
        subtitle: 'Cayo Francisquí de Arriba · Piscinas Naturales',
        altitude: 'Nivel del mar · Aguas someras',
        description:
          'Bancos de arena y piscinas naturales donde la luz solar dibuja reflejos dorados sobre el fondo de arena fina. Un remanso de serenidad total bajo el cielo caribeño.',
        fact: { label: 'Temperatura agua', value: '27 °C constante' },
        image: '/images/destinations/los-roques/5.jpg',
        alt: 'Playa de aguas mansas y transparentes bajo el sol caribeño en Francisquí',
      },
      {
        id: 'vida-costera-sal',
        title: 'Refugio de Mangle y Salinas',
        subtitle: 'Cayo Sal y Dos Mosquises · Biodiversidad',
        altitude: 'Ecosistema Costero',
        description:
          'Entre los manglares rojos y las lagunas salinas conviven bandadas de flamencos, pelícanos y miles de alevines que crecen al abrigo seguro de las raíces sumergidas.',
        fact: { label: 'Protección', value: 'Parque Nacional 1972' },
        image: '/images/destinations/los-roques/6.webp',
        alt: 'Detalle de la vegetación costera y mangle en el Parque Nacional Los Roques',
      },
      {
        id: 'arrecife-profundo',
        title: 'La Catedral Sumergida',
        subtitle: 'Barrera de Coral Sur · Fondo Marino',
        altitude: '-12 m · Inmersión Profunda',
        description:
          'Al sumergirse bajo la superficie, la luz se quiebra en prismas sobre corales cerebro, gorgonias gigantes, tortugas carey y bancos de peces loro en uno de los arrecifes mejor conservados de América.',
        fact: { label: 'Buceo', value: 'Arrecife vivo' },
        image: '/images/destinations/los-roques/7.jpg',
        alt: 'Buzo explorando los arrecifes de coral y la fauna marina de Los Roques',
      },
      {
        id: 'gran-roque-pueblo',
        title: 'El Pueblo de Arena',
        subtitle: 'Gran Roque · El corazón humano y el Faro Holandés',
        altitude: 'Gran Roque · 150 m sobre el mar',
        description:
          'En el Gran Roque las calles son de arena viva y las casas coloniales se tiñen de azul y terracota. En la cima del cerro se alza el histórico faro holandés del siglo XIX, vigilando todo el archipiélago.',
        fact: { label: 'Calles', value: '100% de arena' },
        image: '/images/destinations/los-roques/8.jpg',
        alt: 'Pueblo de Gran Roque con casas de colores y cerro del faro holandés',
      },
      {
        id: 'cayo-de-agua',
        title: 'El Istmo de los Dos Mares',
        subtitle: 'Cayo de Agua · La joya más célebre del Caribe',
        altitude: 'Extremo Suroeste · Lengua de arena',
        description:
          'Una estrecha lengua de arena blanca purísima separa dos mares de tonalidades distintas que se encuentran en el centro. Considerada una de las playas más hermosas y vírgenes del planeta.',
        fact: { label: 'Reconocimiento', value: 'Top mundial de playas' },
        image: '/images/destinations/los-roques/9.jpg',
        alt: 'El istmo de arena blanca de Cayo de Agua con mar a ambos lados',
      },
      {
        id: 'francisqui-apacible',
        title: 'La Laguna Azul',
        subtitle: 'Cayo Francisquí · El fondeadero de los veleros',
        altitude: 'Costa Norte · Refugio marinero',
        description:
          'El refugio natural predilecto para los navegantes que llegan de todo el mundo. El mar quieto refleja las velas como en un espejo bajo la brisa constante de los vientos alisios.',
        fact: { label: 'Navegación', value: 'Fondeadero histórico' },
        image: '/images/destinations/los-roques/10.jpg',
        alt: 'Aguas cristalinas y apacibles en Cayo Francisquí con botes en calma',
      },
    ],
  },
  'margarita': {
    destinationId: 'margarita',
    destinationName: 'Isla de Margarita',
    tagline: 'La Perla del Caribe: fortalezas, bahías y manglares',
    beats: [
      {
        id: 'bahia-pampatar',
        title: 'La Entrada a la Perla',
        subtitle: 'Bahía de Pampatar · Vista Aérea y Costera',
        altitude: '800 m · Vista Panorámica',
        description:
          'La bahía de Pampatar acoge a navegantes desde tiempos coloniales. Sus aguas serenas contrastan con la silueta de los cerros orientales y los antiguos muelles pesqueros que dieron origen al comercio de perlas.',
        fact: { label: 'Fundación', value: '1552' },
        image: '/images/destinations/margarita/01-bahia-pampatar.jpg',
        alt: 'Vista panorámica de la bahía y ciudad colonial de Pampatar en Isla de Margarita',
      },
      {
        id: 'castillo-san-carlos',
        title: 'El Bastión de Coral y Piedra',
        subtitle: 'Castillo San Carlos de Borromeo',
        altitude: 'Pampatar · Fortaleza Costera',
        description:
          'Erigido en 1662 con cantería de coral y piedra para resistir el asedio constante de corsarios y piratas caribeños. Sus cañones de bronce aún vigilan el horizonte azul de la bahía.',
        fact: { label: 'Construcción', value: 'Siglo XVII' },
        image: '/images/destinations/margarita/02-castillo-san-carlos-borromeo.jpg',
        alt: 'Castillo San Carlos de Borromeo con sus baluartes y cañones apuntando al mar',
      },
      {
        id: 'playa-el-agua',
        title: 'El Bulevar de Oro y Palmeras',
        subtitle: 'Playa El Agua · El clásico margariteño',
        altitude: 'Costa Norte · 4 km de frente marino',
        description:
          'Cuatro kilómetros ininterrumpidos de arena dorada orlados por miles de cocoteros y un oleaje atlántico generoso. Es la estampa playera más emblemática y querida de la isla.',
        fact: { label: 'Longitud', value: '4 kilómetros' },
        image: '/images/destinations/margarita/03-playa-el-agua.jpg',
        alt: 'Playa El Agua con su arena dorada, cocoteros y oleaje del mar Caribe',
      },
      {
        id: 'playa-parguito',
        title: 'El Santuario de las Olas',
        subtitle: 'Playa Parguito · Refugio de surf y fauna',
        altitude: 'Costa Noreste · Brisa Atlántica',
        description:
          'Famosa por sus rompientes y su ambiente joven y deportivo. Además de meca del surf en Venezuela, sus arenas son zona protegida donde desovan anualmente tortugas marinas laúd y carey.',
        fact: { label: 'Santuario', value: 'Tortugas marinas' },
        image: '/images/destinations/margarita/04-playa-parguito.jpg',
        alt: 'Playa Parguito con sus olas de surf y orilla verde esmeralda',
      },
      {
        id: 'laguna-la-restinga',
        title: 'Los Túneles de Manglar',
        subtitle: 'Parque Nacional Laguna de La Restinga',
        altitude: 'Istmo Central · Laberinto Acuático',
        description:
          'Se navega en peñero a través de túneles naturales formados por raíces de manglar rojo que se entrecruzan como arcos góticos sobre el agua calma. Un ecosistema que une las dos mitades de Margarita.',
        fact: { label: 'Superficie protegida', value: '18.860 ha' },
        image: '/images/destinations/margarita/05-laguna-la-restinga.jpg',
        alt: 'Bote navegando por el túnel de manglares de la Laguna de La Restinga',
      },
      {
        id: 'juan-griego',
        title: 'El Atardecer de Fuego',
        subtitle: 'Bahía de Juan Griego y Fortín de La Galera',
        altitude: 'Norte · Atardecer Crepuscular',
        description:
          'Desde lo alto de la colina del Fortín de La Galera se contempla cómo el sol se hunde lentamente en el mar, tiñendo el cielo y los peñeros anclados en la bahía de tonos púrpura, fuego y oro.',
        fact: { label: 'Tradición', value: 'Relatos de niños cronistas' },
        image: '/images/destinations/margarita/06-juan-griego-atardecer.jpg',
        alt: 'Atardecer dorado sobre la bahía de Juan Griego con botes pesqueros',
      },
      {
        id: 'castillo-santa-rosa',
        title: 'La Eminencia de La Asunción',
        subtitle: 'Castillo de Santa Rosa',
        altitude: 'Capital Colonial · Valle de Santa Lucía',
        description:
          'Dominando la histórica capital de La Asunción, esta fortaleza fue testigo del heroísmo patrio. En su calabozo oscuro estuvo prisionera Luisa Cáceres de Arismendi, símbolo indeleble de resistencia.',
        fact: { label: 'Heroína', value: 'Luisa Cáceres de Arismendi' },
        image: '/images/destinations/margarita/07-castillo-santa-rosa.jpg',
        alt: 'Fortaleza colonial de Santa Rosa en lo alto de La Asunción con vista al valle',
      },
      {
        id: 'basilica-del-valle',
        title: 'La Patrona de los Mares',
        subtitle: 'Basílica Menor de Nuestra Señora del Valle',
        altitude: 'El Valle del Espíritu Santo · Epicentro Espiritual',
        description:
          'El templo de estilo neogótico resguarda a la Virgen del Valle, la advocación mariana más antigua de Venezuela y protectora de marineros y pescadores de todo el oriente del país.',
        fact: { label: 'Festividad', value: '8 de Septiembre' },
        image: '/images/destinations/margarita/08-basilica-del-valle.jpg',
        alt: 'Fachada y torres neogóticas de la Basílica Menor de Nuestra Señora del Valle',
      },
      {
        id: 'peninsula-macanao',
        title: 'La Tierra Salvaje del Poniente',
        subtitle: 'Península de Macanao y Punta Arenas',
        altitude: 'Extremo Occidental · Paisaje Semiárido',
        description:
          'El otro rostro de Margarita: montañas de tierra roja, cardones gigantes y playas vírgenes donde el mar abierto golpea en silencio. Aquí habita la cotorra margariteña en libertad.',
        fact: { label: 'Fauna endémica', value: 'Cotorra cabeciamarilla' },
        image: '/images/destinations/margarita/09-peninsula-macanao.jpg',
        alt: 'Playa virgen y paisajes áridos de Punta Arenas en la Península de Macanao',
      },
      {
        id: 'playa-el-yaque',
        title: 'El Viento del Caribe',
        subtitle: 'Playa El Yaque · Meca Náutica Mundial',
        altitude: 'Costa Sur · Aguas Someras',
        description:
          'Un paraíso de brisas alisias constantes y aguas llanas y tibias que atrae a los mejores atletas de windsurf y kitesurf del mundo. Al frente se divisan las siluetas de las islas de Coche y Cubagua.',
        fact: { label: 'Deporte mundial', value: 'Windsurf & Kite' },
        image: '/images/destinations/margarita/10-playa-el-yaque.jpg',
        alt: 'Aguas calmas y cielo abierto al atardecer en Playa El Yaque',
      },
    ],
  },
  'medanos-de-coro': {
    destinationId: 'medanos-de-coro',
    destinationName: 'Médanos de Coro',
    tagline: 'El desierto que camina y la ciudad primada de América',
    beats: [
      {
        id: 'dunas-monumentales',
        title: 'Las Dunas Doradas',
        subtitle: 'Parque Nacional Médanos de Coro · Falcón',
        altitude: '40 m de Altura · Cresta Dunar',
        description:
          'Dunas colosales que se alzan hasta 40 metros sobre el nivel del mar. Ocupan el istmo que une Coro con la península de Paraguaná, formando el desierto arenoso más grande de la cuenca del Caribe.',
        fact: { label: 'Superficie', value: '91.280 ha' },
        image: '/images/destinations/medanos-de-coro/1.jpg',
        alt: 'Dunas doradas monumentales en el Parque Nacional Médanos de Coro',
      },
      {
        id: 'crestas-viento',
        title: 'Líneas en la Arena',
        subtitle: 'Erosión eólica constante · Vientos Alisios',
        altitude: 'Laderas de Barlovento · Desierto Vivo',
        description:
          'Los vientos alisios que soplan del este empujan sin descanso toneladas de arena fina, haciendo que las dunas avancen y cambien de silueta día tras día, creando patrones hipnóticos en la cresta.',
        fact: { label: 'Dinámica', value: 'Dunas en movimiento' },
        image: '/images/destinations/medanos-de-coro/2.jpg',
        alt: 'Ondulaciones y crestas de arena esculpidas por el viento en los Médanos de Coro',
      },
      {
        id: 'atardecer-desierto',
        title: 'El Atardecer de Cobre',
        subtitle: 'Crepúsculo en los Médanos · Luz Crepuscular',
        altitude: 'Cima de la Duna · Caída de la Tarde',
        description:
          'Al caer la tarde, la arena se enfría rápidamente y adquiere tonalidades de cobre, ocre y violeta. La inmensidad del horizonte hace que subir a la cresta sea como flotar en otro planeta.',
        fact: { label: 'Temperatura', value: 'Contraste térmico día/noche' },
        image: '/images/destinations/medanos-de-coro/3.jpg',
        alt: 'Atardecer dorado y sombras en el Parque Nacional Médanos de Coro',
      },
      {
        id: 'cujies-cardones',
        title: 'El Cují Sobreviviente',
        subtitle: 'Vegetación Xerófila · Bosque Espinoso',
        altitude: 'Borde de la Duna · Ecosistema Árido',
        description:
          'En los límites del arenal sobreviven el cují yaque, el yabillo y cardones columnares de raíces profundas capaces de resistir el enterramiento de la arena y meses de sequía implacable.',
        fact: { label: 'Flora nativa', value: 'Cují yaque & Cardonales' },
        image: '/images/destinations/medanos-de-coro/4.jpg',
        alt: 'Árbol de cují resistiendo en el paisaje árido de Falcón',
      },
      {
        id: 'inmensidad-dunar',
        title: 'La Gran Duna Móvil',
        subtitle: 'El corazón del campo dunar',
        altitude: 'Valle de Arena · Inmensidad',
        description:
          'Caminar por el centro del parque es una experiencia de silencio absoluto. La arena pura de origen marino se extiende hasta donde alcanza la vista, acariciada por una brisa marina eterna.',
        fact: { label: 'Creación parque', value: '1974' },
        image: '/images/destinations/medanos-de-coro/5.jpg',
        alt: 'Gran duna de arena dorada en los Médanos de Coro con cielo azul',
      },
      {
        id: 'calle-federacion',
        title: 'Santa Ana de Coro',
        subtitle: 'Calle Federación · Casco Histórico Colonial',
        altitude: 'Centro Colonial · Patrimonio Mundial UNESCO',
        description:
          'A los pies de los médanos se levanta la ciudad de Coro, fundada en 1527. Sus calles empedradas de bahareque y arcilla son el único ejemplo preservado del encuentro arquitectónico hispano-holandés.',
        fact: { label: 'Patrimonio UNESCO', value: 'Desde 1993' },
        image: '/images/destinations/medanos-de-coro/6.jpg',
        alt: 'Casas coloniales coloridas y calles empedradas en el casco histórico de Coro',
      },
      {
        id: 'catedral-coro',
        title: 'La Catedral Primada',
        subtitle: 'Catedral Basílica de Santa Ana de Coro',
        altitude: 'Plaza Bolívar de Coro',
        description:
          'Erigida en el siglo XVI, fue la primera sede episcopal de toda América del Sur (1531). Sus gruesos muros de calicanto y su torre campanario resistieron ataques de piratas ingleses y franceses.',
        fact: { label: 'Primer obispado', value: 'Año 1531' },
        image: '/images/destinations/medanos-de-coro/7.jpg',
        alt: 'Torre campanario y techos coloniales de la Catedral de Santa Ana de Coro',
      },
      {
        id: 'ventanas-hierro',
        title: 'Ventanas de Hierro',
        subtitle: 'La Casa de las Ventanas de Hierro · Siglo XVIII',
        altitude: 'Barrio Colonial de Coro',
        description:
          'Famosa por su majestuoso portal barroco de más de ocho metros de altura y sus rejas de hierro forjado traídas de Sevilla en el siglo XVIII. Una muestra cumbre de la riqueza señorial coriana.',
        fact: { label: 'Portal barroco', value: '8 metros de altura' },
        image: '/images/destinations/medanos-de-coro/8.jpg',
        alt: 'Portal barroco colonial de la Casa de las Ventanas de Hierro en Coro',
      },
      {
        id: 'vela-coro',
        title: 'Puerto Real de La Vela',
        subtitle: 'La Vela de Coro · Cuna de la Bandera Nacional',
        altitude: 'Costa Marina · Puerto Histórico',
        description:
          'El puerto que mira a Curazao y las Antillas. Aquí desembarcó el Generalísimo Francisco de Miranda el 3 de agosto de 1806 e izó por primera vez en tierra firme la bandera tricolor de Venezuela.',
        fact: { label: 'Hito patrio', value: 'Bandera Nacional (1806)' },
        image: '/images/destinations/medanos-de-coro/9.jpg',
        alt: 'Playa y aguas del puerto histórico de La Vela de Coro en Falcón',
      },
      {
        id: 'carretera-paraguana',
        title: 'El Asfalto entre Médanos',
        subtitle: 'Troncal 4 · El cruce hacia la Península de Paraguaná',
        altitude: 'Istmo de Paraguaná · Cinta Costera',
        description:
          'Una de las carreteras más singulares del mundo: la cinta de asfalto cruza el corazón del desierto donde los médanos cruzan el camino, abriendo el paso hacia los vientos de Paraguaná y el Cabo San Román.',
        fact: { label: 'Ruta', value: 'Coro ➔ Paraguaná' },
        image: '/images/destinations/medanos-de-coro/10.jpg',
        alt: 'Carretera asfaltada atravesando las dunas del Parque Nacional Médanos de Coro',
      },
    ],
  },
  'catatumbo': {
    destinationId: 'catatumbo',
    destinationName: 'Relámpago del Catatumbo',
    tagline: 'La fábrica eterna de ozono y el faro de los navegantes',
    beats: [
      {
        id: 'rayo-monumental',
        title: 'La Tormenta Perpetua',
        subtitle: 'Cuenca del Lago de Maracaibo · Zulia',
        altitude: 'Vista Nocturna · Cielo en Llamas',
        description:
          'El fenómeno meteorológico más singular del planeta: hasta 250 rayos por kilómetro cuadrado al año y tormentas continuas de hasta 10 horas durante 260 noches al año. Récord Guinness Mundial absoluto.',
        fact: { label: 'Récord Guinness', value: '250 rayos/km²/año' },
        image: '/images/destinations/catatumbo/1.jpg',
        alt: 'Impresionante rayo del Catatumbo bifurcado iluminando el cielo y el agua',
      },
      {
        id: 'palafitos-ologa',
        title: 'Los Palafitos de Ologá',
        subtitle: 'Poblado lacustre sobre estacas de madera',
        altitude: 'Delta del Catatumbo · Agua y Madera',
        description:
          'Una aldea que no pisa tierra firme: las casas de madera descansan sobre pilotes clavados en el fondo del lago. Los niños aprenden a remar antes que a caminar y duermen bajo la luz intermitente de los relámpagos.',
        fact: { label: 'Arquitectura', value: 'Palafitos indígenas' },
        image: '/images/destinations/catatumbo/2.jpg',
        alt: 'Casas de palafitos sobre estacas de madera en el pueblo lacustre de Ologá',
      },
      {
        id: 'congo-mirador',
        title: 'Congo Mirador · El Pueblo de Agua',
        subtitle: 'Ciénagas de Juan Manuel · Vida Lacustre',
        altitude: 'Nivel del Lago · Calles de Agua',
        description:
          'Construido en el corazón de las ciénagas, aquí no hay caminos ni aceras: solo canales de agua donde los botes peñeros hacen las veces de autobús escolar y transporte de víveres.',
        fact: { label: 'Transporte', value: '100% botes y canoas' },
        image: '/images/destinations/catatumbo/3.jpg',
        alt: 'Palafitos de colores sobre el agua en el pueblo de Congo Mirador',
      },
      {
        id: 'atardecer-lago',
        title: 'El Atardecer de Fuego',
        subtitle: 'Lago de Maracaibo · La calma antes de la tempestad',
        altitude: 'Horizonte Lacustre · Crepúsculo',
        description:
          'Al caer el sol, el Lago de Maracaibo se convierte en un espejo inmenso de tonos violetas y dorados. Los pescadores regresan a sus muelles mientras las primeras nubes de tormenta empiezan a agruparse en el sur.',
        fact: { label: 'Superficie lago', value: '13.210 km²' },
        image: '/images/destinations/catatumbo/4.jpg',
        alt: 'Atardecer cálido y cielo dorado reflejado sobre el Lago de Maracaibo',
      },
      {
        id: 'comunidad-ologa',
        title: 'La Comunidad entre Ciénagas',
        subtitle: 'Pueblos de agua y memoria warao y añú',
        altitude: 'Humedales del Sur del Lago',
        description:
          'Herederos de los pueblos indígenas añú («gente de agua»), estas comunidades han vivido en simbiosis con el lago durante siglos, guiándose por el ciclo del agua, las mareas y el relámpago.',
        fact: { label: 'Pueblo originario', value: 'Añú (paraujano)' },
        image: '/images/destinations/catatumbo/5.jpg',
        alt: 'Vista comunitaria de las casas palafíticas de Ologá en el Zulia',
      },
      {
        id: 'cienagas-juan-manuel',
        title: 'Ciénagas de Juan Manuel',
        subtitle: 'Parque Nacional de Pantanos y Selva Flotante',
        altitude: 'Humedal Protegido · Biodiversidad',
        description:
          'Un inmenso laberinto de bosque húmedo, palmeras de moriche y manglares donde el gas metano emanado de la descomposición vegetal alimenta las cargas electrostáticas del relámpago.',
        fact: { label: 'Protección', value: 'Parque Nacional (1991)' },
        image: '/images/destinations/catatumbo/6.jpg',
        alt: 'Humedales y vegetación exuberante de las ciénagas del Catatumbo',
      },
      {
        id: 'faro-navegantes',
        title: 'El Faro de Maracaibo',
        subtitle: 'El centinela silencioso de los mares',
        altitude: 'Horizonte Nocturno · Resplandor Eléctrico',
        description:
          'Durante siglos, piratas y marineros coloniales usaron el resplandor nocturno del Catatumbo para navegar el Caribe sin brújula. En 1595, sus destellos revelaron la flota del corsario inglés Francis Drake, salvando a Maracaibo.',
        fact: { label: 'Defensa histórica', value: 'Aviso contra Drake (1595)' },
        image: '/images/destinations/catatumbo/7.jpg',
        alt: 'Cielo nocturno iluminado por un potente haz de relámpago del Catatumbo',
      },
      {
        id: 'pesca-artesanal',
        title: 'Faena en el Espejo de Agua',
        subtitle: 'Pescadores de cangrejo azul y corvina',
        altitude: 'Amanecer · Aguas del Catatumbo',
        description:
          'Con las primeras luces del alba, el estruendo cesa y los pescadores echan sus redes en busca de cangrejo azul y bocachico en un lago que recobra una serenidad casi mística.',
        fact: { label: 'Pesquería', value: 'Cangrejo azul del Zulia' },
        image: '/images/destinations/catatumbo/8.jpg',
        alt: 'Bote de pescadores navegando sobre las aguas tranquilas del Lago de Maracaibo',
      },
      {
        id: 'nubes-tempestad',
        title: 'Las Torres de Cúmulonimbos',
        subtitle: 'Termodinámica única · El choque de vientos',
        altitude: '12.000 m de Altura en la Atmósfera',
        description:
          'Los vientos cálidos del lago chocan contra los muros gigantes de la Cordillera de los Andes y la Sierra de Perijá, forzando al aire a elevarse verticalmente y desatar la mayor fábrica de ozono del planeta.',
        fact: { label: 'Impacto ambiental', value: 'Regenerador de ozono' },
        image: '/images/destinations/catatumbo/9.jpg',
        alt: 'Nubes de tormenta y relámpago fugaz en el horizonte del Catatumbo',
      },
      {
        id: 'puente-general-urdaneta',
        title: 'El Coloso sobre el Lago',
        subtitle: 'Puente General Rafael Urdaneta',
        altitude: 'Estrecho de Maracaibo · Conexión Vital',
        description:
          'Con más de 8,6 kilómetros de longitud, el Puente sobre el Lago es el ícono indiscutible del Zulia. De noche, mira hacia el sur del lago donde la silueta del Catatumbo ilumina el horizonte.',
        fact: { label: 'Longitud', value: '8.678 metros' },
        image: '/images/destinations/catatumbo/10.jpg',
        alt: 'Vista monumental del Puente General Rafael Urdaneta sobre el Lago de Maracaibo',
      },
    ],
  },
  'sierra-nevada': {
    destinationId: 'sierra-nevada',
    destinationName: 'Sierra Nevada de Mérida',
    tagline: 'El techo de Venezuela: glaciares, páramos y pueblos de piedra',
    beats: [
      {
        id: 'pico-bolivar',
        title: 'El Techo de Venezuela',
        subtitle: 'Pico Bolívar · La cumbre máxima del país',
        altitude: '4.978 m s. n. m. · Cumbres Andinas',
        description:
          'La mayor altitud de la geografía venezolana. Un coloso de roca metamórfica y niebla perpetua que corona la Cordillera de Mérida. Desde su cresta afilada se contempla el abismo hacia los llanos y la cuenca del lago.',
        fact: { label: 'Altura máxima', value: '4.978 metros' },
        image: '/images/destinations/sierra-nevada/1.jpg',
        alt: 'Paredes rocosas imponentes del Pico Bolívar visto desde el Pico El Toro en Mérida',
      },
      {
        id: 'teleferico-mukumbaru',
        title: 'El Vuelo de Mukumbarí',
        subtitle: 'Teleférico de Mérida · Estación Pico Espejo',
        altitude: '4.765 m s. n. m. · El más alto del mundo',
        description:
          'Cuatro tramos y 12,5 kilómetros de recorrido por cable que conectan la ciudad de Mérida con el Pico Espejo. Al descender en la última estación, el aire helado y la estatua de la Virgen de las Nieves reciben a los viajeros.',
        fact: { label: 'Trayecto', value: '12,5 km por cable' },
        image: '/images/destinations/sierra-nevada/2.jpg',
        alt: 'Estación de alta montaña Pico Espejo del teleférico Mukumbarí con vista a los picos',
      },
      {
        id: 'laguna-mucubaji',
        title: 'El Espejo Glaciar de Mucubají',
        subtitle: 'Parque Nacional Sierra Nevada · Alta Montaña',
        altitude: '3.550 m s. n. m. · Páramo Andino',
        description:
          'Una laguna de origen glaciar formada hace más de diez mil años tras el retroceso de los hielos pleistocenos. En sus aguas frías y quietas nadan truchas arcoíris bajo el vuelo silencioso de los patos parameros.',
        fact: { label: 'Origen', value: 'Glaciar cuaternario' },
        image: '/images/destinations/sierra-nevada/3.jpg',
        alt: 'Laguna de Mucubají con aguas cristalinas rodeada de montañas y frailejones',
      },
      {
        id: 'paramo-frailejones',
        title: 'El Santuario de los Frailejones',
        subtitle: 'Páramo de Mifafí · Bosque de terciopelo andino',
        altitude: '3.800 m s. n. m. · Viento y Niebla',
        description:
          'Millones de frailejones (Espeletia schultzii) cubren las laderas como soldados de hojas afelpadas. Sus troncos retienen el agua de la neblina para alimentar los ríos que bajan a regar los valles agrícolas.',
        fact: { label: 'Flora endémica', value: 'Frailejón andino' },
        image: '/images/destinations/sierra-nevada/4.jpg',
        alt: 'Laderas cubiertas de frailejones bajo la niebla densa del páramo andino',
      },
      {
        id: 'laguna-negra',
        title: 'El Misterio de la Laguna Negra',
        subtitle: 'Valle glaciar oculto entre bosques de altura',
        altitude: '3.470 m s. n. m. · Aguas Profundas',
        description:
          'Encajonada entre laderas escarpadas cubiertas de pinos y coloradillos, el color casi azabache de sus aguas se debe a su gran profundidad y a los sedimentos orgánicos. Un enclave de silencio sobrecogedor.',
        fact: { label: 'Profundidad', value: '+24 metros' },
        image: '/images/destinations/sierra-nevada/5.jpg',
        alt: 'Aguas oscuras y profundas de la Laguna Negra rodeada de bosque andino y cumbres',
      },
      {
        id: 'pico-humboldt',
        title: 'El Centinela de La Corona',
        subtitle: 'Pico Humboldt · Segunda cumbre de Venezuela',
        altitude: '4.940 m s. n. m. · Glaciar Relicto',
        description:
          'La segunda montaña más alta del país albergó hasta fecha reciente el Glaciar La Corona. Su silueta piramidal desafía a los alpinistas en una de las rutas de travesía más exigentes de los Andes.',
        fact: { label: 'Segunda cumbre', value: '4.940 metros' },
        image: '/images/destinations/sierra-nevada/6.jpg',
        alt: 'Pico Humboldt con sus paredes rocosas y restos del glaciar bajo el cielo azul',
      },
      {
        id: 'los-nevados',
        title: 'El Pueblo Detenido en el Tiempo',
        subtitle: 'Los Nevados · Tradición agrícola entre nubes',
        altitude: '2.710 m s. n. m. · Valle Aislado',
        description:
          'Aislado en la vertiente sur de la Sierra Nevada, se llega a pie, en mula o en rústicos 4x4. Sus casas de bahareque blanco con techos de teja roja conservan la calma campesina de hace dos siglos.',
        fact: { label: 'Acceso', value: 'Camino de herradura' },
        image: '/images/destinations/sierra-nevada/7.jpg',
        alt: 'Casas coloniales de adobe y tejas rojas en el pueblo andino de Los Nevados',
      },
      {
        id: 'capilla-de-piedra',
        title: 'El Templo de Piedra',
        subtitle: 'Capilla de San Rafael de Mucuchíes · Juan Félix Sánchez',
        altitude: '3.140 m s. n. m. · Fe y Arte Popular',
        description:
          'Levantada piedra sobre piedra sin una gota de cemento por el místico campesino y artista Juan Félix Sánchez en honor a la Virgen de Coromoto. Una obra de devoción pura tallada con los cantos rodados del páramo.',
        fact: { label: 'Constructor', value: 'Juan Félix Sánchez' },
        image: '/images/destinations/sierra-nevada/8.jpg',
        alt: 'Capilla de piedra artesanal construida a mano en San Rafael de Mucuchíes',
      },
      {
        id: 'collado-del-condor',
        title: 'El Vuelo del Cóndor',
        subtitle: 'Collado del Cóndor (Pico El Águila) · El paso más alto',
        altitude: '4.118 m s. n. m. · Carretera Trasandina',
        description:
          'El paso vial asfaltado más elevado de Venezuela. Coronando la cumbre se encuentra el célebre monumento al Cóndor de los Andes, conmemorando el paso del ejército del Libertador Simón Bolívar en 1813.',
        fact: { label: 'Punto más alto', value: 'Troncal 7 (4.118 m)' },
        image: '/images/destinations/sierra-nevada/9.jpg',
        alt: 'Monumento del Cóndor de las Cinco Águilas Blancas en el Collado del Cóndor a más de 4.000 m',
      },
      {
        id: 'catedral-merida-sierra',
        title: 'La Ciudad de los Caballeros',
        subtitle: 'Catedral Basílica de la Inmaculada Concepción',
        altitude: 'Valle del Chama · 1.630 m s. n. m.',
        description:
          'En el corazón de Mérida se alza esta catedral de estilo ecléctico inspirada en la de Toledo, con sus vidrieras y cúpulas enmarcadas por la silueta eterna de las Cinco Águilas Blancas en el horizonte.',
        fact: { label: 'Fundación', value: 'Santiago de los Caballeros (1558)' },
        image: '/images/destinations/sierra-nevada/10.jpg',
        alt: 'Catedral Basílica de la Inmaculada Concepción en la Plaza Bolívar de Mérida',
      },
    ],
  },
  'los-llanos': {
    destinationId: 'los-llanos',
    destinationName: 'Los Llanos',
    tagline: 'Donde el horizonte no termina: fauna, sabanas y alma llanera',
    beats: [
      {
        id: 'sabana-capanaparo',
        title: 'El Horizonte Infinito',
        subtitle: 'Sabanas del Capanaparo · Bajo Apure',
        altitude: 'Nivel de la Sabana · Llanura Abierta',
        description:
          'Una inmensa llanura que cubre casi un tercio de Venezuela. Durante los meses de sequía es una alfombra dorada; en temporada de lluvias se transforma en un mar interior de agua dulce donde pastan rebaños bajo un cielo sin fronteras.',
        fact: { label: 'Territorio', value: '≈ 1/3 de Venezuela' },
        image: '/images/destinations/los-llanos/1.jpg',
        alt: 'Inmensa sabana abierta de Capanaparo en el estado Apure',
      },
      {
        id: 'llanero-caballo',
        title: 'El Centauro y la Faena',
        subtitle: 'El caballo criollo y el canto de arreo',
        altitude: 'Hatos de Apure · Tierra y Agua',
        description:
          'El jinete llanero, descalzo y diestro con el lazo, arrea el ganado a través de ríos y esteros al compás de los cantos de arreo y ordeño, una de las tradiciones orales más puras de América, protegida por la UNESCO.',
        fact: { label: 'Patrimonio UNESCO', value: 'Cantos de trabajo (2017)' },
        image: '/images/destinations/los-llanos/2.jpg',
        alt: 'Caballo criollo llanero y jinete durante la faena en las sabanas de Apure',
      },
      {
        id: 'chiguires-estero',
        title: 'El Señor de los Esteros',
        subtitle: 'Chigüires y garzas en los humedales',
        altitude: 'Esteros de Camaguán y Apure',
        description:
          'El chigüire (Hydrochoerus hydrochaeris) es el roedor más grande del planeta. Gregario y pacífico, convive en manadas de decenas de individuos en lagunas someras, compartiendo la orilla con garzas reales y cotúas.',
        fact: { label: 'Peso adulto', value: 'Hasta 65 kg' },
        image: '/images/destinations/los-llanos/3.jpg',
        alt: 'Manada de chigüires descansando en el agua con aves en la llanura venezolana',
      },
      {
        id: 'caiman-orinoco',
        title: 'El Dragón de los Caños',
        subtitle: 'Caimán del Orinoco · Uno de los mayores reptiles del mundo',
        altitude: 'Refugio de Fauna Caño Guaritico',
        description:
          'Alcanzando hasta seis metros de longitud, es el reptil cumbre de la cuenca orinoquense. Críticamente amenazado, hoy sobrevive en santuarios y hatos conservacionistas de Apure gracias a programas de cría y reintroducción.',
        fact: { label: 'Longitud máxima', value: 'Hasta 6 metros' },
        image: '/images/destinations/los-llanos/4.jpg',
        alt: 'Caimán del Orinoco en la orilla de un caño de agua en los Llanos',
      },
      {
        id: 'corocoras-rojas',
        title: 'La Nube Escarlata',
        subtitle: 'Corocoras Rojas (Eudocimus ruber) en pleno vuelo',
        altitude: 'Vuelo Crepuscular · Humedales del Llano',
        description:
          'Al caer la tarde, miles de corocoras escarlatas se reúnen para dormir en los manglares de agua dulce. Su plumaje rojo fuego, adquirido por su dieta rica en crustáceos, enciende el cielo llanero en una postal inolvidable.',
        fact: { label: 'Coloración', value: 'Carotenoides de crustáceos' },
        image: '/images/destinations/los-llanos/5.jpg',
        alt: 'Corocoro colorado o ibis escarlata con plumaje rojo brillante en los Llanos',
      },
      {
        id: 'morichales-sur',
        title: 'El Árbol de la Vida',
        subtitle: 'Morichales y bosques de galería',
        altitude: 'Manantiales y Caños · Oasis de Palma',
        description:
          'Las palmas de moriche (Mauritia flexuosa) marcan los cursos de agua subterránea. Sus frutos alimentan aves y mamíferos, y sus troncos filtran manantiales de agua cristalina en medio del calor de la sabana.',
        fact: { label: 'Ecosistema', value: 'Palma sagrada indígena' },
        image: '/images/destinations/los-llanos/6.jpg',
        alt: 'Bosque de palmas de moriche en los llanos del sur venezolano',
      },
      {
        id: 'rio-apure',
        title: 'La Gran Vía Fluvial',
        subtitle: 'Río Apure · La arteria de los Llanos',
        altitude: 'Riberas de San Fernando de Apure',
        description:
          'El río Apure recoge las aguas que bajan de los Andes y las lleva hacia el gran Orinoco. Por sus aguas transitan gabarras, canoas de pescadores de pavón y bagre rayado, y una biodiversidad ribereña sin igual.',
        fact: { label: 'Longitud cuenca', value: '1.038 km' },
        image: '/images/destinations/los-llanos/7.jpg',
        alt: 'Aguas del Río Apure bajo el cielo azul con vegetación de ribera',
      },
      {
        id: 'oso-palmero',
        title: 'El Gigante Insectívoro',
        subtitle: 'Oso Palmero u Oso Hormiguero Gigante',
        altitude: 'Pastizales y Sabanas Altas',
        description:
          'Con su cola tupida como una hoja de palma y su lengua de sesenta centímetros, el oso palmero (Myrmecophaga tridactyla) patrulla los termiteros de la sabana en busca de hormigas y termes.',
        fact: { label: 'Dieta diaria', value: 'Hasta 30.000 hormigas' },
        image: '/images/destinations/los-llanos/8.jpg',
        alt: 'Oso hormiguero gigante u oso palmero caminando por la sabana llanera',
      },
      {
        id: 'puesta-sol-apure',
        title: 'El Crepúsculo en el Hato',
        subtitle: 'La calma de la tarde en la casona llanera',
        altitude: 'Bajo Apure · Fin de la Jornada',
        description:
          'Al esconderse el sol, los caballos descansan en el corral y en los corredores de la casona se afinan el cuatro y las maracas. El joropo llanero resuena como la voz viva de la sabana.',
        fact: { label: 'Música', value: 'Arpa · Cuatro · Maracas' },
        image: '/images/destinations/los-llanos/9.jpg',
        alt: 'Puesta de sol en Apure con sombras de palmeras y cielo dorado',
      },
      {
        id: 'horizonte-crepuscular',
        title: 'El Fuego del Horizonte',
        subtitle: 'El atardecer más amplio de Venezuela',
        altitude: 'Límite de Apure y Guárico · Cielo Infinito',
        description:
          'No hay montañas que tapen la vista: el sol desciende como un disco incandescente sobre el agua mansa de los esteros, confirmando por qué a esta tierra se le llama el horizonte que nunca termina.',
        fact: { label: 'Atmósfera', value: 'Visibilidad total 360°' },
        image: '/images/destinations/los-llanos/10.jpg',
        alt: 'Atardecer de tonos rojizos sobre el río y el horizonte llano',
      },
    ],
  },
  'delta-orinoco': {
    destinationId: 'delta-orinoco',
    destinationName: 'Delta del Orinoco',
    tagline: 'La tierra de la gente de las canoas y el gran abanico atlántico',
    beats: [
      {
        id: 'canos-laberinto',
        title: 'El Laberinto Verde',
        subtitle: 'Delta Amacuro · El gran abanico fluvial',
        altitude: 'Vista Fluvial · 40.000 km² de Selva Inundada',
        description:
          'Antes de fundirse con el Océano Atlántico, el Orinoco se disuelve en más de trescientos caños, ríos e islas de manglar. Un delta vivo que crece diariamente con las arenas traídas desde las cumbres de los Andes.',
        fact: { label: 'Extensión deltaica', value: '≈ 40.000 km²' },
        image: '/images/destinations/delta-orinoco/1.jpg',
        alt: 'Caños fluviales y selva virgen en el Delta del Orinoco',
      },
      {
        id: 'warao-curiara',
        title: 'La Gente de la Canoa',
        subtitle: 'Pueblo Originario Warao · Navegantes Milenarios',
        altitude: 'Canoa Curiara · Riberas del Delta',
        description:
          '«Wa-rao» significa literalmente «gente de la canoa». Talladas en una sola pieza de tronco de cachicamo o sasafrás, las curiaras son el hogar, el mercado y el medio de vida esencial para cada familia deltaica.',
        fact: { label: 'Pueblo originario', value: 'Warao' },
        image: '/images/destinations/delta-orinoco/2.jpg',
        alt: 'Indígenas warao navegando en curiara tradicional de madera por el Delta Amacuro',
      },
      {
        id: 'palafitos-janoko',
        title: 'El Janoko sobre el Agua',
        subtitle: 'Vivienda tradicional sin paredes sobre pilotes de madera',
        altitude: 'Orillas Fluviales · Arquitectura Lacustre',
        description:
          'Construidas sobre pilotes de madera dura para resistir las subidas y bajadas diarias de la marea atlántica («la llena» y «la seca»). Sin paredes y techadas con palma temiche, están abiertas a la brisa y al río.',
        fact: { label: 'Techo tradicional', value: 'Palma temiche' },
        image: '/images/destinations/delta-orinoco/3.jpg',
        alt: 'Viviendas palafíticas janoko construidas sobre el agua en el Delta del Orinoco',
      },
      {
        id: 'curso-fluvial-orinoco',
        title: 'El Río Padre',
        subtitle: 'Cuenca del Orinoco · La corriente marrón de Gracia',
        altitude: 'Gran Curso de Agua · 2.140 km de recorrido',
        description:
          'El tercer río más caudaloso del mundo. En 1498, Cristóbal Colón se topó con esta gigantesca masa de agua dulce en pleno océano y concluyó que tal caudal solo podía manar del Paraíso Terrenal.',
        fact: { label: 'Caudal promedio', value: '33.000 m³/s' },
        image: '/images/destinations/delta-orinoco/4.jpg',
        alt: 'Aguas caudalosas y vegetación de ribera en la cuenca del Orinoco',
      },
      {
        id: 'reserva-biosfera',
        title: 'La Catedral de la Biosfera',
        subtitle: 'Reserva de Biosfera Delta del Orinoco (UNESCO)',
        altitude: 'Parque Nacional Mariusa · Selva Tropical Virgen',
        description:
          'Protegida como Reserva de Biosfera, alberga uno de los ecosistemas más prístinos y biodiversos de América Latina, donde la selva de pantano convive con jaguares, manatíes y nutrias gigantes.',
        fact: { label: 'Protección UNESCO', value: 'Reserva de Biosfera' },
        image: '/images/destinations/delta-orinoco/5.jpg',
        alt: 'Frondoso dosel de selva tropical protegida en el Delta del Orinoco',
      },
      {
        id: 'artesania-moriche',
        title: 'El Hilo de la Selva',
        subtitle: 'Artesanía Warao en Fibra de Moriche',
        altitude: 'Tradición Ancestral Femenina',
        description:
          'Las mujeres warao extraen las fibras tiernas de la palma moriche, las hierven y las hilan contra su pierna para tejer chinchorros, cestas y figuras de animales. Cada tejido guarda cantos y mitos ancestrales.',
        fact: { label: 'Materia prima', value: 'Fibra de palma moriche' },
        image: '/images/destinations/delta-orinoco/6.jpg',
        alt: 'Manos artesanas warao tejiendo con fibras naturales de moriche',
      },
      {
        id: 'vuelo-aves-delta',
        title: 'El Dosel Alado',
        subtitle: 'Corocoras, tucanes y guacamayas al atardecer',
        altitude: 'Vuelo sobre los Caños · Ornitología',
        description:
          'Al caer la tarde, el silencio del río se rompe con el graznido de miles de loros, guacamayas rojas y bandadas de corocoras que vuelan en formación sobre el agua en busca de sus dormideros en los manglares.',
        fact: { label: 'Avifauna', value: '+350 especies de aves' },
        image: '/images/destinations/delta-orinoco/7.jpg',
        alt: 'Vuelo de corocoras y aves sobre las aguas del Delta del Orinoco al atardecer',
      },
      {
        id: 'canales-fluviales',
        title: 'Navegando el Silencio',
        subtitle: 'Caños angostos y túneles de vegetación',
        altitude: 'Exploración en Bote · Aguas Mansas',
        description:
          'Navegar por los caños secundarios es adentrarse en un túnel de lianas, orquídeas y helechos gigantes donde la luz del sol se filtra en rayos dorados y solo se escucha el salto de los peces en el agua.',
        fact: { label: 'Vías de transporte', value: '100% fluviales' },
        image: '/images/destinations/delta-orinoco/8.jpg',
        alt: 'Canal fluvial de aguas tranquilas entre vegetación tropical densa',
      },
      {
        id: 'manglares-gigantes',
        title: 'Los Muros del Atlántico',
        subtitle: 'Manglares rojos de hasta 30 metros de altura',
        altitude: 'Costa Marina · Barrera Ecológica',
        description:
          'Las raíces zancudas del mangle rojo (Rhizophora mangle) forman murallas vivas que fijan el suelo y protegen el continente de las marejadas del Atlántico, sirviendo de cuna para la fauna marina.',
        fact: { label: 'Altura manglar', value: 'Hasta 30 metros' },
        image: '/images/destinations/delta-orinoco/9.jpg',
        alt: 'Raíces y copas de manglares en la ribera del Delta del Orinoco',
      },
      {
        id: 'atardecer-atlantico',
        title: 'El Encuentro con el Océano',
        subtitle: 'Boca Grande · La desembocadura en el Atlántico',
        altitude: 'Frente Oceánico · Luz Crepuscular',
        description:
          'El viaje culmina donde el río se hace mar. Con el sol poniéndose a las espaldas de la selva, el Orinoco tiñe el Atlántico de tonos ámbar y oro en la más grandiosa despedida de agua dulce del continente.',
        fact: { label: 'Salida al mar', value: 'Océano Atlántico' },
        image: '/images/destinations/delta-orinoco/10.jpg',
        alt: 'Atardecer de oro sobre las aguas fluviales del Delta del Orinoco',
      },
    ],
  },
  'canaima': {
    destinationId: 'canaima',
    destinationName: 'Gran Canaima',
    tagline: 'Aguas color de té, saltos atronadores y el reino de los tepuyes',
    beats: [
      {
        id: 'laguna-canaima',
        title: 'El Espejo de los Tepuyes',
        subtitle: 'Laguna de Canaima · Parque Nacional Canaima',
        altitude: 'Laguna Glaciar · Arenas Rosadas',
        description:
          'Una laguna mística de aguas rojizas y ambarinas, teñidas naturalmente por los taninos de la vegetación selvática descompuesta. En el horizonte se recortan las siluetas milenarias de los tepuyes Kuravaina, Kusari y Venado.',
        fact: { label: 'Agua ambarina', value: 'Taninos naturales' },
        image: '/images/destinations/canaima/1.jpg',
        alt: 'Laguna de Canaima con aguas rojizas y tepuyes en el horizonte',
      },
      {
        id: 'salto-el-sapo',
        title: 'El Paso tras la Cortina',
        subtitle: 'Salto El Sapo · Sendero de roca viva',
        altitude: 'Río Carrao · Cortina de Agua Atronadora',
        description:
          'Una de las experiencias más intensas del planeta: un sendero excavado en la roca viva permite caminar literalmente por detrás de la gigantesca cortina de agua que cae con furia estruendosa sobre el abismo.',
        fact: { label: 'Aventura', value: 'Caminar tras la cascada' },
        image: '/images/destinations/canaima/2.jpg',
        alt: 'Salto El Sapo con su impresionante caída de agua y sendero de roca en Canaima',
      },
      {
        id: 'salto-el-hacha',
        title: 'El Rugido de El Hacha',
        subtitle: 'Salto El Hacha · La cascada mayor de la laguna',
        altitude: 'Laguna de Canaima · Muralla de Agua',
        description:
          'El salto más caudaloso y estruendoso de la orilla norte. Sus aguas se precipitan en una media luna perfecta levantando nubes de rocío que cruzan la laguna impulsadas por la brisa selvática.',
        fact: { label: 'Ecosistema', value: 'Caída de agua dulce' },
        image: '/images/destinations/canaima/3.jpg',
        alt: 'Salto El Hacha con su potente chorro de agua cayendo en la Laguna de Canaima',
      },
      {
        id: 'salto-golondrina',
        title: 'Las Cascadas Hermanas',
        subtitle: 'Salto Golondrina y Salto Wadaima',
        altitude: 'Borde Occidental de la Laguna',
        description:
          'Hilera de cascadas alimentadas por el río Carrao que se derraman en cascadas paralelas sobre las arenas rosadas de cuarzo, formando pozas donde las golondrinas anidan en las paredes húmedas.',
        fact: { label: 'Arenas', value: 'Cuarzo rosado puro' },
        image: '/images/destinations/canaima/4.jpg',
        alt: 'Salto Golondrina visto desde la orilla de la Laguna de Canaima',
      },
      {
        id: 'rio-carrao-curiara',
        title: 'La Travesía del Carrao',
        subtitle: 'Navegación en curiara pemón río arriba',
        altitude: 'Corrientes Fluviales · Río Carrao',
        description:
          'Las curiaras de madera motorizadas son el único vehículo capaz de remontar el río Carrao. Los expertos pilotos pemones conocen cada piedra y corriente para sortear los rápidos con maestría absoluta.',
        fact: { label: 'Pilotos', value: 'Guías pemones locales' },
        image: '/images/destinations/canaima/5.jpg',
        alt: 'Curiara navegando por las aguas del Río Carrao en Canaima',
      },
      {
        id: 'auyantepuy-mirador',
        title: 'El Coloso Auyantepuy',
        subtitle: 'Vista del Auyantepuy desde el río Carrao',
        altitude: 'La Montaña del Diablo · 700 km² de meseta',
        description:
          'Con una superficie superior a la isla de Margarita, el Auyantepuy es el tepuy más extenso de la Tierra. Sus paredes verticales de arenisca rosa encierran cañones profundos donde nace el Salto Ángel.',
        fact: { label: 'Meseta cumbre', value: '≈ 700 km²' },
        image: '/images/destinations/canaima/6.jpg',
        alt: 'Paredes monumentales del Auyantepuy alzándose sobre la selva de Canaima',
      },
      {
        id: 'pueblo-pemon',
        title: 'Los Hijos del Sol: Pemón',
        subtitle: 'Cultura ancestral Pemón Kamarakoto',
        altitude: 'Comunidad Indígena de Canaima',
        description:
          'Los pemones habitan este territorio desde tiempos inmemoriales. Su cosmovisión considera a los tepuyes las casas de los espíritus mawari y mantienen vivos sus dialectos, cantos y gastronomía de casabe y kachiri.',
        fact: { label: 'Etnia', value: 'Pemón (Kamarakoto)' },
        image: '/images/destinations/canaima/7.jpg',
        alt: 'Playa y aguas de la Laguna de Canaima frente al poblado indígena pemón',
      },
      {
        id: 'expedicion-canoa',
        title: 'Rumbo al Cañón del Churún',
        subtitle: 'Expedición fluvial hacia la garganta selvática',
        altitude: 'Aguas del Carrao y Churún',
        description:
          'El viaje fluvial se interna en el corazón de la selva virgen. Las aguas rojizas reflejan las copas de los árboles gigantes mientras el rugido de la selva y las cascadas lejanas marcan el camino.',
        fact: { label: 'Acceso', value: 'Expedición fluvial' },
        image: '/images/destinations/canaima/8.jpg',
        alt: 'Nuestra canoa navegando las aguas abiertas del Río Carrao hacia los tepuyes',
      },
      {
        id: 'vista-aerea-parque',
        title: 'El Escudo Guayanés',
        subtitle: 'La formación geológica más antigua del planeta',
        altitude: '1.500 m · Perspectiva Aérea',
        description:
          'Desde el aire se comprende la magnitud de Canaima: tres millones de hectáreas de mesetas tabulares de roca precámbrica con más de dos mil millones de años de antigüedad, anteriores a los dinosaurios.',
        fact: { label: 'Antigüedad roca', value: '2.000 millones de años' },
        image: '/images/destinations/canaima/9.jpg',
        alt: 'Vista aérea espectacular del Parque Nacional Canaima con ríos y mesetas selváticas',
      },
      {
        id: 'atardecer-canaima',
        title: 'El Ocaso de los Dioses',
        subtitle: 'Crepúsculo dorado sobre la Laguna de Canaima',
        altitude: 'Laguna de Canaima · Luz Crepuscular',
        description:
          'Cuando el sol se despide tras los tepuyes, el vapor de las cascadas se vuelve dorado y la laguna se apaga en un tono cobrizo profundo. Una escena que parece salida del primer día de la Creación.',
        fact: { label: 'Patrimonio Mundial', value: 'UNESCO 1994' },
        image: '/images/destinations/canaima/10.jpg',
        alt: 'Atardecer sobre las aguas y saltos de la Laguna de Canaima',
      },
    ],
  },
  'salto-angel': {
    destinationId: 'salto-angel',
    destinationName: 'Salto Ángel',
    tagline: 'Kerepakupai Vená: el salto de agua más alto del planeta',
    beats: [
      {
        id: 'kerepakupai-vena-completo',
        title: 'El Gigante de la Tierra',
        subtitle: 'Kerepakupai Vená · 979 metros de caída vertical',
        altitude: '979 m de Caída · Vista Frontal',
        description:
          'La cascada ininterrumpida más alta del mundo. Se desprende desde la cima del inmenso Auyantepuy con 807 metros de caída libre absoluta sin rozar la roca. En la lengua pemón significa «el salto del lugar más profundo».',
        fact: { label: 'Caída ininterrumpida', value: '807 metros libres' },
        image: '/images/destinations/salto-angel/1.jpg',
        alt: 'Vista frontal majestuosa del Salto Ángel cayendo desde el Auyantepuy en Canaima',
      },
      {
        id: 'mirador-laime',
        title: 'El Mirador de Laime',
        subtitle: 'Isla Ratón · El mirador a los pies del gigante',
        altitude: 'Selva Virgen · Pie de Montaña',
        description:
          'Bautizado en honor al explorador letón Aleksandrs Laime, quien trazó la ruta terrestre a través de la selva en 1955. Pararse en este saliente de rocas empapado por el rocío es contemplar la grandeza en su estado más puro.',
        fact: { label: 'Ruta terrestre', value: 'Aleksandrs Laime (1955)' },
        image: '/images/destinations/salto-angel/2.jpg',
        alt: 'Vista panorámica del Salto Ángel desde el Mirador de Laime entre la selva',
      },
      {
        id: 'canon-del-diablo',
        title: 'La Garganta del Diablo',
        subtitle: 'Cañón del Churún · Paredes de mil metros de arenisca',
        altitude: 'Garganta del Auyantepuy · Muralla de Roca',
        description:
          'Un cañón sobrecogedor donde paredes de arenisca precámbrica de más de mil metros de altura encajonan el río Churún. Los pemones consideraban este cañón sagrado y temido: la morada de los espíritus mawari.',
        fact: { label: 'Paredes de roca', value: '+1.000 metros verticales' },
        image: '/images/destinations/salto-angel/3.jpg',
        alt: 'Paredes verticales milenarias del Cañón del Diablo en el Auyantepuy',
      },
      {
        id: 'temporada-churun',
        title: 'El Río del Churning',
        subtitle: 'Río Churún · Aguas de montaña y selva virgen',
        altitude: 'Corrientes Glaciares · Piedras Gigantes',
        description:
          'Remontar el Churún exige navegar en época de lluvias cuando el caudal permite cruzar los pasos de piedras y rápidos. Cada curva del río desvela una perspectiva nueva de la cordillera tepuyana.',
        fact: { label: 'Navegación', value: 'Solo en temporada de lluvias' },
        image: '/images/destinations/salto-angel/4.jpg',
        alt: 'Río Churún con aguas de montaña y vistas lejanas al Auyantepuy',
      },
      {
        id: 'cima-auyantepuy',
        title: 'La Cima del Abismo',
        subtitle: 'El nacimiento del Salto Ángel en el Auyantepuy',
        altitude: '2.500 m s. n. m. · Meseta Superior',
        description:
          'Arriba, en la cima del Auyantepuy, las lluvias constantes se acumulan en quebradas de roca estriada para formar el río Kerep. De pronto, el cauce desaparece en una hendidura y se precipita al vacío.',
        fact: { label: 'Río originario', value: 'Río Kerep' },
        image: '/images/destinations/salto-angel/5.jpg',
        alt: 'Borde superior de la meseta del Auyantepuy donde nace el Salto Ángel',
      },
      {
        id: 'bruma-y-nube',
        title: 'El Polvo de Agua',
        subtitle: 'La atomización de la cascada antes del fondo',
        altitude: 'Zona Intermedia del Acantilado',
        description:
          'La altura es tan colosal que una gran parte del agua no llega al fondo como líquido: los vientos la quiebran y transforman en una nube densa de microgotas que viaja por el cañón como una llovizna eterna.',
        fact: { label: 'Fenómeno', value: 'Atomización eólica' },
        image: '/images/destinations/salto-angel/6.jpg',
        alt: 'Columna de agua del Salto Ángel dispersándose en bruma y nube fina contra la roca',
      },
      {
        id: 'base-rocosa',
        title: 'La Poza de los Titanes',
        subtitle: 'Base del Salto Ángel · Rocas ciclópeas y helechos',
        altitude: 'Piso de la Selva · Microclima Glaciar',
        description:
          'El agua que logra tocar tierra cae sobre un estanque natural rodeado de piedras colosales pulidas por milenios. Los helechos arborescentes y plantas carnívoras crecen bañados por el viento helado del impacto.',
        fact: { label: 'Vegetación', value: 'Plantas endémicas y helechos' },
        image: '/images/destinations/salto-angel/7.jpg',
        alt: 'Base rocosa del Salto Ángel con vegetación tropical empapada',
      },
      {
        id: 'sobrevuelo-jimmie-angel',
        title: 'El Vuelo de 1933',
        subtitle: 'El hallazgo de Jimmie Angel y la avioneta Flamingo',
        altitude: 'Perspectiva Aérea · Memoria Histórica',
        description:
          'En 1933 el piloto Jimmie Angel avistó el salto mientras buscaba un legendario río de oro. En 1937 aterrizó su avioneta «El Río Caroní» en la cima pantanosa; el aparato quedó varado 33 años en la cumbre.',
        fact: { label: 'Descubrimiento aéreo', value: 'Jimmie Angel (1933)' },
        image: '/images/destinations/salto-angel/8.jpg',
        alt: 'Vista aérea del Salto Ángel cayendo sobre el verde manto de la selva',
      },
      {
        id: 'campamento-isla-raton',
        title: 'La Noche en Isla Ratón',
        subtitle: 'Dormir en hamaca frente al monumento natural',
        altitude: 'Campamento en Selva · Noche Estrellada',
        description:
          'Pasar la noche en hamacas con mosquitero en Isla Ratón es una experiencia imborrable: en la oscuridad total de la selva, el rugido del salto acompaña el sueño bajo millones de estrellas limpias.',
        fact: { label: 'Alojamiento', value: 'Hamacas bajo churuatas' },
        image: '/images/destinations/salto-angel/9.jpg',
        alt: 'Campamento tradicional en la selva cerca del Salto Ángel',
      },
      {
        id: 'arcoiris-salto-angel',
        title: 'El Puente de Colores',
        subtitle: 'Refracción matutina en el abismo',
        altitude: 'Amanecer en el Auyantepuy · Luz Solar',
        description:
          'Con los primeros rayos del amanecer atravesando el cañón, la bruma suspendida del Salto Ángel descompone la luz en un arcoíris doble que se dibuja sobre la roca milenaria. La joya de la Tierra de Gracia.',
        fact: { label: 'Luz matutina', value: 'Arcoíris doble natural' },
        image: '/images/destinations/salto-angel/10.jpg',
        alt: 'Salto Ángel en vertical con nubes y arcoíris formándose en la bruma de agua',
      },
    ],
  },
  'maria-lionza': {
    destinationId: 'maria-lionza',
    destinationName: 'María Lionza',
    tagline: 'El santuario místico de las Tres Potencias en la Montaña de Sorte',
    beats: [
      {
        id: 'montana-sagrada',
        title: '1. El Santuario de Sorte y el Permiso Espiritual',
        subtitle: 'Monumento Natural Cerro María Lionza · Chivacoa, Yaracuy',
        altitude: 'Faldas de la Selva · Entrada Sagrada',
        description:
          'Al llegar a las faldas selváticas de Chivacoa, no hay templos ni sacerdotes: el templo es la selva misma. Antes de cruzar los ríos o pisar los senderos, cada visitante debe detenerse en la entrada a pedir permiso espiritual a los guardianes invisibles y duendes del monte. Es ley sagrada no ingresar con jabones químicos ni contaminar las aguas: se entra con respeto a la morada de Yara, la princesa indígena caquetía que según el mito se fundió con la serpiente sagrada del río para convertirse en la protectora inmortal de las aguas y la naturaleza.',
        fact: { label: 'Santuario natural', value: 'Protegido desde 1960' },
        image: '/images/espiritualidad/cerro-maria-lionza.jpg',
        alt: 'Monumento Natural Cerro María Lionza cubierto de exuberante vegetación y niebla en Yaracuy',
      },
      {
        id: 'pozo-de-la-reina',
        title: '2. El Pozo de la Reina y las Aguas Sagradas',
        subtitle: 'Cascadas y Pozas del Río Yaracuy · Baños de Bendición',
        altitude: 'Pozo de la Reina · Aguas Vivas Cristalinas',
        description:
          'En esta imagen se observa la figura de María Lionza entronizada entre las rocas y corrientes del río sagrado. En pozos emblemáticos como el Pozo de la Reina, los peregrinos se sumergen completamente bajo las cascadas gélidas para recibir la fuerza purificadora de las aguas. En el fondo de estas pozas los devotos depositan monedas, flores de loto y pétalos de rosa como ofrenda de agradecimiento por favores concedidos en salud, amor y protección familiar.',
        fact: { label: 'Elemento sagrado', value: 'Agua dulce de manantial' },
        image: '/images/espiritualidad/maria-lionza-rocas.jpg',
        alt: 'Escultura de María Lionza entre las rocas y corrientes cristalinas en el río de Sorte',
      },
      {
        id: 'estatua-monumental',
        title: '3. La Escultura Monumental y el Mito Nacional',
        subtitle: 'Obra cumbre de Alejandro Colina (1952) · Símbolo patrio',
        altitude: 'Consagración Nacional · La Reina sobre la Danta',
        description:
          'La célebre escultura monumental muestra a María Lionza desnuda, cabalgando una danta y alzando una pelvis femenina en ofrenda de fertilidad y vida a la tierra venezolana. Durante el siglo XX, intelectuales, artistas y el gobierno de Marcos Pérez Jiménez consagraron esta figura como el gran símbolo del nacionalismo y la identidad criolla: la síntesis de la mujer originaria que ampara a su pueblo y gobierna sobre las fuerzas indómitas de la naturaleza.',
        fact: { label: 'Iconografía patria', value: 'Escultura de 1952' },
        image: '/images/espiritualidad/estatua-maria-lionza.jpg',
        alt: 'Escultura monumental de María Lionza cabalgando la danta, creada por el artista Alejandro Colina',
      },
      {
        id: 'altar-quibayo',
        title: '4. El Altar Mayor de Quibayo y las Ofrendas',
        subtitle: 'Sector Quibayo · Epicentro de promesas y súplicas',
        altitude: 'Altar Mayor · Velas de 7 Colores y Caña Clara',
        description:
          'En esta imagen se observa el Altar Mayor de Quibayo, corazón de la peregrinación donde miles de devotos acampan día y noche. Frente al altar se encienden cientos de velones multicolores, se ofrendan flores frescas, frutas de la tierra, café cerrero y aguardiente de caña blanca. En el centro presiden las Tres Potencias rodeadas de santos católicos, orishas africanos y bustos del Dr. José Gregorio Hernández, en una síntesis viva de todas las sangres y devociones del país.',
        fact: { label: 'Ofrendas sagradas', value: 'Velas de 7 colores · Caña · Flores' },
        image: '/images/espiritualidad/altar-mayor-quibayo.jpg',
        alt: 'Altar Mayor en el sector Quibayo repleto de figuras espirituales, ofrendas y velas encendidas',
      },
      {
        id: 'tres-potencias-selva',
        title: '5. El Altar de las Tres Potencias en la Selva',
        subtitle: 'Sorte Profundo · El Triángulo Espiritual en la Montaña',
        altitude: 'Bosque Tropical · María Lionza, Guaicaipuro y Negro Felipe',
        description:
          'En los senderos de la montaña se erigen altares dedicados a Las Tres Potencias: en el centro María Lionza (sabiduría y mestizaje criollo), a la derecha el Cacique Guaicaipuro (fuerza guerrera y justicia indígena defendiendo su tierra ancestral), y a la izquierda el Negro Felipe (comandante cimarrón de la Independencia, resistencia afrodescendiente y sanación). Juntas conforman el pilar fundamental que guía cada oración en la montaña.',
        fact: { label: 'Trinidad de fe', value: 'Mestiza · Indígena · Africana' },
        image: '/images/espiritualidad/tres-potencias-sorte.jpg',
        alt: 'Altar de las Tres Potencias rodeado de naturaleza y ofrendas en la selva de Sorte',
      },
      {
        id: 'trance-posesion',
        title: '6. La Materia, el Banco y el Trance Espiritual',
        subtitle: 'Personificación mediúmnica en la montaña',
        altitude: 'Sesión Ceremonial · Estado de Trance',
        description:
          'En esta imagen se documenta la posesión espiritual en Sorte. La «Materia» es el creyente con facultad mediúmnica que entra en trance profundo prestando su cuerpo para que descienda un espíritu de luz o un curandero ancestral. A su lado está siempre el «Banco»: el guardián terrenal despierto que la protege de caídas, le ofrece el tabaco y el licor ritual, traduce sus palabras a los enfermos y vela por la armonía y el respeto durante la ceremonia.',
        fact: { label: 'Roles sagrados', value: 'Materia (médium) & Banco (protector)' },
        image: '/images/espiritualidad/personificacion-potencias.jpg',
        alt: 'Creyentes personificando y rindiendo culto a las entidades espirituales en Sorte',
      },
      {
        id: 'portales-y-tabaco',
        title: '7. Portales, Velaciones y el Oráculo del Tabaco',
        subtitle: 'Oráculo de humo y purificación con hierbas en el río',
        altitude: 'Portal de Tierra · Despojos y Consultas',
        description:
          'En este portal improvisado junto al río se realizan las consultas y curaciones. El iniciado fuma el tabaco con oraciones: la ceniza blanca y firme anuncia caminos abiertos y bendición; la ceniza negra y rota delata trabas o enfermedades. En el suelo se realizan las «velaciones», donde el paciente se acuesta dentro de oráculos trazados con talco blanco y pólvora sagrada, antes de recibir baños de hierbas amargas (para expulsar negatividad) y dulces (para atraer paz).',
        fact: { label: 'Lectura de oráculo', value: 'Ceniza blanca = Camino limpio' },
        image: '/images/espiritualidad/altar-mayor-sorte.jpg',
        alt: 'Altar ceremonial con velas y ofrendas en la penumbra de la selva en la Montaña de Sorte',
      },
      {
        id: 'pira-nocturna',
        title: '8. La Pira Sagrada y los Tambores de Mina',
        subtitle: 'Víspera del 12 de Octubre · Sector Quibayo',
        altitude: 'Medianoche · Preparación del Fuego Sagrado',
        description:
          'Al caer la noche del 11 de octubre, toneladas de madera de espino y carbón se encienden en un claro del bosque en Quibayo. Durante horas, los tambores de mina y los clarines repican sin descanso elevando los cantos de los fieles hacia la copa de los árboles. El humo aromático de mirra y benjuí inunda el campamento mientras las brasas alcanzan su punto incandescente al rojo vivo, preparando el terreno para la prueba de fe más grande del año.',
        fact: { label: 'Música sagrada', value: 'Tambores de mina & Clarines' },
        image: '/images/espiritualidad/baile-candela-noche.jpg',
        alt: 'Llamas y brasas encendidas en la noche durante los preparativos del Baile en Candela',
      },
      {
        id: 'baile-en-candela',
        title: '9. El Baile en Candela: La Prueba de Fuego',
        subtitle: 'Medianoche del 12 de Octubre · Resistencia Indígena',
        altitude: 'Medianoche · Fuego Extremo a +600 °C',
        description:
          'A la medianoche en punto ocurre el clímax: sobre la alfombra de carbones ardientes a más de 600 °C, las materias poseídas por espíritus de caciques y chamarreros cruzan corriendo y bailan descalzas sobre las brasas al rojo vivo. No sufren la menor quemadura ni ampolla: la posesión espiritual y la fe aíslan su piel del calor mortal en un fenómeno que ha desconcertado a médicos y antropólogos de todo el mundo.',
        fact: { label: 'Temperatura brasas', value: '+600 °C descalzos sin quemarse' },
        image: '/images/espiritualidad/baile-en-candela.jpg',
        alt: 'Creyente realizando el Baile en Candela descalzo sobre las brasas ardientes en Sorte',
      },
      {
        id: 'corte-cale-cortes',
        title: '10. Las Cortes Populares y la Corte Calé',
        subtitle: 'Estatua de Ismael Sánchez · Devoción urbana y social',
        altitude: 'Panteón Popular · La Fe de las Barriadas',
        description:
          'Bajo las Tres Potencias conviven cortes que reflejan la historia viva venezolana: la Corte Médica (con el Dr. José Gregorio Hernández sanando a los enfermos), la Corte Chamarrera (curanderos campesinos como Don Nicanor Ochoa) y la Corte Calé o Malandra, liderada por Ismael Sánchez. En esta imagen se observa su estatua con gorra de lado y cigarrillo: madres y jóvenes de barrios acuden a su altar para pedir protección en las calles y que los muchachos se alejen de las armas y la delincuencia.',
        fact: { label: 'Cortes populares', value: 'Médica · Chamarrera · India · Calé' },
        image: '/images/espiritualidad/corte-cale-ismaelito.jpg',
        alt: 'Escultura de Ismael Sánchez, figura central de la Corte Calé en el espiritismo venezolano',
      },
    ],
  },
  'catolicismo-popular': {
    destinationId: 'catolicismo-popular',
    destinationName: 'Catolicismo Popular',
    tagline: 'Procesiones multitudinarias, promesas andantes y devoción profunda en Venezuela',
    beats: [
      {
        id: 'divina-pastora-procesion',
        title: '1. La Gran Procesión de la Divina Pastora',
        subtitle: 'Barquisimeto, Estado Lara · 14 de Enero',
        altitude: 'Ruta Mariana de 7,5 km · Multitud de 3 a 4 Millones',
        description:
          'En esta imagen se contempla el mar humano que inunda Barquisimeto cada 14 de enero. Más de 3 a 4 millones de personas caminan descalzas, de rodillas o cargando a sus hijos a lo largo de 7,5 kilómetros desde el pueblo de Santa Rosa hasta la Catedral. Es considerada la procesión mariana más multitudinaria de América Latina y la segunda más concurrida del mundo, unida por una sola voz de plegaria y promesa.',
        fact: { label: 'Feligresía', value: '+3 a 4 millones de fieles' },
        image: '/images/catolicismo/divina-pastora-procesion.jpg',
        alt: 'Multitud multitudinaria en la procesión de la Divina Pastora en Barquisimeto',
      },
      {
        id: 'divina-pastora-milagro',
        title: '2. El Milagro del Cólera y el Padre Macario Yépez',
        subtitle: 'Santuario de Santa Rosa · El origen del voto sagrado',
        altitude: 'Santa Rosa · Imagen Sagrada de 1855',
        description:
          'En 1855 una pavorosa epidemia de cólera diezmaba a la población de Barquisimeto. Desesperado ante la muerte masiva, el sacerdote Macario Yépez convocó una súplica pública y ofreció su propia vida a la Virgen a cambio de que cesara la peste sobre su pueblo. El sacerdote murió a los pocos días, la peste se extinguió milagrosamente y la ciudad juró trasladar anualmente la imagen de la Pastora en señal de gratitud perpetua.',
        fact: { label: 'Hito histórico', value: 'Fin de la peste en 1855' },
        image: '/images/catolicismo/divina-pastora-imagen.jpg',
        alt: 'Imagen de la Divina Pastora de Santa Rosa en Barquisimeto',
      },
      {
        id: 'virgen-de-coromoto',
        title: '3. Nuestra Señora de Coromoto: Patrona Nacional',
        subtitle: 'Santuario Nacional Basílica · Guanare, Portuguesa',
        altitude: 'Santuario Nacional · Aparición de 1652',
        description:
          'En las selvas de Guanare, el 8 de septiembre de 1652, una hermosa señora con un niño en brazos se apareció sobre las aguas del río al cacique de los indios cospes, Coromoto, pidiéndole que se bautizara. Al intentar atraparla, la Virgen desapareció dejando en su mano una diminuta reliquia de 3,2 cm dibujada sobre pergamino de madera, hoy custodiada en esta monumental basílica proclamada Santuario Nacional de Venezuela.',
        fact: { label: 'Patronazgo', value: 'Patrona de Venezuela (Pío XII, 1942)' },
        image: '/images/catolicismo/virgen-coromoto-santuario.jpg',
        alt: 'Santuario Nacional Basílica de Nuestra Señora de Coromoto en Guanare, Portuguesa',
      },
      {
        id: 'jose-gregorio-hernandez',
        title: '4. El Venerable Dr. José Gregorio Hernández',
        subtitle: 'El Médico de los Pobres · Isnotú (Trujillo) y Caracas',
        altitude: 'La Candelaria, Caracas · Beatificación Universal',
        description:
          'Científico eminente, profesor universitario y terciario franciscano que atendía gratuitamente a los enfermos más necesitados en los barrios de Caracas, comprándoles él mismo las medicinas. Murió trágicamente en 1919 atropellado al salir de una farmacia. El pueblo venezolano lo canonizó en sus corazones un siglo antes de que el Vaticano lo beatificara oficialmente, cubriendo sus altares con millones de placas de agradecimiento por curaciones médicas milagrosas.',
        fact: { label: 'Vocación santa', value: 'Ciencia, Caridad y Fe' },
        image: '/images/catolicismo/jose-gregorio-hernandez.jpg',
        alt: 'Retrato icónico del Beato Dr. José Gregorio Hernández, el médico de los pobres',
      },
      {
        id: 'nazareno-de-san-pablo',
        title: '5. El Nazareno de San Pablo y el Limonero del Señor',
        subtitle: 'Basílica de Santa Teresa · Miércoles Santo en Caracas',
        altitude: 'Caracas Colonial · Talla Sevillana del Siglo XVII',
        description:
          'La devoción más concurrida de la capital. Cuenta la historia que durante la epidemia del vómito negro de 1596, al sacar en procesión al Cristo con la cruz a cuestas, su leño tropezó con las ramas de un limonero en la esquina de Miracielos. Los limones cayeron al suelo, con su jugo prepararon un brebaje medicinal y los enfermos sanaron de inmediato. Cada Miércoles Santo, cientos de miles de devotos visten túnicas moradas y caminan descalzos pagando promesas.',
        fact: { label: 'Milagro fundacional', value: 'El Limonero de Miracielos (1596)' },
        image: '/images/catolicismo/nazareno-san-pablo.jpg',
        alt: 'Imagen procesional del Nazareno de San Pablo en la Basílica de Santa Teresa en Caracas',
      },
      {
        id: 'chinita-de-maracaibo',
        title: '6. Nuestra Señora de Chiquinquirá: La Chinita',
        subtitle: 'Basílica de Maracaibo · Zulia · 18 de Noviembre',
        altitude: 'Plaza Chiquinquirá · Amanecer Gaitero',
        description:
          'En 1709, una humilde lavandera recogió en las orillas del Lago de Maracaibo una pequeña tabla de madera para tapar una tinaja de agua. Días después, la madera comenzó a destellar luces brillantes y se reveló la imagen de la Virgen del Rosario de Chiquinquirá. Cada 18 de noviembre, al ritmo de furros, tamboras y gaitas zulianas, los «Servidores de María» bajan su retablo de oro y piedras preciosas para que recorra en hombros el pueblo marabino.',
        fact: { label: 'Milagro del Lago', value: 'Aparición de la tablita (1709)' },
        image: '/images/catolicismo/chinita-maracaibo-basilica.jpg',
        alt: 'Fachada monumental de la Basílica de Nuestra Señora de Chiquinquirá en Maracaibo',
      },
      {
        id: 'virgen-del-valle',
        title: '7. Nuestra Señora del Valle: Patrona de Oriente',
        subtitle: 'El Valle del Espíritu Santo · Isla de Margarita · 8 de Septiembre',
        altitude: 'Epicentro Insular · Protectora de los Mares',
        description:
          'Llegada a la isla de Cubagua en 1530 y trasladada a Margarita tras el maremoto de 1541, «Vallita» es la devoción mariana más antigua documentada en Venezuela. Es la protectora jurada de los pescadores caribeños, de la gente de mar y de la Armada. Cuenta la tradición que un buzo margariteño herido de gangrena por una raya prometió entregarle la primera perla que hallara: emergió con una perla natural con forma exacta de pierna, hoy resguardada en su museo diocesano.',
        fact: { label: 'Antigüedad', value: 'Venerada desde 1530' },
        image: '/images/destinations/margarita/08-basilica-del-valle.jpg',
        alt: 'Basílica Menor de Nuestra Señora del Valle en la Isla de Margarita',
      },
      {
        id: 'santo-cristo-la-grita',
        title: '8. El Santo Cristo de La Grita: El Rostro Angelical',
        subtitle: 'La Grita, Estado Táchira · 6 de Agosto',
        altitude: 'Cordillera de los Andes · Talla de Cedro de 1610',
        description:
          'Tras el violento terremoto de 1610 que destruyó La Grita, Fray Francisco prometió esculpir una imagen de Cristo crucificado para consolar a los sobrevivientes. Incapaz de lograr un rostro divino que reflejara serenidad y dolor a la vez, el fraile se entregó al llanto y la oración. Al despertar escuchó golpes en el taller: ángeles celestiales habían completado el rostro tallado en cedro. Cada 6 de agosto, más de 300.000 peregrinos cruzan a pie los páramos andinos bajo la niebla.',
        fact: { label: 'Tradición mística', value: 'Tallado por ángeles en 1610' },
        image: '/images/catolicismo/santo-cristo-la-grita.jpg',
        alt: 'Escultura milagrosa del Santo Cristo de La Grita en el estado Táchira',
      },
      {
        id: 'diablos-danzantes-yare',
        title: '9. Diablos Danzantes de Yare: Rendición ante el Santísimo',
        subtitle: 'San Francisco de Yare, Miranda · Fiesta de Corpus Christi',
        altitude: 'Patrimonio Inmaterial de la Humanidad UNESCO',
        description:
          'En esta imagen se observa la rendición de los Diablos Danzantes de Yare. Cofrades vestidos de rojo escarlata con máscaras grotescas de cuernos, cencerros y maracas danzan frenéticamente por las calles del pueblo. Sin embargo, al aproximarse a las puertas de la iglesia, caen de rodillas totalmente postrados ante la custodia del Santísimo Sacramento: es el triunfo absoluto de la fe y el bien sobre las fuerzas del mal, una tradición centenaria nacida de la devoción de los esclavizados en 1740.',
        fact: { label: 'Reconocimiento', value: 'Patrimonio UNESCO desde 2012' },
        image: '/images/catolicismo/diablos-danzantes-yare.jpg',
        alt: 'Diablos Danzantes de Yare arrodillados en veneración ante la iglesia en Corpus Christi',
      },
      {
        id: 'paradura-del-nino',
        title: '10. La Paradura del Niño: Memoria y Comunidad Andina',
        subtitle: 'Pueblos de Mérida, Táchira y Trujillo · Enero y Febrero',
        altitude: 'Tradición Navideña Andina · Violines y Aguinaldos',
        description:
          'Entre el 1 de enero y el 2 de febrero (Día de la Candelaria), las familias andinas celebran la Paradura del Niño. Cuenta el rito que el Niño Jesús se "pierde" o es simbólicamente "robado" del pesebre; los padrinos y vecinos lo buscan en procesión nocturna portando velas encendidas, pañuelos blancos y cantando aguinaldos al compás de violines. Al hallarlo, lo regresan al pesebre, lo ponen de pie («paradura») y todos besan la imagen antes de brindar con bizcochuelos y mistela.',
        fact: { label: 'Ritual comunitario', value: 'Paseo, Paradura y Beso del Niño' },
        image: '/images/catolicismo/paradura-del-nino.jpg',
        alt: 'Procesión tradicional de la Paradura del Niño con pañuelos blancos y velas',
      },
    ],
  },
  'cosmovisiones-indigenas': {
    destinationId: 'cosmovisiones-indigenas',
    destinationName: 'Cosmovisiones Indígenas',
    tagline: 'El territorio sagrado, la selva viva y los espíritus originarios de Venezuela',
    beats: [
      {
        id: 'monte-roraima-mawari',
        title: '1. El Monte Roraima y los Espíritus Mawari',
        subtitle: 'Pueblo Pemón · Parque Nacional Canaima, Bolívar',
        altitude: '2.810 m s. n. m. · Morada de los Dioses',
        description:
          'Para el pueblo pemón, los tepuyes son los «Mawari»: casas y fortalezas de los espíritus tutelares que cuidan la tierra desde el inicio del tiempo. La tradición enseña que el Monte Roraima es el tocón milenario de Wadaka, el Árbol de Todos los Frutos derribado por los dioses primordiales Makunaima y Ma\'nápe. Subir a su cumbre exige silencio sagrado: gritar o dañar los cristales despierta la furia de los espíritus, quienes desatan tormentas eléctricas y nieblas impenetrables.',
        fact: { label: 'Mitología Pemón', value: 'Wadaka, el Árbol de la Vida' },
        image: '/images/roraima.png',
        alt: 'Paredes verticales y cumbre mística del Monte Roraima en la Gran Sabana',
      },
      {
        id: 'salto-angel-auyantepui',
        title: '2. Kerepakupai Vená y el Auyán-tepui',
        subtitle: 'Cañón del Diablo · Caída de agua más alta del planeta (979 m)',
        altitude: 'El Cañón del Trueno · Aguas Sagradas',
        description:
          'Kerepakupai Vená («salto del lugar más profundo») se precipita desde el coloso Auyán-tepui («Montaña del Diablo»). Los pemones kamarakotos navegan el río Carrao en curiaras con sumo respeto, pidiendo permiso antes de entrar al Cañón del Diablo. Se cree que en el abismo del tepuy habitan los espíritus del trueno y el relámpago, entidades temidas que resguardan los manantiales más puros de la tierra.',
        fact: { label: 'Altura de caída', value: '979 metros ininterrumpidos' },
        image: '/images/salto-angel.png',
        alt: 'Caída monumental del Salto Ángel precipitándose desde el Auyán-tepui',
      },
      {
        id: 'cerro-autana-piaroa',
        title: '3. El Cerro Autana: El Árbol Sagrado del Mundo',
        subtitle: 'Pueblo Piaroa (Wötjüja) · Estado Amazonas',
        altitude: 'Monumento Natural · Wahari Kuawai',
        description:
          'En esta imagen se alza el legendario Wahari Kuawai («El Árbol de la Vida»). En la cosmovisión piaroa, este tepuy no es una piedra, sino el tronco del árbol cósmico del cual nacieron todos los frutos y semillas que alimentan a los seres vivos. En su cumbre, atravesada por una red de cavernas milenarias que forman una cruz natural, moran los dioses creadores y se conservan las leyes morales de respeto hacia la selva amazónica.',
        fact: { label: 'Santuario Piaroa', value: 'Wahari Kuawai (Árbol de la Vida)' },
        image: '/images/indigenas/cerro-autana-amazonas.jpg',
        alt: 'Monumento Natural Cerro Autana destacándose sobre la selva del estado Amazonas',
      },
      {
        id: 'churuata-yekuana-cosmos',
        title: '4. La Churuata Yekuana: El Cosmos en la Tierra',
        subtitle: 'Pueblos del Caura y Ventuari · Arquitectura Cósmica',
        altitude: 'La Casa Comunal «Atta» · Eje del Universo',
        description:
          'La churuata tradicional yekuana («Atta») no es una simple vivienda: es una maqueta exacta del universo. Su techo cónico de palma representa la bóveda celeste; el poste central de madera dura («Watta») es la columna que une el mundo celestial con la tierra y el inframundo; y su puerta principal mira siempre hacia el este por donde sale el sol. En su interior, los ancianos cantan el Watunna, el libro sagrado oral de la creación.',
        fact: { label: 'Arquitectura viva', value: 'Maqueta circular del cosmos' },
        image: '/images/indigenas/churuata-yekuana.jpg',
        alt: 'Gran Churuata comunal Yekuana con techo cónico de palma en el Amazonas',
      },
      {
        id: 'shabono-yanomami-hekura',
        title: '5. El Shabono Yanomami y los Espíritus Hekura',
        subtitle: 'Alto Orinoco y Sierra Parima · Pueblos de la Selva Profunda',
        altitude: 'El Gran Círculo Abierto · Chamanismo Shabori',
        description:
          'El shabono es la aldea circular yanomami, abierta en el centro hacia el cielo estrellado para permitir la comunicación con el plano espiritual. Los chamanes («shabori») inhalan polvos sagrados y entran en trance para invocar a los «Hekura», espíritus diminutos y resplandecientes que bajan del firmamento y habitan en el pecho del chamán. Cantan y bailan toda la tarde para curar a los miembros de la comunidad y proteger la selva de plagas.',
        fact: { label: 'Espiritualidad', value: 'Los Hekura (espíritus de la luz)' },
        image: '/images/indigenas/yanomami-amazonas.jpg',
        alt: 'Indígenas Yanomami en la selva del estado Amazonas',
      },
      {
        id: 'warao-hijos-canoa',
        title: '6. El Pueblo Warao: Los Hijos de la Canoa',
        subtitle: 'Delta del Orinoco · La vida sobre el laberinto de agua',
        altitude: 'Palafitos y Curiaras · Sin tocar tierra firme',
        description:
          'Warao se traduce literalmente como «Gente de las canoas» (Wa: canoa, Arao: gente). En el laberinto de caños del Delta del Orinoco, toda la existencia transcurre sobre el agua. Sus palafitos de madera de mangle no tocan la tierra y los niños aprenden a remar antes de caminar. El chamán («Wisidatu») cura a los enfermos con maracas sagradas de tapara cargadas de piedras mágicas, intermediando con los espíritus acuáticos «Hebu».',
        fact: { label: 'Cosmovisión fluvial', value: 'Pueblo nacido sobre el agua' },
        image: '/images/indigenas/warao-delta-orinoco.jpg',
        alt: 'Canoas y palafitos del pueblo indígena Warao en el Delta del Orinoco',
      },
      {
        id: 'danza-yonna-wayuu',
        title: '7. La Danza de la Yonna: Ritmo y Fuerza Wayúu',
        subtitle: 'Península de la Guajira, Zulia · El Baile de la Chichamaya',
        altitude: 'Desierto Guajiro · Tambor Kacheerpa',
        description:
          'En esta imagen se observa la majestuosa danza de la Yonna. Al compás acelerado del tambor Kacheerpa, la mujer wayúu, ataviada con mantas rojas ondeantes, persigue danzando al hombre hacia atrás hasta obligarlo a caer sobre la arena. Es un ritual sagrado que celebra la presentación de la doncella tras su encierro pedagógico, agradece las lluvias al dios Juya y restablece la armonía cósmica entre los clanes familiares.',
        fact: { label: 'Baile ancestral', value: 'Yonna (Danza de honor y cortejo)' },
        image: '/images/indigenas/yonna-wayuu-danza.jpg',
        alt: 'Mujeres Wayúu danzando la Yonna con mantas tradicionales en la arena',
      },
      {
        id: 'aguas-rojas-canaima',
        title: '8. Las Aguas de Té y los Saltos de Canaima',
        subtitle: 'Río Carrao y Laguna de Canaima · Escudo Guayanés',
        altitude: 'Lagunas Sagradas · Tintes de Tanino Natural',
        description:
          'Las aguas de Canaima exhiben un color ámbar y rojizo único en el mundo, producido por los taninos y minerales disueltos de la densa selva tepuyana. Para las etnias indígenas de la Gran Sabana, estas aguas no son un simple recurso hídrico: son la sangre vital de la tierra, sanadoras y cargadas de energía primigenia donde bañarse revitaliza el cuerpo y purifica el alma.',
        fact: { label: 'Color sagrado', value: 'Ámbar y oro por taninos selváticos' },
        image: '/images/canaima.png',
        alt: 'Laguna de Canaima con sus aguas rojizas reflejando los saltos y curiaras',
      },
      {
        id: 'moriche-arbol-vida',
        title: '9. El Moriche Sagrado: El Árbol de la Vida Warao',
        subtitle: 'Delta del Orinoco · Mauritia flexuosa',
        altitude: 'Morichales Sagrados · Sustento Físico y Espiritual',
        description:
          'Para el indígena warao, la palma de moriche es el árbol sagrado que sostiene la vida. De su tronco obtienen la harina de yuruma para hacer pan; de su pulpa extraen néctar dulce; de sus troncos caídos cosechan el gusano del moriche (delicia rica en proteínas); y con sus fibras tejen los chinchorros donde duermen, nacen y mueren. Destruir un morichal es atentar contra la madre nutricia de la etnia.',
        fact: { label: 'Árbol tutelar', value: 'Palma de Moriche (Ojidu)' },
        image: '/images/delta.png',
        alt: 'Paisaje de caños, manglares y palmas de moriche en el Delta del Orinoco',
      },
      {
        id: 'territorio-vivo-ancestral',
        title: '10. El Territorio Vivo: La Naturaleza como Pariente',
        subtitle: 'Ríos, Sabanas y Selvas Vírgenes de Venezuela',
        altitude: 'Memoria Originaria · Respeto y Cuidado Colectivo',
        description:
          'La gran enseñanza de los más de 40 pueblos indígenas de Venezuela es que la tierra no es una posesión que comprar o vender: es un pariente vivo con el que se convive en hermandad. Animales, árboles, cerros y vientos tienen alma y dignidad. Cuidar el territorio no es una moda ecológica moderna, sino la ley espiritual más antigua y profunda que ha permitido a nuestras culturas originarias florecer en equilibrio con la tierra.',
        fact: { label: 'Herencia milenaria', value: '+40 Pueblos Originarios' },
        image: '/images/cinaruco.png',
        alt: 'Río y sabana virgen venezolana reflejando la armonía con la naturaleza',
      },
    ],
  },
}

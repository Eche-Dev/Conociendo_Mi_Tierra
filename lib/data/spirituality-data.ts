export interface SpiritualityBeat {
  id: string
  title: string
  subtitle: string
  badge?: string
  description: string
  fact?: { label: string; value: string }
  image: string
  alt: string
}

export interface SpiritualityTradition {
  id: string
  title: string
  eyebrow: string
  tagline: string
  region: string
  coords: string
  image: string
  alt: string
  badge?: string
  description: string
  facts: { label: string; value: string }[]
  storyParagraphs: string[]
  beats: SpiritualityBeat[]
}

export const SPIRITUALITY_TRADITIONS: SpiritualityTradition[] = [
  {
    id: 'maria-lionza',
    title: 'María Lionza',
    eyebrow: 'Patrimonio Vivo · Yaracuy',
    tagline: 'Reina de las aguas, protectora de la montaña y madre de las Tres Potencias',
    region: 'Yaracuy · Chivacoa · Sorte y Quibayo',
    coords: '10°05′N · 68°58′O',
    image: '/images/espiritualidad/cerro-maria-lionza.jpg',
    alt: 'Monumento Natural Cerro María Lionza cubierto de vegetación tropical y niebla mística en Yaracuy',
    badge: 'Tradición Autóctona Venezolana',
    description:
      'María Lionza es el corazón del culto espiritual más auténtico y representativo de Venezuela. No se trata de una religión importada ni de un dogma escrito en libros: es una manifestación viva nacida en la tierra venezolana que fusiona las raíces indígenas prehispánicas, el espíritu cimarrón de la resistencia africana y los símbolos del catolicismo popular. En el centro de esta devoción reina una mujer soberana que protege la naturaleza, la fauna silvestre y a los humildes. Su santuario no tiene paredes de ladrillo: es la selva tropical de la Montaña de Sorte, surcada por manantiales y ríos sagrados donde miles de creyentes acuden todo el año a pedir salud, purificarse de pesares y renovar su fe.',
    facts: [
      { label: 'Epicentro Sagrado', value: 'Montaña de Sorte' },
      { label: 'Trinidad Espiritual', value: 'Tres Potencias' },
      { label: 'Rito Mayor', value: '12 de Octubre' },
    ],
    storyParagraphs: [
      'La leyenda cuenta que en tiempos ancestrales nació entre los indígenas caquetíos una hermosa doncella de ojos verdes claros como el agua, llamada Yara. El chamán de la tribu advirtió una profecía: si la niña llegaba a mirar su propio reflejo en las aguas de la laguna, una descomunal serpiente emergería de las profundidades para devorarla, trayendo grandes cambios al valle. Para protegerla, su padre la mantuvo confinada bajo vigilancia. Sin embargo, un día los guardias cayeron dormidos y la curiosa joven se escapó hasta la orilla del manantial. Al asomarse y contemplar por primera vez su rostro en el espejo cristalino, la mítica anaconda gigante del río emergió y la engulló.',
      'Lejos de morir, Yara se fusionó con el espíritu de la serpiente y con el alma misma del agua. Su cuerpo creció y se convirtió en la guardiana soberana de la selva, dueña de las corrientes de agua, de las orquídeas y de las fieras salvajes. Con la llegada de los colonizadores españoles y los sacerdotes católicos, el mito indígena se adaptó para sobrevivir: la llamaron «Santa María de la Onza» (asociada a la danta o al jaguar que la acompañaba), nombre que con los siglos devino en María Lionza. El artista venezolano Alejandro Colina inmortalizó su figura en 1952 en su célebre escultura monumental: una mujer mestiza desnuda, de porte orgulloso y maternal, cabalgando una danta mientras levanta sobre su cabeza una pelvis femenina como ofrenda de fecundidad a la tierra.',
      'En el altar mayor del culto reina la «Trinidad Venezolana», conocida como Las Tres Potencias: la Reina María Lionza en el centro representando la sabiduría y el mestizaje; a su derecha el Gran Cacique Guaicaipuro, líder invicto de las tribus caribes que simboliza el coraje de la tierra original y la defensa contra la opresión; y a su izquierda el Negro Felipe, comandante cimarrón de la gesta libertadora que encarna la fuerza incansable, la lealtad y el poder sanador de la herencia afrovenezolana. Juntas, estas tres figuras forman un mapa exacto de la sangre que corre por las venas de Venezuela.',
    ],
    beats: [
      {
        id: 'beat-montana-sagrada',
        title: 'El Santuario de Sorte',
        subtitle: 'Monumento Natural Cerro María Lionza · Yaracuy',
        badge: 'Templo Natural',
        description:
          'En las cercanías de Chivacoa, estado Yaracuy, se levanta este macizo selvático protegido desde 1960. Los creyentes no entran a una iglesia: el templo es la montaña misma, con sus sectores de Sorte, Quibayo y El Loro. Para ingresar se pide permiso espiritual a los guardianes del bosque, respetando las aguas frías donde no se permite jabón comercial ni basura, preservando el equilibrio ecológico de la selva.',
        fact: { label: 'Protección', value: 'Monumento Natural (1960)' },
        image: '/images/espiritualidad/cerro-maria-lionza.jpg',
        alt: 'Paisaje exuberante del Cerro María Lionza con niebla y densa selva yaracuyana',
      },
      {
        id: 'beat-tres-potencias',
        title: 'Las Tres Potencias',
        subtitle: 'María Lionza, Guaicaipuro y el Negro Felipe',
        badge: 'Trinidad de Venezuela',
        description:
          'El altar principal sintetiza el mestizaje de la nación: María Lionza preside con su corona dorada y manto azul como reina de la armonía; el Cacique Guaicaipuro empuña su lanza representando el vigor indígena y la justicia; y el Negro Felipe, con su pañuelo rojo y machete, aporta la alegría combativa, la sanación y la resistencia afrodescendiente.',
        fact: { label: 'Composición', value: 'Indígena · Africana · Criolla' },
        image: '/images/espiritualidad/estatua-maria-lionza.jpg',
        alt: 'Escultura de María Lionza cabalgando la danta con orgullo y fuerza',
      },
      {
        id: 'beat-rituales-y-portales',
        title: 'Portales, Tabaco y Despojos',
        subtitle: 'El arte de la curación y la purificación popular',
        badge: 'Prácticas Ancestrales',
        description:
          'En los claros del río, las caravanas de devotos levantan «portales»: altares adornados con velas de siete colores, frutas, flores y oraciones. El tabaco aquí no es un vicio, sino un instrumento oracular: su humo y cenizas se interpretan para auscultar la salud y el destino. En los pozos fríos del río se practican los «despojos», baños con plantas amargas y dulces para limpiar las energías pesadas y atraer la paz.',
        fact: { label: 'Elementos clave', value: 'Agua de río · Humo de tabaco · Velas' },
        image: '/images/sorte.png',
        alt: 'Velas encendidas y ofrendas en un portal ceremonial junto al río en Sorte',
      },
      {
        id: 'beat-baile-en-candela',
        title: 'El Baile en Candela',
        subtitle: 'La prueba de fuego en la medianoche del 12 de Octubre',
        badge: 'Rito Mayor',
        description:
          'Cada medianoche entre el 11 y el 12 de octubre, miles de personas se congregan en Quibayo y Sorte. Se encienden toneladas de leña hasta formar una cama de brasas incandescentes que supera los 600 °C. Al ritmo frenético de los tambores de mina y clarines, los creyentes en trance espiritual («materias») bailan y caminan descalzos sobre las brasas al rojo vivo sin sufrir quemaduras, en una demostración asombrosa de fe, valor y protección.',
        fact: { label: 'Fecha cumbre', value: 'Medianoche del 12 de Octubre' },
        image: '/images/espiritualidad/baile-en-candela.jpg',
        alt: 'Devoto bailando descalzo sobre las brasas ardientes durante el Baile en Candela en Sorte',
      },
      {
        id: 'beat-cortes-espirituales',
        title: 'Las Cortes Espirituales',
        subtitle: 'Un espejo cósmico del pueblo venezolano',
        badge: 'Jerarquía Espiritual',
        description:
          'Bajo las Tres Potencias se organiza un fascinante universo de cortes que reflejan la historia venezolana: la Corte India (Tamanaco, Mara, Terepaima), la Corte Chamarrera (curanderos llaneros campesinos como Don Nicanor Ochoa), la respetada Corte Médica (liderada por el Venerable Dr. José Gregorio Hernández, a quien acuden enfermos de todo el país), la Corte Libertadora (Simón Bolívar y los próceres) y la Corte Celestial.',
        fact: { label: 'Corte Médica', value: 'Dr. José Gregorio Hernández' },
        image: '/images/espiritualidad/cerro-maria-lionza.jpg',
        alt: 'La selva y los senderos sagrados de la Montaña de Sorte donde conviven las cortes',
      },
    ],
  },
]

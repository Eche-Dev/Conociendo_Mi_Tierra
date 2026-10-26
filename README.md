# Conociendo Mi Tierra 🇻🇪

Guía turística inmersiva de Venezuela: un recorrido por scroll por los paisajes, la
gastronomía, la cultura, la naturaleza y la espiritualidad del país, del Caribe a la
Gran Sabana.

Sitio construido con **Next.js (App Router)** y **Tailwind CSS v4**, pensado para
desplegarse en Vercel.

## ✨ Características

- Recorrido inmersivo por capítulos con animaciones de scroll y parallax.
- 29 destinos con datos, historia y fotografía referencial.
- Secciones de turismo, gastronomía, cultura, naturaleza, espiritualidad y guía del viajero.
- Diseño responsivo, modo oscuro y respeto por `prefers-reduced-motion`.
- Analíticas con Vercel Analytics.

## 🧱 Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [@vercel/analytics](https://vercel.com/docs/analytics)

## 📁 Estructura

```
.
├── app/                    # Rutas (App Router) y layout global
│   ├── layout.tsx          # Fuentes, metadatos y analíticas
│   ├── page.tsx            # Portada inmersiva
│   ├── globals.css         # Tema, tokens de color y animaciones
│   ├── turismo/            # Atlas de destinos
│   ├── gastronomia/
│   ├── cultura/
│   ├── naturaleza/
│   ├── espiritualidad/
│   └── guia/
├── components/
│   ├── home/               # Secciones de la portada (hero, escenas, etc.)
│   └── sections/           # Componentes reutilizables de páginas de sección
├── lib/
│   ├── data/               # Datos del sitio (destinos)
│   ├── types.ts            # Tipos compartidos
│   └── utils.ts            # Utilidades (cn)
└── public/
    └── images/             # Imágenes y iconos
```

## 🚀 Desarrollo

Requisitos: [Node.js](https://nodejs.org/) 20+ y [pnpm](https://pnpm.io/).

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## 📦 Build de producción

```bash
pnpm build
pnpm start
```

## ▲ Despliegue en Vercel

La forma más fácil es conectar el repositorio en [Vercel](https://vercel.com/new).
Vercel detecta Next.js automáticamente; no se requiere configuración adicional.

Alternativamente, con el CLI:

```bash
npm i -g vercel
vercel
```

## 📄 Licencia

Distribuido bajo la licencia [MIT](./LICENSE).

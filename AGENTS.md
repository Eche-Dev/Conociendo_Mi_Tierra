# AGENTS.md

> Mapa del proyecto para asistentes de código (y para cualquiera que retome el repo).
> Objetivo: actuar rápido y **sin romper** lo existente. Última revisión: Oct 2026.

## Qué es

Guía turística inmersiva de Venezuela. **Una sola página larga con scroll** (`/`) más 6 rutas estáticas de sección. Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript. Todo es **estático** (pre-renderizado en build, sin backend ni base de datos).

## Comandos

```bash
corepack pnpm dev      # servidor de desarrollo (http://localhost:3000)
corepack pnpm build    # build de producción + type-check
corepack pnpm start    # sirve el build
```

- No hay script de lint. El type-check lo hace `pnpm build` (no está desactivado).
- `next.config.mjs` tiene `images.unoptimized: true` (sirve los PNG tal cual, sin optimizer).

## Estructura

```
app/
  layout.tsx          Fuentes (Anton + Source Serif), metadatos/SEO, favicon, <Analytics>, lang="es"
  page.tsx            La portada: ScrollDriver → ChapterNav → Hero → Prologue → 29×Scene → Gastronomy → Spirituality → Epilogue
  globals.css         Tokens de color, fuentes y TODAS las clases de animación
  turismo/            Atlas de los 29 destinos (SectionPage + InfoCard)
  gastronomia/        Reutiliza <Gastronomy/> de home/
  espiritualidad/     Reutiliza <Spirituality/> de home/
  cultura/            SectionPage + InfoCard
  naturaleza/         SectionPage + InfoCard
  guia/               SectionPage + InfoCard
components/
  home/               Secciones de la portada
    scroll-driver.tsx   Motor de scroll (client, renderiza null)
    chapter-nav.tsx     Barra superior + puntos laterales de capítulos (client)
    hero.tsx            Portada principal (data-scene)
    prologue.tsx        Índice/entradas al recorrido
    scene.tsx           Una escena por destino (data-scene)
    gastronomy.tsx      Sección de gastronomía
    spirituality.tsx    Sección de espiritualidad (client)
    epilogue.tsx        Cierre + volver al inicio
  sections/           Reutilizables en páginas de sección
    section-page.tsx    Layout: back-link, eyebrow, título gigante, intro
    info-card.tsx       Tarjeta imagen + título + texto
lib/
  data/destinations.ts  Los 29 destinos (fuente de verdad de contenido)
  types.ts              Tipo `Destination`
  utils.ts              `cn()` para unir clases
public/
  images/*.png          Imágenes de destinos y secciones
  icon*.{png,svg}       Favicon / iconos (referenciados en layout.tsx)
```

Rutas públicas: `/`, `/turismo`, `/gastronomia`, `/espiritualidad`, `/cultura`, `/naturaleza`, `/guia`.

## El corazón delicado: sistema de scroll (NO ROMPER)

`components/home/scroll-driver.tsx` es el motor. Al montar (client):

1. Selecciona todos los `[data-scene]` (el `hero` y cada `scene`).
2. En scroll/resize (con `requestAnimationFrame`) escribe:
   - `--page-p` (0→1 progreso total de página) en `<html>` → mueve la **barra de progreso** superior (`.page-progress`).
   - `--p` (0→1 progreso de cada escena) en cada `[data-scene]` → controla **parallax/zoom** de la imagen (`.scene-image`) y el oscurecido (`.scene-tint`).
3. Observa los elementos **`.reveal`** con `IntersectionObserver` (threshold 0.15) y les pone `data-visible="true"` **una sola vez** → así aparecen con fade-up.

`app/globals.css` **solo consume esas variables**. Clases que las usan: `.scene-image`, `.scene-tint`, `.hero-image`, `.hero-title`, `.page-progress`, `.reveal`, `.scroll-cue`. Todo respeta `prefers-reduced-motion`.

**Regla:** si cambias el scroll o estas variables, revisa a la vez `scroll-driver.tsx` y `globals.css`. Ahí se rompe casi todo si se toca a medias.

## Datos (`lib/data/destinations.ts`)

Cada destino: `id`, `name`, `tagline`, `region`, `coords`, `image` (`/images/x.png`), `alt`, `description`, `facts[3]`, `history[2]`.

- El **`id`** es también el **ancla de scroll** (`<section id={d.id}>`) y lo usa `chapter-nav.tsx` para el menú lateral y el contador. Cambiar un `id` rompe la navegación.
- Las páginas `/turismo` y la portada se generan mapeando este array. Añadir/quitar un destino afecta ambos.
- Algunas imágenes se reutilizan entre destinos (p. ej. `sorte.png`, `merida.png`).

## Cliente vs servidor

Solo estos son `'use client'`: `scroll-driver`, `chapter-nav`, `spirituality`. El resto son **componentes de servidor** (más rápidos). Si añades estado/efectos/browser API a otro, decláralo `'use client'` o moverlo a cliente.

## Estilo

- **Color** (oklch en `:root` de `globals.css`): `--background` (azul muy oscuro), `--foreground` (crema), `--primary` (dorado). Utilidades Tailwind: `bg-background`, `text-foreground`, `text-primary`, `border-border`, `text-muted-foreground`, `bg-card`.
- **Fuentes**: `font-display` = Anton (títulos), `font-serif` = Source Serif 4 (cuerpo). Cargadas con `next/font` en `layout.tsx`.
- Títulos gigantes responsivos con `clamp()`, p. ej. `text-[clamp(3.25rem,12vw,11rem)]`.
- Tailwind v4: no hay `tailwind.config`; el tema se define en `globals.css` con `@theme inline`.

## Puntos de cuidado

- **Imágenes**: siempre ruta absoluta `/images/archivo.png` desde `public/`. Verificar que el `.png` existe.
- **No reintroducir** dependencias eliminadas en la limpieza: `shadcn`, `@base-ui/react`, `class-variance-authority`, `tw-animate-css` (y su CSS en `globals.css`). No se usan.
- `package.json` se llama `conociendo-mi-tierra`. Gestor: pnpm.
- El repo será open source (licencia MIT) y se despliega en **Vercel** (app en la raíz, se detecta solo).

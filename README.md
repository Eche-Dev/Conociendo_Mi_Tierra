<div align="center">

# Conociendo Mi Tierra 🇻🇪
### *Un viaje inmersivo por la Tierra de Gracia*

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel Deployment](https://img.shields.io/badge/Despliegue-Vercel-black?style=for-the-badge&logo=vercel)](https://conociendo-mi-tierra.vercel.app/)
[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-yellow?style=for-the-badge)](./LICENSE)

</div>

---

## 🌟 ¿Qué es Conociendo Mi Tierra?

**Conociendo Mi Tierra** es una plataforma turística y cultural inmersiva concebida para homenajear, documentar y explorar las maravillas naturales, históricas, gastronómicas y místicas de **Venezuela**.

A través de una experiencia narrativa guiada por scroll continuo (*scrollytelling*), la web transporta al usuario desde los tepuyes milenarios de la Amazonía y la Gran Sabana hasta las costas de arena blanca del Caribe, pasando por las cumbres gélidas de los Andes y la inmensidad dorada de Los Llanos.

👉 **Explora la experiencia en vivo:** [https://conociendo-mi-tierra.vercel.app](https://conociendo-mi-tierra.vercel.app)

---

## ✨ Características Principales

### 🗺️ 1. Atlas Interactivo de 29 Destinos
- Recorrido completo por las regiones de Venezuela: **Caribe & Islas, Andes, Guayana & Amazonía, Centro & Costas, Llanos y Occidente**.
- Cada destino cuenta con coordenadas geográficas reales, fotografía de alta definición, datos esenciales (*facts*) e hitos históricos de su territorio.
- Visor de tours inmersivos paso a paso (*beats*) para adentrarse en los secretos de cada locación.

### 📜 2. Secciones Editoriales Temáticas
Además de la portada interactiva continua, la plataforma ofrece 6 rutas de exploración profunda:

- **[Turismo](/turismo)**: Directorio y atlas general con filtrado rápido de los 29 destinos.
- **[Gastronomía](/gastronomia)**: Homenaje a la mesa criolla venezolana: pabellón, arepas, hallacas, dulces tradicionales y platos emblemáticos de cada estado.
- **[Cultura](/cultura)**: Patrimonio Inmaterial de la Humanidad reconocido por la UNESCO (Diablos Danzantes de Yare, Carnavales de El Callao, Parranda de San Pedro), instrumentos autóctonos y artesanía tradicional.
- **[Naturaleza](/naturaleza)**: Monografía de la biodiversidad venezolana: tepuyes de más de 2.000 millones de años, parques nacionales, fauna endémica y saltos de agua monumentales.
- **[Espiritualidad](/espiritualidad)**: La dimensión mística y de devoción popular venezolana (Virgen del Valle, Dr. José Gregorio Hernández, mitos y sincretismo espiritual).
- **[Guía del Viajero](/guia)**: Consejos prácticos de viaje: temporadas climáticas recomendadas, seguridad, manejo de divisas, transporte en curiaras/avionetas y equipo sugerido.

### ⚡ 3. Arquitectura y Rendimiento
- **Motor de Scroll a Medida**: Parallax suave y control de progreso reactivo a 60 FPS mediante variables CSS dinámicas y aceleración por GPU, sin dependencias pesadas de terceros.
- **100% Pre-renderizado Estático (SSG)**: Generación en tiempo de compilación para tiempos de respuesta instantáneos desde Edge CDN.
- **Diseño Adaptativo Extremo**: Interfaz fluida desde teléfonos compactos (360px) con menú drawer lateral, hasta monitores 4K y pantallas ultra-wide.
- **SEO & Social Share de Alta Fidelidad**: Tarjetas Open Graph y Twitter Cards en HD (1200×630), metaetiquetas de indexación para Google Search Console, `sitemap.xml`, `robots.txt` y Web App Manifest.
- **Métricas Oficiales**: Integración directa con `@vercel/analytics`.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Enrutamiento moderno, Server Components y renderizado estático |
| **Biblioteca UI** | [React 19](https://react.dev/) | Componentes declarativos de última generación |
| **Estilos** | [Tailwind CSS v4](https://tailwindcss.com/) | Estilos de alta velocidad con variables de tema inline |
| **Tipografía** | `Anton` + `Source Serif 4` | Contraste editorial entre titulares imponentes y lectura cómoda |
| **Iconografía** | [Lucide React](https://lucide.dev/) | Iconos vectoriales limpios y accesibles |
| **Analítica** | [Vercel Web Analytics](https://vercel.com/analytics) | Medición de tráfico y rendimiento respetando la privacidad |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | Tipado estricto en el 100% del código fuente |

---

## 📂 Estructura del Proyecto

```bash
conociendo-mi-tierra/
├── app/                          # Rutas públicas (App Router)
│   ├── layout.tsx                # Layout global: fuentes, SEO, favicon y Analytics
│   ├── page.tsx                  # Portada interactiva: Hero → Escenas → Epílogo
│   ├── globals.css               # Tokens de color (oklch), temas y animaciones
│   ├── sitemap.ts                # Generador dinámico de mapa del sitio XML
│   ├── robots.ts                 # Configuración para motores de búsqueda
│   ├── manifest.ts               # Web App Manifest (PWA)
│   ├── turismo/                  # Atlas de destinos
│   ├── gastronomia/              # Experiencia culinaria
│   ├── cultura/                  # Patrimonio y tradiciones
│   ├── naturaleza/               # Ecosistemas y parques
│   ├── espiritualidad/           # Mitos y devoción
│   └── guia/                     # Consejos prácticos de viaje
├── components/
│   ├── home/                     # Componentes de la portada (Hero, Scene, Nav, etc.)
│   ├── sections/                 # Layouts compartidos para páginas de sección
│   └── tours/                    # Visor modal de tours inmersivos
├── lib/
│   ├── data/destinations.ts      # Fuente de verdad de los 29 destinos
│   ├── types.ts                  # Definiciones de tipos TypeScript
│   └── utils.ts                  # Utilidad para clases CSS condicionales (cn)
└── public/
    ├── images/                   # Fotografía de alta resolución organizada por sección
    ├── og-image.jpg              # Portada de previsualización para redes sociales (HD)
    └── icons/                    # Faviconos e iconos de aplicación
```

---

## 🚀 Instalación y Desarrollo Local

### Requisitos previos
- [Node.js](https://nodejs.org/) v20 o superior
- [pnpm](https://pnpm.io/) (recomendado) o `npm`

### 1. Clonar el repositorio
```bash
git clone https://github.com/Eche-Dev/Conociendo_Mi_Tierra.git
cd Conociendo_Mi_Tierra
```

### 2. Instalar dependencias
```bash
corepack pnpm install
```

### 3. Iniciar el entorno de desarrollo
```bash
corepack pnpm dev
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

---

## 📦 Compilación y Producción

Para compilar el proyecto y comprobar los tipos antes de desplegar:

```bash
# Compilar build estático de producción + type-check
corepack pnpm build

# Probar la versión de producción localmente
corepack pnpm start
```

---

## ☁️ Despliegue en Vercel

Este proyecto está optimizado para desplegarse con cero configuración en **Vercel**:

1. Haz un fork o sube tus cambios a GitHub.
2. Importa el proyecto desde el [Dashboard de Vercel](https://vercel.com/new).
3. Vercel detectará automáticamente Next.js y configurará el build estático.
4. Cualquier nuevo `push` a la rama `main` disparará un nuevo despliegue automático.

---

## 📜 Licencia

Este proyecto está bajo la Licencia **MIT**. Puedes usarlo, estudiarlo y adaptarlo libremente. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

<p align="center">
  Hecho con orgullo y devoción por <b>Venezuela</b> 🇻🇪<br>
  <i>"Donde el horizonte no termina y la tierra late con fuerza infinita."</i>
</p>

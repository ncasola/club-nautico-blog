# Club Náutico Puertito de Güímar — Blog

Sitio en Next.js 15 (App Router) para mostrar noticias y actividades del Club Náutico. Incluye modo oscuro, tarjetas con efecto “liquid glass”, filtros y búsqueda de noticias.

## Tecnologías principales

- Next.js 15 + React 19
- Tailwind CSS v4 (`@tailwindcss/postcss`) + estilos personalizados en `app/globals.css`
- Radix UI + Lucide Icons
- Manejo de temas con `next-themes`
- Vitest para pruebas

## Requisitos previos

- Node.js 18+ (recomendado 20)
- pnpm (usar siempre pnpm)

## Configuración rápida

1) Instalar dependencias  
```bash
pnpm install
```

2) Variables de entorno (`.env.local`)  
```bash
GOOGLE_DRIVE_URL=https://ruta-al-json-de-noticias
UNSPLASH_ACCESS_KEY=tu_api_key_de_unsplash
```

3) Ejecutar en desarrollo  
```bash
pnpm dev
```

4) Lint y tests  
```bash
pnpm lint
pnpm test
```

## Scripts disponibles

- `pnpm dev` – servidor de desarrollo
- `pnpm build` – build de producción
- `pnpm start` – sirve la build
- `pnpm lint` – reglas de Next/ESLint
- `pnpm test` – Vitest

## Estructura relevante

- `app/` páginas y layout (App Router). `app/news/[slug]/page.tsx` para detalle de noticia.
- `components/` UI y secciones: navegación, hero, tarjetas de noticias, filtros.
- `components/ui/` componentes base (button, card, select, sheet, etc.).
- `app/globals.css` variables de tema, utilidades y efectos (glass, liquid glass, scrollbar, etc.).
- `lib/data.ts` fetching, validación Zod, caché en memoria y enriquecimiento de imágenes con Unsplash.
- `data/fallback-news.json` datos de respaldo cuando el feed no responde.

## Datos y caché

- `GOOGLE_DRIVE_URL` apunta a un JSON de noticias. Se valida y cachea 5 minutos.
- Si falla el fetch, se usa el cache previo o `data/fallback-news.json`.
- Las imágenes se completan vía Unsplash (`UNSPLASH_ACCESS_KEY`) y se cachean por consulta.

## Tailwind CSS v4

- Importa Tailwind en `app/globals.css` con `@import "tailwindcss";`.
- Config de PostCSS en `postcss.config.mjs` con `@tailwindcss/postcss`.
- No uses `darkMode` en la config; la paleta y modo oscuro están en las CSS vars.

## Funcionalidades clave

- Hero con branding del club.
- Grid de noticias con búsqueda, filtro por categoría, orden por fecha y “cargar más”.
- Tarjetas con efecto liquid glass y hover mejorado; imágenes con `next/image`.
- Modo oscuro/claro con `ThemeSwitch`.
- Páginas estáticas generadas para cada noticia (`generateStaticParams`).

## Pruebas y calidad

- Ejecuta siempre `pnpm lint` y `pnpm test` antes de publicar.
- Revisa responsive en móvil: navegación (sheet) y grid de noticias.

## Despliegue

1) `pnpm build`
2) `pnpm start` (usa las variables de entorno en el host de despliegue)

## Resolución de problemas

- **Sin estilos**: verifica `@import "tailwindcss";` en `app/globals.css` y `postcss.config.mjs`.
- **Errores de datos**: confirma `GOOGLE_DRIVE_URL` y que la respuesta sea JSON válido.
- **Sin imágenes**: revisa `UNSPLASH_ACCESS_KEY` y el límite de la API.


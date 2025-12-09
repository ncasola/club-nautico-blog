## Contexto rápido para LLMs

- **Stack**: Next.js 15 (App Router), React 19, Tailwind CSS v4 con `@tailwindcss/postcss`, Radix UI, Lucide React, Next Themes. Tests con Vitest.
- **Gestor**: usa siempre `pnpm`.
- **Estilos**: Tailwind v4 no usa `darkMode` en el config; la paleta está en `app/globals.css` (variables CSS + utilidades personalizadas como `liquid-glass` y `btn-liquid-glass`). No eliminar esa capa.
- **UI**: componentes base en `components/ui/*` (button, card, input, select, sheet, etc.). Navegación en `components/navigation.tsx`; hero y noticias en `components/hero.tsx`, `components/news-card.tsx`, `components/news-grid.tsx`.

## Datos y dependencias externas

- Las noticias vienen de `GOOGLE_DRIVE_URL` (JSON). Si falla, usa `data/fallback-news.json`.
- Las imágenes se enriquecen con Unsplash (`UNSPLASH_ACCESS_KEY`) y se cachean en memoria.
- Caché simple en `lib/data.ts` (5 min) + revalidate en fetch (300s).

## Entorno

Crear `.env.local` con:
```
GOOGLE_DRIVE_URL=...
UNSPLASH_ACCESS_KEY=...
```
Validados en `lib/env.ts` con Zod.

## Scripts útiles (pnpm)

- `pnpm dev` (Next dev)
- `pnpm build` / `pnpm start`
- `pnpm lint`
- `pnpm test` (Vitest)

## Convenciones y notas

- Español en UI y copys.
- Mantén `btn-liquid-glass` y efectos de vidrio en `globals.css`.
- Para nuevas páginas, usa componentes existentes y respeta la paleta (variables CSS).
- Evita añadir config Tailwind clásica v3; ya estamos en v4 con PostCSS plugin.

## Checklist antes de PR

- Lints y tests verdes (`pnpm lint && pnpm test`).
- Verifica modo oscuro/claro (usa `ThemeSwitch`).
- Revisa responsive: hero, grid y sheet móvil (`components/navigation.tsx`).

## Depuración común

- Sin estilos: revisa `@import "tailwindcss";` en `app/globals.css` y `postcss.config.mjs`.
- Errores de datos: confirma variables de entorno y formato JSON del feed.


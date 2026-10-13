# Stack y estructura

## Stack

| Paquete | Uso |
|---|---|
| `astro` 7 | Framework, salida estática |
| `@astrojs/react`, `react` 19 | Isla de la galería |
| `gsap` 3 + `@gsap/react` | ScrollSmoother, ScrollTrigger, `useGSAP` |
| `three` r186 | Flyer de precios en WebGL (import dinámico) |
| `@fontsource/italiana`, `@fontsource-variable/jost` | Fuentes self-hosted |
| `@astrojs/check`, `typescript`, `@types/*` | `npm run check` |

## Carpetas

```
src/
├── assets/work/              fotos del portafolio (procesadas por astro:assets)
├── components/
│   ├── layout/               Header, Menu, SectionTicker, Footer
│   ├── sections/             Hero, Essence, Designs, Available, Services, Appointment, NotFound
│   ├── blocks/               PriceFlyer (WebGL + respaldo), PriceList (HTML)
│   ├── ui/                   Wordmark, Button, ArrowCircle, SectionHeading, WordReveal, FigCaption
│   │   └── icons/            InstagramIcon, WhatsAppIcon
│   ├── seo/                  Seo.astro (<head>: meta, OG, canonical, JSON-LD)
│   └── islands/
│       ├── gallery/          DesignGallery, GalleryRow, GalleryCard, Lightbox, types, groups (solo servidor), gallery.css
│       └── contact/          ContactForm, StepText, StepChoice, StepSummary, StepHeader, FormProgress, message, contact.css
├── data/                     site.ts, work.ts, services.ts, seo.ts, contactForm.ts, wordmark.ts
├── layouts/Layout.astro      <head>, slot "fixed", wrapper de ScrollSmoother
├── pages/                    index, 404, robots.txt, sitemap.xml, llms.txt
├── scripts/
│   ├── menu.ts, ticker.ts
│   ├── motion/               gsap, smooth, reveal, hero, pointerDepth, footer
│   └── webgl/                priceFlyer, pushPin, flyerTexture, shaders/*.glsl
└── styles/global.css         tokens, reset, utilidades, estados iniciales de animación
```

## Convenciones

- **Páginas** solo componen. `index.astro` pone Header, Menu y SectionTicker en `slot="fixed"`, fuera del contenido que transforma ScrollSmoother.
- **Secciones** leen de `src/data/` y delegan en `blocks/` o `ui/`. Cada sección declara `data-section` y `data-section-label` para el ticker.
- **Estilos**: `<style>` scoped en cada `.astro`, con nombres BEM. Si un hijo renderiza el elemento (p. ej. `WordReveal`), el padre usa `:global()` acotado.
- **Scripts**: el componente hace `import { initX } from '../../scripts/...'` y llama `initX(elemento)`.
- **React** solo para estado real. Algo con `position: fixed` dentro de una isla va con portal a `body`, porque ScrollSmoother transforma el contenido.
- **Imágenes** siempre desde `src/assets/`: `<Image>` con `widths` y `sizes`, o `getImage()` para pasarlas a una isla o a OG.
- **Datos**: las fotos se referencian por id con `byId('novia-salon')`; la galería lee `pieces` (una prenda con varias fotos). Ver `docs/content/portfolio.md`.

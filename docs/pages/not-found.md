# Página 404 (`src/pages/404.astro`)

- Usa la gramática del hero (`sections/NotFound.astro`):
  - collage de 3 fotos que reaccionan al cursor (`pointerDepth.ts`);
  - "404" gigante en Italiana como wordmark;
  - texto vertical terracota: "Esta página se descosió.";
  - índice numerado: inicio, diseños, agenda tu cita y WhatsApp.
- Reutiliza la entrada del hero (`scripts/motion/hero.ts`) con los mismos `data-photo`, `data-letter`, `data-intro` y `data-wordmark`.
- No incluye Header ni Menu: lleva su propia marca que enlaza a `/`. Los enlaces a secciones son `/#id` y `smooth.ts` desplaza al llegar.
- SEO: `noindex, follow`, sin canonical, sin JSON-LD y fuera del sitemap. Title: "Página no encontrada | Anter House".
- Astro la genera como `dist/404.html`. En dev responde con status 404 real; en Vercel se sirve igual.

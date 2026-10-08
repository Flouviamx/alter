# SEO

Basado en las skills `seo-audit`, `schema-markup` y `ai-seo` (`~/Desktop/Claude Skills/marketingskills-main/skills/`).

## Dominio: una sola fuente

`astro.config.mjs` define `site` a partir de `SITE_URL`. **Provisional:** `https://anter-house.vercel.app`. Hay que confirmar el dominio con la clienta y hacer el build con `SITE_URL=https://… npm run build`, o cambiar el valor por defecto. Canonical, `og:url`, `og:image`, el sitemap, robots y el JSON-LD salen de ahí.

## `<head>`: `components/seo/Seo.astro`

| Elemento | Valor / regla |
|---|---|
| Title | `Vestidos a la medida y de novia en Monterrey \| Anter House`: 50–60 caracteres, keyword primero, sin guiones largos |
| Description | 150–160 caracteres con keyword y CTA (`data/seo.ts`) |
| Canonical | URL absoluta autorreferente (se omite si `noindex`) |
| Open Graph / Twitter | `website`, `es_MX` e imagen 1200×630 recortada en build de `novia-salon` |
| H1 | Oculto visualmente detrás del wordmark: "Anter House: vestidos a la medida y de novia en Monterrey" |

## JSON-LD (`data/seo.ts → buildJsonLd`)

- `@graph` con `WebSite` y `ClothingStore`. No existe un tipo "Dressmaker"; `ClothingStore` es el más cercano.
- Lleva `hasOfferCatalog` con los servicios y **cada precio de `priceList`**, generados desde `services.ts`, así que coinciden con lo visible.
- Se omiten a propósito, porque no los tenemos: `streetAddress`, `postalCode`, `geo`, `openingHoursSpecification`, `priceRange` y `aggregateRating`. No inventarlos.
- Validar con Rich Results Test y validator.schema.org después de cada cambio.

## Archivos generados (`src/pages/`)

| Ruta | Archivo | Contenido |
|---|---|---|
| `/robots.txt` | `robots.txt.ts` | `Allow: /` para todos (incluidos los crawlers de IA) + sitemap absoluto |
| `/sitemap.xml` | `sitemap.xml.ts` | Solo URLs canónicas indexables (`/`), con `lastmod` de build. La 404 y las anclas no van |
| `/llms.txt` | `llms.txt.ts` | Resumen para buscadores con IA: servicios, precios en MXN y contacto, desde los mismos datos |

## Contenido on-page

- Los precios están en HTML real (`PriceList`), aunque visualmente se muestre el WebGL.
- Alt descriptivo en cada pieza (`data/work.ts`).
- El nombre, teléfono y zona son los mismos en el footer, el schema y `llms.txt`.

## Pendiente con la clienta

- Dominio de producción.
- Dirección completa, código postal y horario, o confirmar que atiende por zona.
- Logo en SVG/PNG.
- Precios de vestidos (rangos) y tiempos de entrega.
- Nombre y trayectoria de la diseñadora (E-E-A-T).
- Si existe un perfil de Google Business y si el WhatsApp recibe llamadas.

## Después del deploy

- Dar de alta el sitio en Google Search Console y Bing Webmaster Tools y enviar el sitemap.
- Crear o vincular el perfil de Google Business; es lo más importante para SEO local.
- Revisar una vez al mes cómo responden ChatGPT, Perplexity y Google a "vestidos de novia a la medida Monterrey".

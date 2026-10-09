# Landing (`src/pages/index.astro`)

Todo sobre fondo salvia continuo. Orden:

| # | Sección | Archivo | Qué hace |
|---|---|---|---|
| — | Hero | `sections/Hero.astro` | Collage de 4 fotos, texto vertical "Hecho a tu medida, puntada a puntada.", "est. 2024" bajo la foto principal, índice numerado (lee `nav`) y wordmark SVG `ANTER / HOUSE / bespoke fashion` |
| 01 | Nuestra esencia | `sections/Essence.astro` | Página de revista: manifiesto con capital que se ilumina con el scroll, cuerpo a dos columnas, cita destacada y collage de 3 fotos con pies "Fig. n" |
| 02 | Diseños | `sections/Designs.astro` + isla `gallery/` | Grupos según el boceto de la clienta (Novias, Fiesta): título + tira horizontal de fotos por grupo; lightbox con todas |
| 03 | Servicios | `sections/Services.astro` | Filas de índice con foto que sigue al cursor y el flyer de precios en WebGL |
| 04 | Agenda tu cita | `sections/Appointment.astro` | Compacta y sin fotos: encabezado, directorio y contacto directo a la izquierda; formulario tipo Typeform que abre WhatsApp a la derecha |
| — | Footer | `layout/Footer.astro` | Enlaces y contacto, y el wordmark gigante que se arma con el scroll |

## Copy

Toda la copy es un **borrador** que hay que validar con la clienta:

- Manifiesto y cuerpo de Esencia.
- Los tres textos de servicios (`data/services.ts`).
- Títulos de las piezas (`data/work.ts`).
- Textos de Cita.

## Ideas para siguientes iteraciones

- Sección de proceso (cita, medidas, pruebas, entrega) si la clienta lo quiere.
- FAQ visible (tiempos de entrega, express, cómo agendar), que además sumaría `FAQPage` al schema (ver `docs/seo.md`).
- Página por pieza o por colección si el portafolio crece.

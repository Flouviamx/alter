# Landing (`src/pages/index.astro`)

Todo sobre fondo salvia continuo. Orden:

| # | Sección | Archivo | Qué hace |
|---|---|---|---|
| — | Hero | `sections/Hero.astro` | Collage de 4 fotos de la sesión del taller (manos drapeando satín, aguja de la máquina, la diseñadora bocetando en blanco y negro, mesa de costura), texto vertical "Hecho a tu medida, puntada a puntada.", "est. 2024" bajo la foto principal, índice numerado (lee `nav`) y wordmark SVG `ANTER / HOUSE / bespoke fashion` |
| 01 | Nuestra esencia | `sections/Essence.astro` | Página de revista: manifiesto con capital que se ilumina con el scroll, cuerpo a dos columnas, cita destacada y collage de 3 fotos de la diseñadora en el taller con pies "Fig. n" |
| — | Proceso | `sections/Process.astro` | Cuatro pasos (Boceto, Patrón, Prueba, Costura) con foto del photoshoot, en columnas escalonadas con índice numerado. Datos en `data/process.ts`. Continúa a Esencia, así que no lleva número en el ticker ni entrada en el menú |
| 02 | Diseños | `sections/Designs.astro` + isla `gallery/` | Grupos según el boceto de la clienta (Novias, Fiesta): título + tira horizontal por grupo, una tarjeta por vestido (sus fotos se hojean con el mouse); lightbox con todas las fotos |
| 03 | Piezas disponibles | `sections/Available.astro` + isla `gallery/` | Prendas terminadas a la venta, en dos grupos (Vestidos, Blusas y tops) con la misma galería de Diseños; un modelo en dos colores es una sola tarjeta. Botón "Preguntar" a WhatsApp |
| 04 | Servicios | `sections/Services.astro` | Solo la etiqueta "Servicios" (sin título), filas de índice sin fotos y el flyer de precios en WebGL titulado "Servicios" |
| 05 | Agenda tu cita | `sections/Appointment.astro` | Compacta y sin fotos: encabezado, directorio y contacto directo a la izquierda; formulario tipo Typeform que abre WhatsApp a la derecha |
| — | Footer | `layout/Footer.astro` | Enlaces y contacto, y el wordmark gigante que se arma con el scroll |

## Copy

Toda la copy es un **borrador** que hay que validar con la clienta:

- Manifiesto y cuerpo de Esencia.
- Los tres textos de servicios (`data/services.ts`): ya los dictó la clienta (2026-10-12).
- Títulos de las piezas de Fiesta (`data/work.ts`); los de Novias y Disponibles los dio la clienta.
- Título e intro de Piezas disponibles ("Listas para estrenar.", "Prendas terminadas en el taller…").
- Título y textos de Proceso ("Así nace cada pieza." y los cuatro pasos en `data/process.ts`).
- Textos de Cita.

## Ideas para siguientes iteraciones

- FAQ visible (tiempos de entrega, express, cómo agendar), que además sumaría `FAQPage` al schema (ver `docs/seo.md`).
- Página por pieza o por colección si el portafolio crece.

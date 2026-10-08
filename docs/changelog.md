# Changelog

## 2026-10-07: v0.4 (formulario y móvil)

- Agenda tu cita: sección compacta sin fotos con un formulario tipo Typeform.
  - 5–6 preguntas, con la de express condicional; resumen editable.
  - Arma el mensaje de WhatsApp. Ver `docs/experience/contact-form.md`.
- Statement: la nota "Del taller" queda solo en texto. Se quitaron fotos repetidas (Statement usa champagne + fucsia).
- Móvil:
  - auditoría a 375 y 360 px sin desbordes;
  - velo en el header para que el contenido no se encime;
  - ticker en píldora;
  - se oculta el pie vertical del Statement.
- `site.ts` exporta `whatsappLink(message)`.

## 2026-10-07: v0.3.2 (Statement compuesto)

- Statement: foto suelta arriba a la derecha y nota "Del taller" con foto abajo a la izquierda para llenar las esquinas vacías; pie vertical en la foto central.
- Nuevo `ui/FigCaption.astro`, compartido por Esencia y Statement.

## 2026-10-07: v0.3.1 (Esencia editorial)

- Esencia maquetada como revista de moda:
  - capital terracota en el manifiesto;
  - cuerpo a dos columnas con entrada en versalitas;
  - cita destacada con filete;
  - pies de foto "Fig. 1/2/3" en el collage.
- Se eliminó la fila de valores numerados.
- `WordReveal` acepta `dropCap`.

## 2026-10-07: v0.3 (WebGL, SEO, 404)

- Flyer de precios en Three.js:
  - papel con shader (ondula, se curva, hendidura con el cursor);
  - chinche roja 3D con clearcoat y reflejos de entorno;
  - la hoja cuelga y se mece alrededor de la chinche;
  - el canvas sangra para no recortar la hoja;
  - movimiento sutil y amortiguado.
- Íconos de Instagram y WhatsApp en el header, el menú, los botones de Cita y el footer.
- SEO:
  - componente `Seo.astro` con canonical, OG, Twitter y JSON-LD (`ClothingStore` + catálogo de precios);
  - H1 con keyword;
  - `robots.txt`, `sitemap.xml` y `llms.txt` generados desde los datos.
- Página 404 con estética de hero, `noindex` y status 404 real.
- `SITE_URL` en `astro.config.mjs` como fuente única del dominio (provisional).

## 2026-10-07: v0.2 (rediseño con la estética del hero)

- Fondo salvia continuo; se eliminaron las bandas de color entre secciones.
- Escala tipográfica contenida y secciones más cortas.
- ScrollSmoother; reveals atados al scroll (`data-clip`, `data-words`, `data-parallax`).
- Diseños: galería horizontal fijada con contador, filtros y lightbox (portal).
- Servicios: filas de índice con foto que sigue al cursor.
- Navegación nueva: header flotante, menú a pantalla completa con preview y ticker de sección.
- Etiquetas de sección en Italiana terracota en lugar de `03 —— SERVICIOS`.
- Footer con el wordmark que se arma con el scroll.

## 2026-10-07: v0.1

- Proyecto Astro 7 + React 19 + GSAP.
- Identidad extraída del logo y del flyer (paleta, tipografía).
- Primera landing.

## Pendientes

- Confirmar el dominio de producción y otros datos de la clienta (ver `docs/seo.md`).
- Logo vectorial y nombre de la fuente original.
- Validar la copy y los títulos de las piezas.
- Si se agrega una FAQ: sumar `FAQPage` al schema.
- Configurar el deploy en Vercel.

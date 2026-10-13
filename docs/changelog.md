# Changelog

## 2026-10-12: v0.7 (galería: Flip y satín)

- **Lightbox con GSAP Flip:**
  - al tocar una pieza, la foto vuela desde su tarjeta hasta pantalla completa;
  - al cerrar (botón, Esc o clic fuera) regresa a su tarjeta;
  - mientras carga la versión grande se ve la miniatura, así el vuelo nunca muestra un hueco;
  - el fondo es una capa aparte que se funde sin afectar la foto;
  - con reduced motion abre y cierra sin animación.
- **Efecto satín (WebGL puro):**
  - al hojear las fotos de una tarjeta con el mouse, una ola de tela cruza la imagen, la pliega levemente y deja un brillo tenue antes de mostrar la foto nueva;
  - usa un solo canvas para toda la página y replica el recorte de cada foto;
  - el fundido CSS queda como respaldo sin WebGL y con reduced motion.
- Se probaron y descartaron, por decisión del equipo:
  - un hilo de puntada animado (hero y separadores);
  - una etiqueta colgante "Disponible" en Piezas disponibles.

## 2026-10-12: v0.6 (segunda ronda de la clienta)

- **Diseños, Novias:**
  - una tarjeta por vestido: "Vestido de novia" (2 fotos) y "Despedida" (3 fotos), en lugar de 5 fotos sueltas que parecían vestidos distintos;
  - al pasar el mouse se hojean las fotos del mismo vestido, con rayitas que indican cuántas hay; el lightbox recorre foto por foto;
  - títulos cortos, sin descripción.
- `data/work.ts` separa `photos` (fotos sueltas, `byId`) de `pieces` (prendas con varias fotos). El título descriptivo de cada foto pasó a `caption`, que solo usa Esencia.
- **Servicios:**
  - se quitó la foto que seguía al cursor (`hoverPreview.ts` eliminado);
  - se quitó el título "Del boceto al último ajuste."; queda la etiqueta "Servicios";
  - la hoja de precios (HTML y WebGL) se titula "Servicios" (`priceListTitle`);
  - textos de la clienta: Vestidos a la medida (cocktail y fiesta), Novias (novias, mamás y hermanas de los novios, despedidas y civiles), Ajustes (bastillas, ajustes de talle, cambio de cierres y enmiendas).
- Formulario: opciones "Vestido de cocktail o fiesta" y "Ajustes", alineadas con los servicios.
- **Piezas disponibles** (sección nueva 03, `sections/Available.astro`):
  - prendas a la venta del correo "Completo": Vestidos (ivory y negro, verde y café) y Blusas y tops (top negro y blanco, blusa negra y café, blusa lila y pantalón negro);
  - misma galería que Diseños; cada modelo en dos colores es una tarjeta que se hojea;
  - botón "Preguntar" a WhatsApp;
  - en el menú, el hero y el ticker; Servicios pasa a 04 y Cita a 05.
- Fotos nuevas del correo "Fotos":
  - Fiesta suma "Lila con capa" y "Fucsia strapless con olán" (3 fotos cada una);
  - la novia de espaldas (`novia-espalda`) es el mismo vestido de novia, así que es su tercera foto.
- `islands/gallery/groups.ts` arma los grupos de cada sección (`categories[].section`).
- Fotos nuevas enderezadas, a 2400 px y sin metadatos (GPS).
- Servicios: `overflow-x: clip` para que el canvas del flyer no cree scroll horizontal en móvil con reduced motion (ya pasaba antes).
- **Hero:** las 4 fotos ahora son de la sesión del taller, como pidió la clienta para la página de inicio:
  - principal: manos drapeando satín rosa;
  - aguja de la máquina con hilo rosa;
  - la diseñadora prendiendo alfileres en el maniquí;
  - mesa de costura, recortada para quitar el desenfoque del primer plano.
  Se usan como `proceso-*` en `photos`, sin ser piezas, y el hero ahora respeta `focus`. Los vestidos que estaban en el hero siguen en la galería. Se descartaron, por menos pulidas, la foto de la diseñadora de frente (IMG_3862) y la caja de hilos (IMG_3867).

## 2026-10-08: v0.5 (cambios de la clienta)

- **Logo:** el wordmark `ANTER` ahora es un SVG reconstruido del logo original (97–99 % de coincidencia por letra), en hero, header, footer, 404, tarjeta de precios y flyer WebGL. En el hero es más chico.
- **Hero:**
  - se quitó la nota bajo el índice ("Moda a la medida en Monterrey…");
  - se agregó "est. 2024" bajo la foto del vestido blanco;
  - se conserva la frase "puntada a puntada".
- **Esencia:**
  - "Proceso personalizado:" como entrada;
  - "quede" en vez de "cae", "prenda" en vez de "vestido";
  - sin "y se termina a mano, puntada por puntada".
- Se eliminó la sección Statement ("Hecho a tu medida").
- **Diseños:**
  - por grupos según el boceto de la clienta (Novias, Fiesta), cada uno con su tira horizontal;
  - sin filtros ni recorrido fijado;
  - "noche" y "taller" se fusionan en Fiesta.
- Pendiente: la clienta mandará fotos nuevas de una sesión del taller para el hero.

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

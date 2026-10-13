# Contenido: portafolio, precios y contacto

## Fotos y piezas (`src/data/work.ts`)

`work.ts` separa dos cosas:

- **`photos`**: cada foto suelta (`id`, `image`, `alt`, `caption`, `focus`). Hero, Esencia, 404, menú y OG las piden con `byId('novia-salon')`. `caption` es el pie editorial que usa Esencia.
- **`pieces`**: cada prenda real (`id`, `title`, `category`, `photos`). La galería muestra **una tarjeta por pieza**; si tiene varias fotos, se hojean con el mouse y el lightbox las recorre todas. La primera foto es la portada.

Los grupos salen de `categories`; cada uno dice en qué sección va (`section`):

- **Diseños** (`disenos`): Novias y Fiesta (boceto de la clienta). Las piezas en maniquí (terracota, champagne) van en Fiesta. Los nombres de archivo `noche-*` y `taller-*` son históricos.
- **Piezas disponibles** (`disponibles`): Vestidos y Blusas y tops. Son prendas a la venta; un modelo en dos colores es **una** pieza (así las agrupó la clienta).

`islands/gallery/groups.ts → galleryGroups(section)` arma los grupos con las imágenes optimizadas para cada sección.

Fotos en `src/assets/work/`. Las nuevas se procesan con sharp: se enderezan según EXIF, se limitan a 2400 px y se guardan **sin metadatos** (las fotos de celular traen ubicación GPS). Astro genera los tamaños responsive.

| Pieza | Título | Grupo | Fotos (la primera es portada) |
|---|---|---|---|
| `novia` | Vestido de novia | novias | `novia-salon`, `novia-alcatraces`, `novia-espalda` |
| `despedida` | Despedida | novias | `novia-terraza`, `novia-espejo`, `novia-detalle` |
| `lila` | Lila con capa | fiesta | `fiesta-lila-frente`, `fiesta-lila-capa`, `fiesta-lila-vuelo` |
| `fucsia-olan` | Fucsia strapless con olán | fiesta | `fiesta-fucsia-olan`, `-pose`, `-entrada` |
| `negro` | Strapless negro con rosa | fiesta | `noche-negro` |
| `terracota` | Satín terracota, un hombro | fiesta | `taller-terracota` |
| `azul` | Azul rey, hombros caídos | fiesta | `noche-azul` |
| `champagne` | Champagne drapeado | fiesta | `taller-champagne` |
| `fucsia` | Fucsia con flores 3D | fiesta | `noche-fucsia` (`focus` hacia la prenda) |
| `coral` | Shantung coral con lazo | fiesta | `noche-coral` |
| `vestido-ivory-negro` | Vestido ivory y negro | vestidos | `disponible-ivory-frente/espalda`, `disponible-negro-frente/espalda` |
| `vestido-verde-cafe` | Vestido verde y café | vestidos | `disponible-verde-frente/espalda`, `disponible-cafe-frente/espalda` |
| `top-negro-blanco` | Top negro y blanco | blusas | `disponible-top-negro`, `disponible-top-blanco` |
| `blusa-negra-cafe` | Blusa negra y café | blusas | `disponible-blusa-negra`, `disponible-blusa-cafe` |
| `blusa-lila` | Blusa lila y pantalón negro | blusas | `disponible-blusa-lila` |

Títulos: Novias y Disponibles los dio la clienta (2026-10-12); los de Fiesta son provisionales.

Las fotos `proceso-*` (sesión del taller) están en `photos` pero no en `pieces`: solo las usa el hero. Si una foto necesita encuadre, `focus` también se aplica en el hero.

### Uso fuera de la galería (sin repetir)

| Sección | Fotos |
|---|---|
| Hero | proceso-manos, proceso-maquina, proceso-alfileres, proceso-mesa (sesión del taller, no son piezas) |
| Esencia | novia-salon, novia-detalle, novia-espejo |
| Galería | todas |

El preview del menú es efímero y puede repetir (Piezas disponibles usa `disponible-verde-frente`). Servicios, Cita y footer no llevan fotos.

### Agregar una pieza

1. Procesa cada foto (enderezar, 2400 px, sin metadatos) y cópiala a `src/assets/work/categoria-descripcion.jpg`.
2. Impórtalas en `work.ts` y agrega un objeto por foto en `photos` (`id`, `image`, `alt`, `caption` y, si hace falta, `focus`).
3. Agrega la pieza en `pieces` con sus ids de foto en orden. Fotos del mismo vestido van en **una sola pieza**, nunca como piezas separadas.
4. La galería y el lightbox se actualizan solos.

## Precios (`src/data/services.ts`)

Vienen del flyer "Confección y ajustes" (`docs/brand/refs/flyer-confeccion-ajustes.jpg`), en MXN. La hoja se titula "Servicios" (`priceListTitle`) por petición de la clienta. Al cambiar un precio se actualizan la lista HTML, la textura WebGL, el JSON-LD y `llms.txt`.

## Contacto (`src/data/site.ts`)

- WhatsApp: 81 1719 7371 (enlace `wa.me` con mensaje prellenado).
- Instagram: @anter_house.
- Zona: Costco Las Torres, Monterrey, N.L. Solo con cita previa.

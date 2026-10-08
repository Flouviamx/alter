# Contenido: portafolio, precios y contacto

## Fotos (`src/assets/work/`)

Los originales están en `~/Desktop/inspo`. Se copiaron con un lado máximo de 2400 px; Astro genera los tamaños responsive.

| Archivo | Categoría | Título provisional |
|---|---|---|
| `novia-salon.jpg` | novias | Novia, escote barco y moño |
| `novia-terraza.jpg` | novias | Civil con flores aplicadas |
| `novia-espejo.jpg` | novias | Satín y cola lateral |
| `novia-alcatraces.jpg` | novias | Detalle de cintura plisada |
| `novia-detalle-flores.jpg` | novias | Flores aplicadas a mano |
| `noche-negro-rosa.jpg` | noche | Strapless negro con rosa |
| `noche-azul-rey.jpg` | noche | Azul rey, hombros caídos |
| `noche-fucsia-flores.jpg` | noche | Fucsia con flores 3D (`focus` hacia la prenda) |
| `noche-coral-lazo.jpg` | noche | Shantung coral con lazo |
| `taller-terracota.jpg` | taller | Satín terracota, un hombro |
| `taller-champagne.jpg` | taller | Champagne drapeado |

Hay que confirmar títulos y detalles (telas, ocasión) con la clienta.

### Uso fuera de la galería (sin repetir)

| Sección | Piezas |
|---|---|
| Hero | novia-terraza, noche-negro, taller-terracota, novia-alcatraces |
| Esencia | novia-salon, novia-detalle, novia-espejo |
| Statement | taller-champagne, noche-fucsia |
| Galería | todas |

Los previews de Servicios (hover) y del menú son efímeros y pueden repetir. Cita y footer no llevan fotos.

### Agregar una pieza

1. Copia la foto a `src/assets/work/categoria-descripcion.jpg`.
2. Impórtala en `src/data/work.ts` y agrega un objeto con `id`, `title`, `category`, `image`, `alt` y, si hace falta, `focus`.
3. La galería, el lightbox y los filtros se actualizan solos.

## Precios (`src/data/services.ts`)

Vienen del flyer "Confección y ajustes" (`docs/brand/refs/flyer-confeccion-ajustes.jpg`), en MXN. Al cambiar un precio se actualizan la lista HTML, la textura WebGL, el JSON-LD y `llms.txt`.

## Contacto (`src/data/site.ts`)

- WhatsApp: 81 1719 7371 (enlace `wa.me` con mensaje prellenado).
- Instagram: @anter_house.
- Zona: Costco Las Torres, Monterrey, N.L. Solo con cita previa.

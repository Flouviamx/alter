# Movimiento (GSAP)

Principio: **elegante y amortiguado**. El movimiento acompaña al scroll; nunca compite con las fotos.

## Base

- `src/scripts/motion/gsap.ts` registra ScrollTrigger y ScrollSmoother una sola vez y exporta `MOTION_OK` y `motionAllowed()`.
- Todo efecto vive dentro de `gsap.matchMedia().add(MOTION_OK, …)`. Con reduced motion no se anima nada y el contenido queda visible.

## Scroll suave: `smooth.ts`

- ScrollSmoother con `smooth: 1.1` y `effects: false`; usamos atributos propios, no `data-speed`.
- `Layout.astro` envuelve el contenido en `#smooth-wrapper > #smooth-content`. Los elementos fijos van en `slot="fixed"`, fuera del wrapper.
- Las anclas `a[href^="#"]` se interceptan solo si el destino existe en la página. Al llegar con un hash (p. ej. `/#cita`), se desplaza al cargar.
- `lockScroll(true|false)` pausa el smoother; lo usan el menú y el lightbox.

## Anti-parpadeo

1. Un script inline en `<head>` añade `.js` a `<html>`.
2. `global.css`, solo bajo `prefers-reduced-motion: no-preference`, define los estados iniciales: `[data-reveal]` (opacity 0, y 28px), `[data-clip]` (clip-path cerrado) y `[data-words] .word` (opacity 0.18).
3. GSAP anima hacia el estado final con `gsap.to` o `fromTo`. No uses `gsap.from(..., { immediateRender: false })`.

## Atributos declarativos (`reveal.ts`)

| Atributo | Efecto |
|---|---|
| `data-reveal` (+ `data-reveal-delay`) | Fade y subida una vez al entrar (batch) |
| `data-clip` | La imagen se destapa de abajo hacia arriba y el `img` interno pasa de 1.22 a 1, con scrub |
| `data-parallax="-0.15"` | Desplazamiento `yPercent` mientras cruza el viewport |
| `data-words` | Cada `.word` se ilumina con el scroll; lo genera `ui/WordReveal.astro` |

## Efectos por componente

| Script | Dónde | Qué hace |
|---|---|---|
| `hero.ts` | Hero y 404 | Fotos con clip-path (`data-photo`), letras con stagger (`data-letter`, spans o paths del SVG) y parallax (`data-drift`, puede envolver foto + pie) |
| `pointerDepth.ts` | 404 | Fotos con profundidad según el cursor (`data-depth`) |
| `footer.ts` | Footer | El wordmark se arma letra por letra con el scroll |
| `DesignGallery.tsx` | Diseños y Piezas disponibles | Las tarjetas de cada grupo suben en cascada al entrar |
| `islands/gallery/transitions.ts` | Lightbox | GSAP Flip: la foto vuela de la tarjeta al lightbox y regresa al cerrar |
| `webgl/satin.ts` | Tarjetas de la galería | Al hojear fotos con el mouse, una ola de satín cruza la imagen (ver `docs/experience/webgl.md`) |

## Galería (detalles)

- Cada grupo (Novias, Fiesta) es una tira con scroll horizontal nativo y `scroll-snap`; no hay pin ni scroll secuestrado.
- Una tarjeta por vestido. Si tiene varias fotos, la posición del mouse sobre la foto elige cuál se ve y unas rayitas abajo indican cuántas hay. Cada cambio pasa con la ola de satín (WebGL) sobre un fundido CSS de 0.6 s, que es el respaldo sin WebGL. Al salir, la portada vuelve solo con el fundido. En touch no hay hojeo: al tocar se abre el lightbox, que recorre foto por foto.
- **Lightbox con Flip:** la tarjeta (`.gallery__media`) y la foto del lightbox (`.lightbox__media`) comparten `data-flip-id`.
  - Al abrir, la foto crece desde el lugar exacto de la tarjeta mientras el fondo se oscurece. Los botones y el pie aparecen al final.
  - Mientras carga la foto grande se ve la miniatura en caché, así el vuelo nunca muestra un hueco.
  - Al cerrar, si la tarjeta está a la vista la foto regresa a ella (y se funde si la tarjeta muestra otra foto); si no, todo se desvanece.
- Las flechas solo aparecen si la tira desborda. El borde derecho se desvanece (máscara) mientras quedan piezas por ver.
- Con reduced motion no hay cascada de entrada, las fotos cambian sin fundido, el lightbox abre y cierra sin vuelo y las flechas desplazan sin animación.

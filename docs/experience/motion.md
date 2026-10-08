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
| `hero.ts` | Hero y 404 | Fotos con clip-path, letras con stagger y parallax (`data-drift`) |
| `statement.ts` | Statement | "Hecho a" y "tu medida" se cruzan en sentidos opuestos |
| `hoverPreview.ts` | Servicios | Foto flotante que sigue al cursor (solo con hover real) |
| `pointerDepth.ts` | 404 | Fotos con profundidad según el cursor (`data-depth`) |
| `footer.ts` | Footer | El wordmark se arma letra por letra con el scroll |
| `DesignGallery.tsx` | Diseños | Pin + recorrido horizontal, parallax interno (`containerAnimation`) y contador |

## Galería horizontal (detalles)

- El trigger fijado usa `refreshPriority: 1` y luego `ScrollTrigger.refresh()`, para que los triggers de abajo midan con el pin-spacer incluido.
- Con `revertOnUpdate`, el pin se reconstruye al cambiar de filtro. Si el usuario estaba a mitad del recorrido, vuelve al inicio de la galería.
- Con reduced motion no hay pin: la galería es un scroll horizontal nativo.

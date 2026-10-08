// Profundidad con el cursor: cada [data-depth="0.4"] se desplaza según su profundidad.
// Solo con hover real y movimiento permitido.
import { gsap, MOTION_OK } from './gsap';

export function initPointerDepth(root: HTMLElement) {
  gsap.matchMedia().add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
    const layers = gsap.utils.toArray<HTMLElement>('[data-depth]', root).map((el) => ({
      depth: Number(el.dataset.depth),
      x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
    }));

    const onMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      layers.forEach((layer) => {
        layer.x(nx * 60 * layer.depth);
        layer.y(ny * 40 * layer.depth);
      });
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  });
}

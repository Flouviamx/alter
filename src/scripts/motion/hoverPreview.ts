// Foto flotante que sigue al cursor sobre una lista de filas.
//   [data-hover-row="i"]   fila que activa la imagen i
//   [data-hover-figure]    contenedor flotante (posición absoluta dentro de `root`)
//   [data-hover-img="i"]   imagen i dentro del contenedor
// Solo en dispositivos con hover real y movimiento permitido.
import { gsap, MOTION_OK } from './gsap';

export function initHoverPreview(root: HTMLElement) {
  gsap.matchMedia().add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
    const figure = root.querySelector<HTMLElement>('[data-hover-figure]');
    const images = root.querySelectorAll<HTMLElement>('[data-hover-img]');
    const rows = root.querySelectorAll<HTMLElement>('[data-hover-row]');
    if (!figure) return;

    gsap.set(figure, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0, rotate: -4 });
    const moveX = gsap.quickTo(figure, 'x', { duration: 0.6, ease: 'power3.out' });
    const moveY = gsap.quickTo(figure, 'y', { duration: 0.6, ease: 'power3.out' });

    const onMove = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      moveX(event.clientX - box.left);
      moveY(event.clientY - box.top);
    };

    const show = (index: string) => {
      images.forEach((img) => gsap.to(img, { opacity: img.dataset.hoverImg === index ? 1 : 0, duration: 0.35 }));
      gsap.to(figure, { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: 'power3.out' });
    };

    const hide = () => gsap.to(figure, { scale: 0.6, opacity: 0, rotate: -4, duration: 0.4, ease: 'power2.in' });

    rows.forEach((row) => row.addEventListener('pointerenter', () => show(row.dataset.hoverRow!)));
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', hide);

    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', hide);
    };
  });
}

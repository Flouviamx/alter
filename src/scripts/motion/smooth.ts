// Scroll suave con ScrollSmoother + navegación por anclas.
// Con reduced motion no se crea el smoother y todo cae al scroll nativo.
import { gsap, ScrollSmoother, motionAllowed } from './gsap';

let smoother: ScrollSmoother | null = null;

export function initSmooth() {
  if (motionAllowed()) {
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.1,
      smoothTouch: 0.1,
      effects: false,
    });
  }

  document.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#' || !document.querySelector(hash)) return;
    event.preventDefault();
    scrollToTarget(hash);
  });

  // Llegada con ancla desde otra página (p. ej. /#cita desde la 404).
  if (location.hash) {
    window.addEventListener('load', () => requestAnimationFrame(() => scrollToTarget(location.hash)), { once: true });
  }
}

/** Desplaza a un selector (#id). Usa el smoother si existe. */
export function scrollToTarget(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  if (smoother) smoother.scrollTo(target, true, 'top top');
  else target.scrollIntoView({ behavior: motionAllowed() ? 'smooth' : 'auto' });

  history.replaceState(null, '', hash);
}

/** Pausa/reanuda el scroll (menú y lightbox). */
export function lockScroll(locked: boolean) {
  if (smoother) smoother.paused(locked);
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export { gsap };

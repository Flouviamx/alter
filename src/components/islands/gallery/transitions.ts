// Transiciones del lightbox con GSAP Flip: la foto vuela desde su tarjeta al abrir y regresa a ella al cerrar.
// La tarjeta (.gallery__media) y el lightbox (.lightbox__media) comparten data-flip-id = id de la pieza.
// Con reduced motion no se captura nada y el lightbox abre y cierra sin animación.
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export type FlipOrigin = ReturnType<typeof Flip.getState>;

interface Parts {
  media: HTMLElement;
  backdrop: HTMLElement;
  /** Botones y pie de foto: aparecen cuando la foto ya llegó */
  chrome: Element[];
}

export const motionOk = () => window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

/** Guarda dónde está la tarjeta justo antes de abrir. */
export const captureCard = (card: Element | null): FlipOrigin | null => (card && motionOk() ? Flip.getState(card) : null);

/** La tarjeta se ve en pantalla (y no está escondida fuera de su tira horizontal). */
function isOnScreen(card: Element) {
  const r = card.getBoundingClientRect();
  const track = card.closest('.gallery__track')?.getBoundingClientRect();
  const inTrack = !track || (r.right > track.left + 8 && r.left < track.right - 8);
  return inTrack && r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
}

/** Abrir: la foto sale del lugar exacto de su tarjeta y crece hasta su tamaño final. */
export function openFrom(origin: FlipOrigin | null, { media, backdrop, chrome }: Parts) {
  const tl = gsap.timeline();
  tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0);

  if (origin) {
    tl.add(Flip.from(origin, { targets: media, duration: 0.95, ease: 'power3.inOut' }), 0);
  } else {
    tl.fromTo(media, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0);
  }

  tl.fromTo(chrome, { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power2.out' }, origin ? 0.6 : 0.2);
  return tl;
}

/** Cambiar de foto dentro del lightbox. */
export function swapIn(media: HTMLElement) {
  return gsap.fromTo(media, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
}

/**
 * Cerrar: si la tarjeta está a la vista, la foto regresa a ella; si no, todo se desvanece.
 * `fadePhoto`: la tarjeta muestra otra foto (su portada), así que la que regresa se funde al llegar.
 */
export function closeTo(card: HTMLElement | null, { media, backdrop, chrome }: Parts, fadePhoto: boolean, onDone: () => void) {
  const tl = gsap.timeline({ onComplete: onDone });
  tl.to(chrome, { opacity: 0, duration: 0.25, ease: 'power1.out' }, 0);

  if (card && isOnScreen(card)) {
    tl.add(Flip.fit(media, card, { duration: 0.8, ease: 'power3.inOut' }) as gsap.core.Tween, 0);
    tl.to(backdrop, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 0.15);
    if (fadePhoto) tl.to(media, { opacity: 0, duration: 0.3, ease: 'power1.in' }, 0.5);
  } else {
    tl.to([media, backdrop], { opacity: 0, duration: 0.4, ease: 'power2.out' }, 0);
  }
  return tl;
}

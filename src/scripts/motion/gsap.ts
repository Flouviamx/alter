// Punto único de entrada a GSAP: registra plugins una vez y expone la condición de movimiento.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/** Media query que habilita animaciones. Todo movimiento vive dentro de ella. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export const motionAllowed = () => window.matchMedia(MOTION_OK).matches;

export { gsap, ScrollTrigger, ScrollSmoother };

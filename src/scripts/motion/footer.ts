// Footer: las letras del wordmark suben desde abajo con stagger, atadas al scroll.
import { gsap, MOTION_OK } from './gsap';

export function initFooter(footer: HTMLElement) {
  gsap.matchMedia().add(MOTION_OK, () => {
    gsap.fromTo(
      footer.querySelectorAll('[data-footer-letter]'),
      { yPercent: 70, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: footer, start: 'top 85%', end: 'bottom bottom', scrub: 0.6 },
      },
    );
  });
}

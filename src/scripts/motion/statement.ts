// Statement: las dos líneas se desplazan en sentidos opuestos mientras la sección cruza el viewport.
import { gsap, MOTION_OK } from './gsap';

export function initStatement(section: HTMLElement) {
  gsap.matchMedia().add(MOTION_OK, () => {
    section.querySelectorAll<HTMLElement>('[data-statement-line]').forEach((line) => {
      const direction = Number(line.dataset.statementLine);
      gsap.fromTo(
        line,
        { xPercent: -14 * direction },
        {
          xPercent: 14 * direction,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  });
}

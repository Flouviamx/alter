// Ticker de sección: lee [data-section] / [data-section-label] y anima el cambio de texto.
import { gsap, ScrollTrigger, motionAllowed } from './motion/gsap';

export function initTicker(ticker: HTMLElement) {
  const number = ticker.querySelector<HTMLElement>('[data-ticker-n]');
  const label = ticker.querySelector<HTMLElement>('[data-ticker-label]');
  const fill = ticker.querySelector<HTMLElement>('[data-ticker-fill]');
  const hero = document.querySelector<HTMLElement>('#top');
  if (!number || !label || !fill) return;

  const swap = (n: string, text: string) => {
    if (number.textContent === n) return;
    if (!motionAllowed()) {
      number.textContent = n;
      label.textContent = text;
      return;
    }
    gsap
      .timeline()
      .to([number, label], { yPercent: -110, duration: 0.25, ease: 'power2.in' })
      .add(() => {
        number.textContent = n;
        label.textContent = text;
      })
      .fromTo([number, label], { yPercent: 110 }, { yPercent: 0, duration: 0.45, ease: 'power3.out' });
  };

  document.querySelectorAll<HTMLElement>('[data-section]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => self.isActive && swap(section.dataset.section!, section.dataset.sectionLabel!),
    });
  });

  // Visible solo después del hero.
  if (hero) {
    ScrollTrigger.create({
      trigger: hero,
      start: 'bottom 60%',
      onEnter: () => gsap.to(ticker, { opacity: 1, duration: 0.5 }),
      onLeaveBack: () => gsap.to(ticker, { opacity: 0, duration: 0.3 }),
    });
  }

  // Se oculta al llegar al footer para no tapar el cierre.
  const footer = document.querySelector<HTMLElement>('[data-footer]');
  if (footer) {
    ScrollTrigger.create({
      trigger: footer,
      start: 'top 70%',
      onEnter: () => gsap.to(ticker, { opacity: 0, duration: 0.3 }),
      onLeaveBack: () => gsap.to(ticker, { opacity: 1, duration: 0.4 }),
    });
  }

  gsap.to(fill, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
  });
}

// Hero: entrada (fotos con clip-path, letras del wordmark con stagger) y parallax al hacer scroll.
import { gsap, MOTION_OK } from './gsap';

export function initHero(hero: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(MOTION_OK, () => {
    const photos = hero.querySelectorAll<HTMLElement>('[data-photo]');
    const letters = hero.querySelectorAll<HTMLElement>('[data-letter]');
    const intro = hero.querySelectorAll<HTMLElement>('[data-intro]');
    const wordmark = hero.querySelector<HTMLElement>('[data-wordmark]');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(photos, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, stagger: 0.12, ease: 'power4.inOut' })
      .fromTo(
        hero.querySelectorAll('[data-photo] img'),
        { scale: 1.18 },
        { scale: 1, duration: 1.8, stagger: 0.12, ease: 'power2.out' },
        '<',
      )
      .fromTo(letters, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.07 }, '-=1.1')
      .fromTo(
        intro,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power2.out' },
        '-=0.8',
      );

    const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };

    photos.forEach((photo) => {
      const speed = Number(photo.dataset.drift ?? -0.1);
      gsap.to(photo, { yPercent: speed * 100, ease: 'none', scrollTrigger: scrub });
    });

    if (wordmark) {
      gsap.to(wordmark, { yPercent: 18, opacity: 0.35, ease: 'none', scrollTrigger: scrub });
    }
  });
}

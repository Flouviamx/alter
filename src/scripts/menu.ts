// Menú a pantalla completa: apertura con clip-path, líneas con stagger, preview por hover,
// Esc para cerrar y foco devuelto al botón.
import { gsap, motionAllowed } from './motion/gsap';
import { lockScroll } from './motion/smooth';

export function initMenu(menu: HTMLElement, toggle: HTMLButtonElement) {
  const label = toggle.querySelector<HTMLElement>('[data-menu-label]');
  const lines = menu.querySelectorAll<HTMLElement>('[data-menu-line]');
  const fades = menu.querySelectorAll<HTMLElement>('[data-menu-fade]');
  const previews = menu.querySelectorAll<HTMLElement>('[data-menu-preview]');
  let open = false;

  const showPreview = (index: number) => {
    previews.forEach((preview, i) => {
      gsap.to(preview, { opacity: i === index ? 1 : 0, duration: 0.5, ease: 'power2.out' });
    });
    const img = previews[index]?.querySelector('img');
    if (img && motionAllowed()) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 0.9, ease: 'power2.out' });
  };

  const setOpen = (next: boolean) => {
    open = next;
    toggle.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('menu-open', open);
    if (label) label.textContent = open ? 'Cerrar' : 'Menú';
    lockScroll(open);

    const duration = motionAllowed() ? 1 : 0;
    gsap.killTweensOf([menu, lines, fades]);

    if (open) {
      menu.hidden = false;
      showPreview(0);
      gsap
        .timeline()
        .fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration, ease: 'power4.inOut' })
        .fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: duration * 0.9, stagger: 0.07, ease: 'power3.out' }, '-=0.45')
        .fromTo(fades, { opacity: 0 }, { opacity: 1, duration: duration * 0.6 }, '<0.2');
      menu.querySelector<HTMLElement>('[data-menu-link]')?.focus({ preventScroll: true });
    } else {
      gsap.to(menu, {
        clipPath: 'inset(0 0 100% 0)',
        duration: duration * 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          menu.hidden = true;
        },
      });
      toggle.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener('click', () => setOpen(!open));

  menu.querySelectorAll<HTMLAnchorElement>('[data-menu-link]').forEach((link) => {
    const index = Number(link.dataset.index);
    link.addEventListener('mouseenter', () => showPreview(index));
    link.addEventListener('focus', () => showPreview(index));
    // La navegación la resuelve smooth.ts (delegación de clics en anclas); aquí solo se cierra.
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) setOpen(false);
  });
}

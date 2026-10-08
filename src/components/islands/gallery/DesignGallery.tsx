// Galería de diseños: recorrido horizontal fijado al scroll (GSAP ScrollTrigger + pin),
// filtros por categoría y lightbox. Con reduced motion cae a scroll horizontal nativo.
import { useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import FilterTabs from './FilterTabs';
import GalleryCard from './GalleryCard';
import Lightbox from './Lightbox';
import type { Filter, FilterOption, GalleryItem } from './types';
import './gallery.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  items: GalleryItem[];
  filters: FilterOption[];
  label: string;
  title: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function DesignGallery({ items, filters, label, title }: Props) {
  const [filter, setFilter] = useState<Filter>('todo');
  const [openId, setOpenId] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const isFirstRun = useRef(true);

  const visible = useMemo(
    () => items.filter((item) => filter === 'todo' || item.category === filter),
    [items, filter],
  );

  const counts = useMemo(() => {
    const result = { todo: items.length } as Record<Filter, number>;
    for (const option of filters) {
      if (option.id !== 'todo') result[option.id] = items.filter((i) => i.category === option.id).length;
    }
    return result;
  }, [items, filters]);

  // Se reconstruye en cada cambio de filtro (revertOnUpdate) porque cambia el largo del recorrido.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const trackEl = track.current!;
        const viewportEl = viewport.current!;
        const distance = () => Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth);
        const cards = gsap.utils.toArray<HTMLElement>('.gallery__item', trackEl);

        const scroll = gsap.to(trackEl, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            // Se refresca antes que los triggers de abajo para que midan con el pin-spacer incluido.
            refreshPriority: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (counter.current) {
                counter.current.textContent = pad(Math.round(self.progress * (cards.length - 1)) + 1);
              }
            },
          },
        });

        // Parallax interno de cada foto mientras cruza la pantalla.
        cards.forEach((card) => {
          const img = card.querySelector('img');
          if (!img) return;
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true },
            },
          );
        });

        // Entrada de las tarjetas (al cargar y al cambiar de filtro).
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: isFirstRun.current ? { trigger: root.current, start: 'top 75%', once: true } : undefined,
          },
        );

        // Si se filtra a mitad del recorrido, vuelve al inicio de la galería.
        if (!isFirstRun.current) {
          const st = scroll.scrollTrigger!;
          const smoother = ScrollSmoother.get();
          if (st.scroll() > st.start) {
            if (smoother) smoother.scrollTo(st.start, false);
            else window.scrollTo(0, st.start);
          }
        }
        isFirstRun.current = false;
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="gallery">
      <div className="gallery__bar wrap">
        <div className="gallery__heading">
          <p className="gallery__label display">{label}</p>
          <h2 id="disenos-title" className="gallery__title display">
            {title}
          </h2>
        </div>

        <FilterTabs options={filters} active={filter} counts={counts} onChange={setFilter} />

        <p className="gallery__counter" aria-hidden="true">
          <span ref={counter}>01</span> / {pad(visible.length)}
        </p>
      </div>

      <div ref={viewport} className="gallery__viewport">
        <ul ref={track} className="gallery__track">
          {visible.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} onOpen={setOpenId} />
          ))}
        </ul>
      </div>

      {openId && <Lightbox items={visible} activeId={openId} onClose={() => setOpenId(null)} onNavigate={setOpenId} />}
    </div>
  );
}

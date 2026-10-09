// Una fila de la galería: título del grupo + piezas en una tira horizontal.
// Se recorre con trackpad, arrastrando en móvil o con las flechas (solo aparecen si la tira desborda).
import { useEffect, useRef, useState } from 'react';
import GalleryCard from './GalleryCard';
import type { GalleryGroup } from './types';

interface Props {
  group: GalleryGroup;
  onOpen: (id: string) => void;
}

export default function GalleryRow({ group, onOpen }: Props) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ overflow: false, start: true, end: false });
  const headingId = `gallery-${group.id}`;

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setEdges({ overflow: max > 4, start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.gallery__item');
    const step = (card?.offsetWidth ?? 240) * 2;
    const smooth = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    el.scrollBy({ left: step * direction, behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <section className="gallery__group" aria-labelledby={headingId}>
      <header className="gallery__group-head">
        <h3 id={headingId} className="gallery__group-title display">
          {group.label}
          <sup className="gallery__group-count">{String(group.items.length).padStart(2, '0')}</sup>
        </h3>

        {edges.overflow && (
          <div className="gallery__arrows">
            <button type="button" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label={`${group.label}: anteriores`}>
              ←
            </button>
            <button type="button" onClick={() => scrollBy(1)} disabled={edges.end} aria-label={`${group.label}: siguientes`}>
              →
            </button>
          </div>
        )}
      </header>

      <ul ref={track} className="gallery__track" data-edge-start={edges.start} data-edge-end={edges.end}>
        {group.items.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} onOpen={onOpen} />
        ))}
      </ul>
    </section>
  );
}

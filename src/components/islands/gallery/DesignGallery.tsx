// Galería de diseños agrupada por categoría (boceto de la clienta: Novias, Fiesta).
// Cada grupo es una tira horizontal; al hacer clic se abre el lightbox con todas las piezas en orden.
import { useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import GalleryRow from './GalleryRow';
import Lightbox from './Lightbox';
import type { GalleryGroup } from './types';
import './gallery.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  groups: GalleryGroup[];
}

export default function DesignGallery({ groups }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const allItems = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  // Entrada: las tarjetas de cada fila suben en cascada al entrar en pantalla.
  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.gallery__group', root.current).forEach((group) => {
          gsap.fromTo(
            group.querySelectorAll('.gallery__item, .gallery__group-head'),
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.07,
              ease: 'power2.out',
              scrollTrigger: { trigger: group, start: 'top 82%', once: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="gallery">
      {groups.map((group) => (
        <GalleryRow key={group.id} group={group} onOpen={setOpenId} />
      ))}

      {openId && <Lightbox items={allItems} activeId={openId} onClose={() => setOpenId(null)} onNavigate={setOpenId} />}
    </div>
  );
}

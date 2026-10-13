import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { lockScroll } from '../../../scripts/motion/smooth';
import type { GallerySlide } from './types';

interface Props {
  slides: GallerySlide[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

// Recorre foto por foto: primero todas las de una pieza y luego la siguiente pieza.
export default function Lightbox({ slides, index, onClose, onNavigate }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const slide = slides[index];
  const totalItems = slides[slides.length - 1].itemIndex + 1;
  const go = (step: number) => onNavigate((index + step + slides.length) % slides.length);

  // Al abrir: foco en "Cerrar" y bloqueo de scroll. Al cerrar: devuelve el foco.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    lockScroll(true);

    return () => {
      lockScroll(false);
      previous?.focus({ preventScroll: true });
    };
  }, []);

  // Teclado: Esc cierra, flechas navegan.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.lightbox__figure', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
      });
    },
    { scope: root, dependencies: [index] },
  );

  if (!slide) return null;
  const { item, photo, itemIndex, photoIndex } = slide;

  // Portal a <body>: el contenido con ScrollSmoother está transformado y rompería position: fixed.
  return createPortal(
    <div
      ref={root}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={closeBtn} type="button" className="lightbox__close" onClick={onClose}>
        Cerrar
      </button>

      <figure className="lightbox__figure">
        <img src={photo.full} alt={photo.alt} width={photo.width} height={photo.height} />
        <figcaption>
          <span className="gallery__index">
            {String(itemIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
          </span>
          <span className="lightbox__title display">{item.title}</span>
          {item.photos.length > 1 && (
            <span className="gallery__category">
              Foto {photoIndex + 1} de {item.photos.length}
            </span>
          )}
          <span className="gallery__category">{item.categoryLabel}</span>
        </figcaption>
      </figure>

      <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Anterior">
        ←
      </button>
      <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Siguiente">
        →
      </button>
    </div>,
    document.body,
  );
}

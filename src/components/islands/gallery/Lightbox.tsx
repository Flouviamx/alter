import { useEffect, useRef, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import { lockScroll } from '../../../scripts/motion/smooth';
import { closeTo, motionOk, openFrom, swapIn, type FlipOrigin } from './transitions';
import type { GallerySlide } from './types';

interface Props {
  slides: GallerySlide[];
  index: number;
  /** Dónde estaba la tarjeta al abrir (Flip); null = abrir sin vuelo */
  origin: FlipOrigin | null;
  /** Tarjeta de una pieza, para regresar la foto a ella al cerrar */
  cardFor: (id: string) => HTMLElement | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

// Recorre foto por foto: primero todas las de una pieza y luego la siguiente pieza.
// Mientras carga la foto grande se ve la miniatura (ya en caché), así el vuelo nunca muestra un hueco.
export default function Lightbox({ slides, index, origin, cardFor, onClose, onNavigate }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opened = useRef(false);
  const closing = useRef(false);

  const slide = slides[index];
  const totalItems = slides[slides.length - 1].itemIndex + 1;
  const go = (step: number) => onNavigate((index + step + slides.length) % slides.length);

  const parts = () => ({
    media: media.current!,
    backdrop: backdrop.current!,
    chrome: Array.from(root.current!.querySelectorAll('[data-chrome]')),
  });

  const requestClose = () => {
    if (closing.current) return;
    closing.current = true;
    if (!motionOk()) return onClose();
    closeTo(cardFor(slide.item.id), parts(), slide.photoIndex !== 0, onClose);
  };

  // Al abrir: foco en "Cerrar" y bloqueo de scroll. Al cerrar: devuelve el foco.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });
    lockScroll(true);

    return () => {
      lockScroll(false);
      previous?.focus({ preventScroll: true });
    };
  }, []);

  // Teclado: Esc cierra, flechas navegan.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  // Primera vez: vuelo desde la tarjeta. Después: cada foto nueva entra con un fundido corto.
  useGSAP(
    () => {
      if (!motionOk() || !media.current) return;
      if (!opened.current) openFrom(origin, parts());
      else swapIn(media.current);
      opened.current = true;
    },
    { scope: root, dependencies: [index] },
  );

  if (!slide) return null;
  const { item, photo, itemIndex, photoIndex } = slide;
  const framing = photo.focus ? { objectPosition: photo.focus } : undefined;

  // Portal a <body>: el contenido con ScrollSmoother está transformado y rompería position: fixed.
  return createPortal(
    <div ref={root} className="lightbox" role="dialog" aria-modal="true" aria-label={item.title}>
      <div ref={backdrop} className="lightbox__backdrop" onClick={requestClose} />

      <button ref={closeBtn} type="button" className="lightbox__close" onClick={requestClose} data-chrome>
        Cerrar
      </button>

      <figure className="lightbox__figure">
        <div className="lightbox__frame" style={{ '--ar': photo.width / photo.height } as CSSProperties}>
          <div ref={media} key={index} className="lightbox__media" data-flip-id={item.id}>
            <img
              className="lightbox__preview"
              src={photo.src}
              srcSet={photo.srcSet}
              sizes="(max-width: 640px) 60vw, 16rem"
              alt=""
              aria-hidden="true"
              style={framing}
            />
            <img
              className="lightbox__full"
              src={photo.full}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              style={framing}
              onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
            />
          </div>
        </div>
        <figcaption data-chrome>
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

      <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Anterior" data-chrome>
        ←
      </button>
      <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Siguiente" data-chrome>
        →
      </button>
    </div>,
    document.body,
  );
}

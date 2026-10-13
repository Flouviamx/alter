// Tarjeta de una pieza. Si el vestido tiene varias fotos, se hojean en la misma tarjeta:
// con el mouse, la posición horizontal sobre la foto elige la imagen; las rayitas de abajo indican cuántas hay.
// Cada cambio pasa con la ola de satín (scripts/webgl/satin.ts) sobre el fundido CSS.
// En touch no hay hover: al tocar se abre el lightbox, que recorre todas las fotos de la pieza.
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { satinSwap } from '../../../scripts/webgl/satin';
import type { GalleryItem } from './types';

interface Props {
  item: GalleryItem;
  index: number;
  onOpen: (id: string, photoIndex: number) => void;
}

export default function GalleryCard({ item, index, onOpen }: Props) {
  const [active, setActive] = useState(0);
  const media = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);
  const hovering = useRef(false);
  const count = item.photos.length;

  // Solo al hojear con el mouse; al salir la portada vuelve con el fundido simple.
  useEffect(() => {
    const previous = shown.current;
    shown.current = active;
    if (previous === active || !hovering.current || !media.current) return;
    const imgs = media.current.querySelectorAll('img');
    satinSwap(media.current, imgs[previous], imgs[active], active > previous ? 1 : -1);
  }, [active]);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (count < 2 || event.pointerType !== 'mouse') return;
    hovering.current = true;
    const box = event.currentTarget.getBoundingClientRect();
    const next = Math.floor(((event.clientX - box.left) / box.width) * count);
    setActive(Math.min(count - 1, Math.max(0, next)));
  };

  const onPointerLeave = () => {
    hovering.current = false;
    setActive(0);
  };

  return (
    <li className="gallery__item">
      <button
        type="button"
        className="gallery__card"
        onClick={() => onOpen(item.id, active)}
        aria-label={count > 1 ? `Ver ${item.title} (${count} fotos)` : `Ver ${item.title}`}
      >
        <span
          ref={media}
          className="gallery__media"
          data-flip-id={item.id}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          {item.photos.map((photo, i) => (
            <img
              key={photo.src}
              src={photo.src}
              srcSet={photo.srcSet}
              sizes="(max-width: 640px) 60vw, 16rem"
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              data-active={i === active}
              aria-hidden={i !== active}
              style={photo.focus ? { objectPosition: photo.focus } : undefined}
            />
          ))}

          {count > 1 && (
            <span className="gallery__dots" aria-hidden="true">
              {item.photos.map((photo, i) => (
                <span key={photo.src} data-active={i === active} />
              ))}
            </span>
          )}
        </span>

        <span className="gallery__caption">
          <span className="gallery__index">{String(index + 1).padStart(2, '0')}</span>
          <span className="gallery__item-title">{item.title}</span>
        </span>
      </button>
    </li>
  );
}

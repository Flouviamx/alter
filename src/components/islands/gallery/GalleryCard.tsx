// Tarjeta de una pieza. Si el vestido tiene varias fotos, se hojean en la misma tarjeta:
// con el mouse, la posición horizontal sobre la foto elige la imagen; las rayitas de abajo indican cuántas hay.
// En touch no hay hover: al tocar se abre el lightbox, que recorre todas las fotos de la pieza.
import { useState, type PointerEvent } from 'react';
import type { GalleryItem } from './types';

interface Props {
  item: GalleryItem;
  index: number;
  onOpen: (id: string, photoIndex: number) => void;
}

export default function GalleryCard({ item, index, onOpen }: Props) {
  const [active, setActive] = useState(0);
  const count = item.photos.length;

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (count < 2 || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    const next = Math.floor(((event.clientX - box.left) / box.width) * count);
    setActive(Math.min(count - 1, Math.max(0, next)));
  };

  return (
    <li className="gallery__item">
      <button
        type="button"
        className="gallery__card"
        onClick={() => onOpen(item.id, active)}
        aria-label={count > 1 ? `Ver ${item.title} (${count} fotos)` : `Ver ${item.title}`}
      >
        <span className="gallery__media" onPointerMove={onPointerMove} onPointerLeave={() => setActive(0)}>
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

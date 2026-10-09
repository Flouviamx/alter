import type { GalleryItem } from './types';

interface Props {
  item: GalleryItem;
  index: number;
  onOpen: (id: string) => void;
}

export default function GalleryCard({ item, index, onOpen }: Props) {
  return (
    <li className="gallery__item">
      <button type="button" className="gallery__card" onClick={() => onOpen(item.id)} aria-label={`Ver ${item.title}`}>
        <span className="gallery__media">
          <img
            src={item.src}
            srcSet={item.srcSet}
            sizes="(max-width: 640px) 60vw, 16rem"
            width={item.width}
            height={item.height}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            style={item.focus ? { objectPosition: item.focus } : undefined}
          />
        </span>
        <span className="gallery__caption">
          <span className="gallery__index">{String(index + 1).padStart(2, '0')}</span>
          <span className="gallery__item-title">{item.title}</span>
        </span>
      </button>
    </li>
  );
}

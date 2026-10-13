import type { Category } from '../../../data/work';

/** Foto serializable para la isla: ya optimizada en el servidor. */
export interface GalleryPhoto {
  alt: string;
  focus?: string;
  src: string;
  srcSet: string;
  full: string;
  width: number;
  height: number;
}

/** Una pieza (un vestido) con todas sus fotos; la primera es la portada. */
export interface GalleryItem {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  photos: GalleryPhoto[];
}

/** Un grupo de la galería (Novias, Fiesta…) con sus piezas en orden. */
export interface GalleryGroup {
  id: Category;
  label: string;
  items: GalleryItem[];
}

/** Una diapositiva del lightbox: cada foto de cada pieza, en orden. */
export interface GallerySlide {
  item: GalleryItem;
  photo: GalleryPhoto;
  /** posición de la pieza en toda la galería */
  itemIndex: number;
  /** posición de la foto dentro de la pieza */
  photoIndex: number;
}

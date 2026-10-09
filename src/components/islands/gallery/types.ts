import type { Category } from '../../../data/work';

/** Pieza serializable para la isla: imágenes ya optimizadas en el servidor. */
export interface GalleryItem {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  alt: string;
  focus?: string;
  src: string;
  srcSet: string;
  full: string;
  width: number;
  height: number;
}

/** Un grupo de la galería (Novias, Fiesta…) con sus piezas en orden. */
export interface GalleryGroup {
  id: Category;
  label: string;
  items: GalleryItem[];
}

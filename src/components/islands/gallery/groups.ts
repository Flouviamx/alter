// Solo servidor: lo importan las secciones .astro para preparar los datos de la isla.
// Arma los grupos de una sección (Diseños o Piezas disponibles) con las fotos ya optimizadas.
import { getImage } from 'astro:assets';
import { byId, categories, pieces, type GallerySection, type Piece } from '../../../data/work';
import type { GalleryGroup, GalleryItem, GalleryPhoto } from './types';

const toPhoto = async (id: string): Promise<GalleryPhoto> => {
  const photo = byId(id);
  const thumb = await getImage({ src: photo.image, widths: [400, 700], format: 'webp' });
  const full = await getImage({ src: photo.image, width: 1600, format: 'webp' });
  return {
    alt: photo.alt,
    focus: photo.focus,
    src: thumb.src,
    srcSet: thumb.srcSet.attribute,
    full: full.src,
    width: photo.image.width,
    height: photo.image.height,
  };
};

const toItem = async (piece: Piece, categoryLabel: string): Promise<GalleryItem> => ({
  id: piece.id,
  title: piece.title,
  category: piece.category,
  categoryLabel,
  photos: await Promise.all(piece.photos.map(toPhoto)),
});

export const galleryGroups = (section: GallerySection): Promise<GalleryGroup[]> =>
  Promise.all(
    categories
      .filter((category) => category.section === section)
      .map(async (category) => ({
        id: category.id,
        label: category.label,
        items: await Promise.all(
          pieces.filter((piece) => piece.category === category.id).map((piece) => toItem(piece, category.label)),
        ),
      })),
  );

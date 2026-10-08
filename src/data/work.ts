// Portafolio. Títulos provisionales: confirmar nombres y detalles de cada pieza con la clienta.
import type { ImageMetadata } from 'astro';

import noviaSalon from '../assets/work/novia-salon.jpg';
import noviaTerraza from '../assets/work/novia-terraza.jpg';
import noviaAlcatraces from '../assets/work/novia-alcatraces.jpg';
import noviaEspejo from '../assets/work/novia-espejo.jpg';
import noviaDetalle from '../assets/work/novia-detalle-flores.jpg';
import nocheNegro from '../assets/work/noche-negro-rosa.jpg';
import nocheAzul from '../assets/work/noche-azul-rey.jpg';
import nocheCoral from '../assets/work/noche-coral-lazo.jpg';
import nocheFucsia from '../assets/work/noche-fucsia-flores.jpg';
import tallerTerracota from '../assets/work/taller-terracota.jpg';
import tallerChampagne from '../assets/work/taller-champagne.jpg';

export type Category = 'novias' | 'noche' | 'taller';

export const categories: { id: Category | 'todo'; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'novias', label: 'Novias' },
  { id: 'noche', label: 'Noche' },
  { id: 'taller', label: 'Taller' },
];

export interface WorkItem {
  id: string;
  title: string;
  category: Category;
  image: ImageMetadata;
  alt: string;
  /** object-position para encuadrar la prenda */
  focus?: string;
}

export const work: WorkItem[] = [
  {
    id: 'novia-salon',
    title: 'Novia, escote barco y moño',
    category: 'novias',
    image: noviaSalon,
    alt: 'Novia con vestido blanco de escote barco y cola, sosteniendo alcatraces junto a un ventanal',
  },
  {
    id: 'noche-negro',
    title: 'Strapless negro con rosa',
    category: 'noche',
    image: nocheNegro,
    alt: 'Vestido largo negro strapless con una rosa de satín rosa en la cintura',
  },
  {
    id: 'taller-terracota',
    title: 'Satín terracota, un hombro',
    category: 'taller',
    image: tallerTerracota,
    alt: 'Vestido de satín color terracota de un hombro sobre maniquí en el taller',
  },
  {
    id: 'novia-terraza',
    title: 'Civil con flores aplicadas',
    category: 'novias',
    image: noviaTerraza,
    alt: 'Mujer con vestido blanco midi drapeado caminando por una terraza con columnas',
  },
  {
    id: 'noche-azul',
    title: 'Azul rey, hombros caídos',
    category: 'noche',
    image: nocheAzul,
    alt: 'Vestido largo azul rey con hombros caídos frente a un arreglo floral',
  },
  {
    id: 'taller-champagne',
    title: 'Champagne drapeado',
    category: 'taller',
    image: tallerChampagne,
    alt: 'Vestido champagne asimétrico con drapeado lateral sobre maniquí',
  },
  {
    id: 'novia-espejo',
    title: 'Satín y cola lateral',
    category: 'novias',
    image: noviaEspejo,
    alt: 'Vestido blanco de satín con flores en la cintura y cola lateral, reflejado en un espejo',
  },
  {
    id: 'noche-fucsia',
    title: 'Fucsia con flores 3D',
    category: 'noche',
    image: nocheFucsia,
    alt: 'Vestido largo fucsia con flores tridimensionales del mismo tono',
    focus: '72% 40%',
  },
  {
    id: 'novia-alcatraces',
    title: 'Detalle de cintura plisada',
    category: 'novias',
    image: noviaAlcatraces,
    alt: 'Detalle de vestido de novia con cintura plisada y ramo de alcatraces',
  },
  {
    id: 'noche-coral',
    title: 'Shantung coral con lazo',
    category: 'noche',
    image: nocheCoral,
    alt: 'Vestido largo coral de shantung con gran lazo en la cintura',
    focus: '30% 50%',
  },
  {
    id: 'novia-detalle',
    title: 'Flores aplicadas a mano',
    category: 'novias',
    image: noviaDetalle,
    alt: 'Detalle de flores blancas aplicadas sobre un vestido drapeado',
  },
];

export const byId = (id: string) => {
  const item = work.find((w) => w.id === id);
  if (!item) throw new Error(`Pieza no encontrada: ${id}`);
  return item;
};

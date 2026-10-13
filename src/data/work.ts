// Portafolio: fotos sueltas y las piezas (prendas) que agrupan esas fotos.
// Una pieza = un vestido real; si tiene varias fotos, la galería las muestra en una sola tarjeta.
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
import noviaEspalda from '../assets/work/novia-espalda.jpg';
import lilaFrente from '../assets/work/fiesta-lila-frente.jpg';
import lilaCapa from '../assets/work/fiesta-lila-capa.jpg';
import lilaVuelo from '../assets/work/fiesta-lila-vuelo.jpg';
import fucsiaOlan from '../assets/work/fiesta-fucsia-olan.jpg';
import fucsiaOlanPose from '../assets/work/fiesta-fucsia-olan-pose.jpg';
import fucsiaOlanEntrada from '../assets/work/fiesta-fucsia-olan-entrada.jpg';
import ivoryFrente from '../assets/work/disponible-ivory-frente.jpg';
import ivoryEspalda from '../assets/work/disponible-ivory-espalda.jpg';
import negroFrente from '../assets/work/disponible-negro-frente.jpg';
import negroEspalda from '../assets/work/disponible-negro-espalda.jpg';
import verdeFrente from '../assets/work/disponible-verde-frente.jpg';
import verdeEspalda from '../assets/work/disponible-verde-espalda.jpg';
import cafeFrente from '../assets/work/disponible-cafe-frente.jpg';
import cafeEspalda from '../assets/work/disponible-cafe-espalda.jpg';
import topNegro from '../assets/work/disponible-top-negro.jpg';
import topBlanco from '../assets/work/disponible-top-blanco.jpg';
import blusaNegra from '../assets/work/disponible-blusa-negra.jpg';
import blusaCafe from '../assets/work/disponible-blusa-cafe.jpg';
import blusaLila from '../assets/work/disponible-blusa-lila.jpg';
import procesoManos from '../assets/work/proceso-manos.jpg';
import procesoMaquina from '../assets/work/proceso-maquina.jpg';
import procesoAlfileres from '../assets/work/proceso-alfileres.jpg';
import procesoMesa from '../assets/work/proceso-mesa.jpg';

// Grupos de la galería, en el orden en que se muestran. `section` dice en qué sección van:
// Diseños (boceto de la clienta: Novias, Fiesta) o Piezas disponibles (prendas a la venta).
export type Category = 'novias' | 'fiesta' | 'vestidos' | 'blusas';
export type GallerySection = 'disenos' | 'disponibles';

export const categories: { id: Category; label: string; section: GallerySection }[] = [
  { id: 'novias', label: 'Novias', section: 'disenos' },
  { id: 'fiesta', label: 'Fiesta', section: 'disenos' },
  { id: 'vestidos', label: 'Vestidos', section: 'disponibles' },
  { id: 'blusas', label: 'Blusas y tops', section: 'disponibles' },
];

export interface Photo {
  id: string;
  image: ImageMetadata;
  alt: string;
  /** Pie de foto editorial (lo usa Esencia); la galería muestra el título de la pieza. */
  caption: string;
  /** object-position para encuadrar la prenda */
  focus?: string;
}

export interface Piece {
  id: string;
  title: string;
  category: Category;
  /** ids de `photos`; la primera es la portada de la tarjeta */
  photos: string[];
}

export const photos: Photo[] = [
  {
    id: 'novia-salon',
    image: noviaSalon,
    caption: 'Novia, escote barco y moño',
    alt: 'Novia con vestido blanco de escote barco y cola, sosteniendo alcatraces junto a un ventanal',
  },
  {
    id: 'novia-alcatraces',
    image: noviaAlcatraces,
    caption: 'Detalle de cintura plisada',
    alt: 'Detalle de vestido de novia con cintura plisada y ramo de alcatraces',
  },
  {
    id: 'novia-terraza',
    image: noviaTerraza,
    caption: 'Flores aplicadas',
    alt: 'Mujer con vestido blanco midi drapeado caminando por una terraza con columnas',
  },
  {
    id: 'novia-espejo',
    image: noviaEspejo,
    caption: 'Satín y cola lateral',
    alt: 'Vestido blanco de satín con flores en la cintura y cola lateral, reflejado en un espejo',
  },
  {
    id: 'novia-detalle',
    image: noviaDetalle,
    caption: 'Flores aplicadas a mano',
    alt: 'Detalle de flores blancas aplicadas sobre un vestido drapeado',
  },
  {
    id: 'noche-negro',
    image: nocheNegro,
    caption: 'Strapless negro con rosa',
    alt: 'Vestido largo negro strapless con una rosa de satín rosa en la cintura',
  },
  {
    id: 'taller-terracota',
    image: tallerTerracota,
    caption: 'Satín terracota, un hombro',
    alt: 'Vestido de satín color terracota de un hombro sobre maniquí en el taller',
  },
  {
    id: 'noche-azul',
    image: nocheAzul,
    caption: 'Azul rey, hombros caídos',
    alt: 'Vestido largo azul rey con hombros caídos frente a un arreglo floral',
  },
  {
    id: 'taller-champagne',
    image: tallerChampagne,
    caption: 'Champagne drapeado',
    alt: 'Vestido champagne asimétrico con drapeado lateral sobre maniquí',
  },
  {
    id: 'noche-fucsia',
    image: nocheFucsia,
    caption: 'Fucsia con flores 3D',
    alt: 'Vestido largo fucsia con flores tridimensionales del mismo tono',
    focus: '72% 40%',
  },
  {
    id: 'noche-coral',
    image: nocheCoral,
    caption: 'Shantung coral con lazo',
    alt: 'Vestido largo coral de shantung con gran lazo en la cintura',
    focus: '30% 50%',
  },
  {
    id: 'novia-espalda',
    image: noviaEspalda,
    caption: 'Moño en la espalda',
    alt: 'Novia de espaldas junto a un balcón, con velo largo y moño en la espalda del vestido',
  },
  {
    id: 'fiesta-lila-frente',
    image: lilaFrente,
    caption: 'Satín lila de un hombro',
    alt: 'Mujer con vestido largo de satín lila de un hombro y abertura, caminando en un jardín entre edificios',
  },
  {
    id: 'fiesta-lila-capa',
    image: lilaCapa,
    caption: 'Capa de gasa morada',
    alt: 'Vestido lila de un hombro con capa de gasa morada levantada al viento',
  },
  {
    id: 'fiesta-lila-vuelo',
    image: lilaVuelo,
    caption: 'Capa en movimiento',
    alt: 'Vestido lila de satín con la capa morada en movimiento, de cuerpo completo',
  },
  {
    id: 'fiesta-fucsia-olan',
    image: fucsiaOlan,
    caption: 'Fucsia strapless con olán',
    alt: 'Vestido largo fucsia strapless con olán lateral y abertura, frente a un arreglo de flores blancas',
  },
  {
    id: 'fiesta-fucsia-olan-pose',
    image: fucsiaOlanPose,
    caption: 'Escote escultórico',
    alt: 'Vestido fucsia de escote escultórico y abertura al frente, en un salón con velas',
  },
  {
    id: 'fiesta-fucsia-olan-entrada',
    image: fucsiaOlanEntrada,
    caption: 'Entrada al salón',
    alt: 'Mujer con vestido fucsia del brazo de un señor de traje, entrando a un salón lleno de invitados',
    focus: '60% 50%',
  },
  {
    id: 'disponible-ivory-frente',
    image: ivoryFrente,
    caption: 'Ivory, frente',
    alt: 'Vestido largo de satín ivory con cuello halter, de frente',
  },
  {
    id: 'disponible-ivory-espalda',
    image: ivoryEspalda,
    caption: 'Ivory, espalda',
    alt: 'Vestido largo de satín ivory con la espalda descubierta',
  },
  {
    id: 'disponible-negro-frente',
    image: negroFrente,
    caption: 'Negro, frente',
    alt: 'Vestido largo de satín negro con cuello halter, de frente',
  },
  {
    id: 'disponible-negro-espalda',
    image: negroEspalda,
    caption: 'Negro, espalda',
    alt: 'Vestido largo de satín negro con la espalda descubierta',
  },
  {
    id: 'disponible-verde-frente',
    image: verdeFrente,
    caption: 'Verde, frente',
    alt: 'Vestido midi de satín verde olivo con cuello caído, de frente',
  },
  {
    id: 'disponible-verde-espalda',
    image: verdeEspalda,
    caption: 'Verde, espalda',
    alt: 'Vestido midi de satín verde olivo, de espaldas',
  },
  {
    id: 'disponible-cafe-frente',
    image: cafeFrente,
    caption: 'Café, frente',
    alt: 'Vestido midi de satín café con cuello caído y fruncido en la cadera, de frente',
  },
  {
    id: 'disponible-cafe-espalda',
    image: cafeEspalda,
    caption: 'Café, espalda',
    alt: 'Vestido midi de satín café, de espaldas',
  },
  {
    id: 'disponible-top-negro',
    image: topNegro,
    caption: 'Top negro',
    alt: 'Top strapless negro con jeans acampanados',
  },
  {
    id: 'disponible-top-blanco',
    image: topBlanco,
    caption: 'Top blanco',
    alt: 'Top strapless blanco con jeans acampanados',
  },
  {
    id: 'disponible-blusa-negra',
    image: blusaNegra,
    caption: 'Blusa negra',
    alt: 'Blusa negra de satín con cuello caído y orilla asimétrica de encaje, con jeans',
  },
  {
    id: 'disponible-blusa-cafe',
    image: blusaCafe,
    caption: 'Blusa café',
    alt: 'Blusa café de satín con cuello caído y orilla asimétrica de encaje, con jeans',
  },
  {
    id: 'disponible-blusa-lila',
    image: blusaLila,
    caption: 'Blusa lila',
    alt: 'Blusa lila de satín de un hombro con pantalón negro de satín',
  },
  // Sesión del taller (hero). No son piezas: no van en la galería.
  {
    id: 'proceso-manos',
    image: procesoManos,
    caption: 'Drapeado a mano',
    alt: 'Manos drapeando satín rosa sobre un maniquí en el taller',
    focus: '55% 50%',
  },
  {
    id: 'proceso-maquina',
    image: procesoMaquina,
    caption: 'Máquina de coser',
    alt: 'Aguja de una máquina de coser sobre tela rosa, con un carrete de hilo del mismo tono',
  },
  {
    id: 'proceso-alfileres',
    image: procesoAlfileres,
    caption: 'Prueba en maniquí',
    alt: 'La diseñadora de Anter House prende con alfileres una tela fucsia sobre un maniquí',
    focus: '75% 50%',
  },
  {
    id: 'proceso-mesa',
    image: procesoMesa,
    caption: 'Mesa de costura',
    alt: 'Máquina de coser industrial con tela rosa sobre la mesa del taller',
  },
];

// Novias: la clienta pidió títulos cortos (sin descripción) y una sola tarjeta por vestido.
// Disponibles: nombres y agrupación tal como los mandó la clienta (un modelo en dos colores = una pieza).
export const pieces: Piece[] = [
  { id: 'novia', title: 'Vestido de novia', category: 'novias', photos: ['novia-salon', 'novia-alcatraces', 'novia-espalda'] },
  { id: 'despedida', title: 'Despedida', category: 'novias', photos: ['novia-terraza', 'novia-espejo', 'novia-detalle'] },
  { id: 'lila', title: 'Lila con capa', category: 'fiesta', photos: ['fiesta-lila-frente', 'fiesta-lila-capa', 'fiesta-lila-vuelo'] },
  { id: 'fucsia-olan', title: 'Fucsia strapless con olán', category: 'fiesta', photos: ['fiesta-fucsia-olan', 'fiesta-fucsia-olan-pose', 'fiesta-fucsia-olan-entrada'] },
  { id: 'negro', title: 'Strapless negro con rosa', category: 'fiesta', photos: ['noche-negro'] },
  { id: 'terracota', title: 'Satín terracota, un hombro', category: 'fiesta', photos: ['taller-terracota'] },
  { id: 'azul', title: 'Azul rey, hombros caídos', category: 'fiesta', photos: ['noche-azul'] },
  { id: 'champagne', title: 'Champagne drapeado', category: 'fiesta', photos: ['taller-champagne'] },
  { id: 'fucsia', title: 'Fucsia con flores 3D', category: 'fiesta', photos: ['noche-fucsia'] },
  { id: 'coral', title: 'Shantung coral con lazo', category: 'fiesta', photos: ['noche-coral'] },
  {
    id: 'vestido-ivory-negro',
    title: 'Vestido ivory y negro',
    category: 'vestidos',
    photos: ['disponible-ivory-frente', 'disponible-ivory-espalda', 'disponible-negro-frente', 'disponible-negro-espalda'],
  },
  {
    id: 'vestido-verde-cafe',
    title: 'Vestido verde y café',
    category: 'vestidos',
    photos: ['disponible-verde-frente', 'disponible-verde-espalda', 'disponible-cafe-frente', 'disponible-cafe-espalda'],
  },
  { id: 'top-negro-blanco', title: 'Top negro y blanco', category: 'blusas', photos: ['disponible-top-negro', 'disponible-top-blanco'] },
  { id: 'blusa-negra-cafe', title: 'Blusa negra y café', category: 'blusas', photos: ['disponible-blusa-negra', 'disponible-blusa-cafe'] },
  { id: 'blusa-lila', title: 'Blusa lila y pantalón negro', category: 'blusas', photos: ['disponible-blusa-lila'] },
];

export const byId = (id: string) => {
  const photo = photos.find((p) => p.id === id);
  if (!photo) throw new Error(`Foto no encontrada: ${id}`);
  return photo;
};

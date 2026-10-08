// Servicios y lista de precios. Precios: flyer "Confección y ajustes" (docs/brand/refs/flyer-confeccion-ajustes.jpg).
// Precios en MXN. Actualizar aquí; la UI lee de este archivo.
// `preview` = id de la pieza (src/data/work.ts) que aparece al pasar el cursor por la fila.

export const services = [
  {
    n: '01',
    title: 'Vestidos a la medida',
    preview: 'noche-coral',
    body: 'Piezas de noche y de evento diseñadas desde cero: tela, silueta y detalles pensados para ti.',
  },
  {
    n: '02',
    title: 'Novias',
    preview: 'novia-alcatraces',
    body: 'Vestidos de novia y de civil, con pruebas en el taller hasta que el ajuste sea exacto.',
  },
  {
    n: '03',
    title: 'Confección y ajustes',
    preview: 'taller-champagne',
    body: 'Bastillas, ajustes de talle y cambios de cierre para que lo que ya tienes te quede como nuevo.',
  },
];

export const priceList = [
  {
    group: 'Bastillas',
    items: [
      { label: 'Pantalón y jeans', price: 160 },
      { label: 'Pantalón de vestir', price: 200 },
      { label: 'Pantalón de vestir forrado', price: 350 },
      { label: 'Vestido', price: 450 },
      { label: 'Vestido forrado', price: 600 },
    ],
  },
  {
    group: 'Ajustes',
    items: [
      { label: 'Ajustes de talle', price: 400 },
      { label: 'Cambio de cierre', price: 400 },
    ],
  },
];

export const expressSurcharge = 200;
export const priceNote = 'Precios sujetos a valoración de la prenda y trabajo requerido.';

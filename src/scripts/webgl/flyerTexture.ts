// Dibuja el flyer "Confección y ajustes" en un canvas 2D para usarlo como textura.
// Lee los mismos datos que la lista HTML (src/data/services.ts): una sola fuente de verdad.
import { expressSurcharge, priceList, priceNote } from '../../data/services';

export const FLYER_WIDTH = 1000;
export const FLYER_HEIGHT = 1300;

/** Posición de la chinche en píxeles de la textura (centro, cerca del borde superior). */
export const PIN_X = FLYER_WIDTH / 2;
export const PIN_Y = 74;

const COLORS = {
  paper: '#eff0e0',
  ink: '#23261c',
  inkSoft: '#4a4d40',
  accent: '#b4552f',
  line: 'rgba(35, 38, 28, 0.22)',
};

const DISPLAY = 'Italiana';
const SANS = '"Jost Variable", Jost, sans-serif';

const mxn = (value: number) => `$${value.toLocaleString('es-MX')}`;

/** Texto con tracking manual (letterSpacing de canvas no es universal). */
function drawSpaced(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number,
  align: 'left' | 'center' = 'left',
) {
  const chars = [...text];
  const width = chars.reduce((sum, c) => sum + ctx.measureText(c).width, 0) + spacing * (chars.length - 1);
  let cursor = align === 'center' ? x - width / 2 : x;
  ctx.textAlign = 'left';
  for (const c of chars) {
    ctx.fillText(c, cursor, y);
    cursor += ctx.measureText(c).width + spacing;
  }
}

/** Grano de papel: ruido muy tenue para que la superficie no sea plana. */
function drawGrain(ctx: CanvasRenderingContext2D) {
  const image = ctx.getImageData(0, 0, FLYER_WIDTH, FLYER_HEIGHT);
  const { data } = image;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 9;
    data[i] += n;
    data[i + 1] += n;
    data[i + 2] += n;
  }
  ctx.putImageData(image, 0, 0);
}

export async function createFlyerCanvas() {
  await Promise.all([
    document.fonts.load(`400 80px ${DISPLAY}`),
    document.fonts.load(`350 30px ${SANS}`),
    document.fonts.load(`400 30px ${SANS}`),
  ]);

  const canvas = document.createElement('canvas');
  canvas.width = FLYER_WIDTH;
  canvas.height = FLYER_HEIGHT;
  const ctx = canvas.getContext('2d')!;
  const padX = 110;
  const right = FLYER_WIDTH - padX;

  ctx.fillStyle = COLORS.paper;
  ctx.fillRect(0, 0, FLYER_WIDTH, FLYER_HEIGHT);
  drawGrain(ctx);
  ctx.textBaseline = 'alphabetic';

  // Perforación de la chinche (la chinche 3D va encima: scripts/webgl/pushPin.ts)
  const hole = ctx.createRadialGradient(PIN_X, PIN_Y, 0, PIN_X, PIN_Y, 34);
  hole.addColorStop(0, 'rgba(35, 38, 28, 0.28)');
  hole.addColorStop(1, 'rgba(35, 38, 28, 0)');
  ctx.fillStyle = hole;
  ctx.fillRect(PIN_X - 40, PIN_Y - 40, 80, 80);

  // Logo
  ctx.fillStyle = COLORS.ink;
  ctx.font = `400 96px ${DISPLAY}`;
  drawSpaced(ctx, 'ANTER', FLYER_WIDTH / 2, 236, 22, 'center');
  ctx.font = `400 22px ${SANS}`;
  drawSpaced(ctx, 'HOUSE', FLYER_WIDTH / 2, 282, 14, 'center');
  ctx.font = `350 26px ${SANS}`;
  drawSpaced(ctx, 'CONFECCIÓN Y AJUSTES', FLYER_WIDTH / 2, 346, 9, 'center');

  // Grupos de precios
  let y = 432;
  for (const group of priceList) {
    ctx.fillStyle = COLORS.accent;
    ctx.font = `400 22px ${SANS}`;
    drawSpaced(ctx, group.group.toUpperCase(), padX, y, 8);
    y += 58;

    for (const item of group.items) {
      ctx.fillStyle = COLORS.ink;
      ctx.font = `350 32px ${SANS}`;
      ctx.textAlign = 'left';
      ctx.fillText(item.label, padX, y);
      ctx.textAlign = 'right';
      ctx.fillText(mxn(item.price), right, y);

      ctx.strokeStyle = COLORS.line;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(padX, y + 20);
      ctx.lineTo(right, y + 20);
      ctx.stroke();
      ctx.setLineDash([]);
      y += 62;
    }
    y += 44;
  }

  // Arreglo express
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padX, y);
  ctx.lineTo(right, y);
  ctx.stroke();
  y += 56;
  ctx.fillStyle = COLORS.ink;
  ctx.font = `400 24px ${SANS}`;
  drawSpaced(ctx, 'ARREGLO EXPRESS', padX, y, 9);
  ctx.font = `350 32px ${SANS}`;
  ctx.textAlign = 'right';
  ctx.fillText(`+${mxn(expressSurcharge)}`, right, y);

  // Nota
  y += 70;
  ctx.fillStyle = COLORS.inkSoft;
  ctx.font = `350 23px ${SANS}`;
  ctx.textAlign = 'left';
  ctx.fillText(`* ${priceNote}`, padX, y);

  return canvas;
}

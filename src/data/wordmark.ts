// Wordmark ANTER reconstruido a partir del logo original (docs/brand/refs/logo-anter-house.jpg).
// Cada letra se midió en la imagen y se redibujó como contorno geométrico limpio
// (coincidencia de 97–99 % por letra). Unidades: 1/10 de píxel del original; alto de mayúscula = 755.
// Fuente única: la usan ui/Wordmark.astro (SVG) y scripts/webgl/flyerTexture.ts (Path2D).
// Relleno: nonzero (las contraformas de A y R van en sentido contrario).

export const WORDMARK_WIDTH = 4747.1;
export const WORDMARK_HEIGHT = 755;

export const wordmarkGlyphs: { letter: string; d: string }[] = [
  { letter: 'A', d: 'M396.7 0.0 L436.2 0.0 L811.3 755.0 L713.6 755.0 L562.3 445.0 L207.1 445.0 L44.6 755.0 L0.9 755.0 Z M391.0 94.1 L222.8 415.0 L547.7 415.0 Z' },
  { letter: 'N', d: 'M1092.5 0.0 L1152.6 0.0 L1736.2 646.8 L1736.2 0.0 L1783.8 0.0 L1783.8 755.0 L1722.3 755.0 L1140.0 103.4 L1140.0 755.0 L1092.5 755.0 Z' },
  { letter: 'T', d: 'M2090.0 0.0 L2777.5 0.0 L2777.5 32.2 L2470.0 32.2 L2470.0 755.0 L2378.8 755.0 L2378.8 32.2 L2090.0 32.2 Z' },
  { letter: 'E', d: 'M3097.5 0.0 L3651.2 0.0 L3651.2 32.2 L3190.0 32.2 L3190.0 357.0 L3561.2 357.0 L3561.2 389.0 L3190.0 389.0 L3190.0 721.0 L3672.5 721.0 L3672.5 755.0 L3097.5 755.0 Z' },
  { letter: 'R', d: 'M4070.0 0.0 L4161.2 0.0 L4161.2 755.0 L4070.0 755.0 Z M4070 0.0 L4400 0.0 A287.5 222.5 0 0 1 4400 445.0 L4070 445.0 Z M4161.2 33.0 L4161.2 414.0 L4400 414.0 A191.0 190.5 0 0 0 4400 33.0 Z M4367.5 414.0 L4468.2 414.0 L4746.1 755.0 L4640.9 755.0 Z' },
];

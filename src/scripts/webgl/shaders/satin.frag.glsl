// Cambio de foto como tela de satín: una ola cruza la imagen, la pliega levemente y deja un brillo
// en la cresta; detrás de la ola ya está la foto nueva. Amortiguado: desplazamiento de ~2 % y brillo tenue.
precision mediump float;

uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform vec4 uFromCover; // object-fit: cover → escala (xy) y desplazamiento (zw) de uv
uniform vec4 uToCover;
uniform float uProgress; // 0 → 1
uniform float uDir;      // 1: la ola avanza a la derecha; -1: a la izquierda

varying vec2 vUv;

const float BAND = 0.38; // ancho de la ola

vec2 cover(vec2 uv, vec4 c) {
  return clamp(uv, 0.0, 1.0) * c.xy + c.zw;
}

void main() {
  float p = uProgress;
  float x = uDir > 0.0 ? vUv.x : 1.0 - vUv.x;
  float front = x * 0.82 + (1.0 - vUv.y) * 0.18; // frente un poco diagonal, como tela que cae

  float d = front - mix(-BAND, 1.0 + BAND, p);    // < 0: la ola ya pasó (foto nueva)
  float reveal = 1.0 - smoothstep(-BAND * 0.45, BAND * 0.45, d);
  float wave = exp(-pow(d / (BAND * 0.55), 2.0)) * sin(p * 3.14159);

  // Pliegues: dos senos cruzados, como satín que se acomoda
  float folds = sin(front * 17.0 - p * 8.0) * 0.6 + sin(vUv.y * 9.0 + p * 3.0) * 0.4;
  vec2 shift = vec2(0.02 * uDir, 0.012) * folds * wave;

  vec4 from = texture2D(uFrom, cover(vUv + shift * (1.0 - reveal), uFromCover));
  vec4 to = texture2D(uTo, cover(vUv - shift * reveal, uToCover));
  vec4 color = mix(from, to, reveal);

  // Brillo del satín sobre la cresta de la ola
  color.rgb += wave * (0.55 + 0.45 * folds) * 0.09;
  gl_FragColor = color;
}

// Sombra suave: rectángulo redondeado difuminado. Con uBox pequeño y uRadius alto se vuelve una mancha radial.
uniform float uOpacity;
uniform vec3 uColor;
uniform vec2 uBox;     // mitad del tamaño del núcleo, en uv (0..0.5)
uniform float uRadius; // redondeo de esquinas
uniform float uSoft;   // ancho del difuminado

varying vec2 vUv;

float roundedBox(vec2 p, vec2 size, float radius) {
  vec2 q = abs(p) - size + radius;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
}

void main() {
  float dist = roundedBox(vUv - 0.5, uBox, uRadius);
  float alpha = (1.0 - smoothstep(-uSoft * 0.3, uSoft, dist)) * uOpacity;
  gl_FragColor = vec4(uColor, alpha);
}

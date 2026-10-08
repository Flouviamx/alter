// Papel clavado: la superficie queda fija en la chinche y se despega/curva conforme se aleja de ella.
// Ondulación suave + curvatura + hendidura bajo el cursor.
uniform float uTime;
uniform float uWave;    // intensidad de la ondulación (sube con la velocidad del scroll)
uniform float uBend;    // curvatura del papel lejos de la chinche
uniform float uHover;   // 0..1, el cursor está sobre el papel
uniform vec2 uPointer;  // posición del cursor en coordenadas del plano
uniform vec2 uPin;      // posición de la chinche en coordenadas del plano
uniform vec2 uHalf;     // mitad de ancho/alto del plano

varying vec2 vUv;
varying vec3 vWorld;

void main() {
  vUv = uv;
  vec3 p = position;

  // 0 en la chinche, 1 en la esquina más lejana.
  float fromPin = distance(p.xy, uPin) / length(uHalf * 2.0);
  float free = smoothstep(0.0, 0.35, fromPin);

  float wave = sin(p.x * 1.7 + uTime * 0.7) * 0.014 + sin(p.y * 2.3 + uTime * 0.5) * 0.011;
  float curl = fromPin * fromPin * uBend;
  float sideCurl = pow(abs(p.x) / uHalf.x, 2.0) * uBend * 0.3 * free;

  float d = distance(p.xy, uPointer);
  float dent = -exp(-d * d * 4.0) * 0.035 * uHover * free;

  // Alrededor de la chinche el papel se hunde un poco: está atravesado.
  float pinch = -exp(-pow(distance(p.xy, uPin), 2.0) * 60.0) * 0.018;

  p.z += wave * uWave * free + curl + sideCurl + dent + pinch;

  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}

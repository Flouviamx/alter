// Rectángulo a pantalla completa del canvas; vUv va de (0,0) abajo-izquierda a (1,1) arriba-derecha.
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}

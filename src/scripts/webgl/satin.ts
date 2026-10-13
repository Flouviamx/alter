// Efecto satín al hojear las fotos de una tarjeta de la galería (WebGL puro, sin Three.js).
// Un solo canvas para toda la página: se coloca en la tarjeta que cambia de foto, dibuja la ola
// (shaders/satin.frag.glsl) y se esconde. Debajo, la tarjeta ya hizo su fundido CSS, así que al
// esconderse queda exactamente la foto nueva. Sin WebGL o con reduced motion no hace nada.
import { gsap } from 'gsap';
import satinVert from './shaders/satin.vert.glsl?raw';
import satinFrag from './shaders/satin.frag.glsl?raw';

const DURATION = 0.8;
const MAX_DPR = 2;

interface Satin {
  gl: WebGLRenderingContext;
  canvas: HTMLCanvasElement;
  uniform: (name: string) => WebGLUniformLocation | null;
}

let satin: Satin | null | undefined; // undefined: aún no se intenta; null: no hay WebGL
let running: gsap.core.Tween | null = null;
const textures = new WeakMap<HTMLImageElement, WebGLTexture>();

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'shader');
  return shader;
}

function createSatin(): Satin | null {
  const canvas = document.createElement('canvas');
  canvas.className = 'gallery__satin';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
  if (!gl) return null;

  try {
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, satinVert));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, satinFrag));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'program');
    gl.useProgram(program);

    // Un rectángulo que cubre todo el canvas (dos triángulos en tira)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    gl.uniform1i(uniform('uFrom'), 0);
    gl.uniform1i(uniform('uTo'), 1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    return { gl, canvas, uniform };
  } catch (error) {
    console.error('[satin] WebGL no disponible', error);
    return null;
  }
}

function textureFor(gl: WebGLRenderingContext, img: HTMLImageElement) {
  let texture = textures.get(img);
  if (texture) return texture;
  texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  textures.set(img, texture);
  return texture;
}

/** Replica object-fit: cover + object-position de la <img> para que el canvas coincida pixel a pixel. */
function coverOf(img: HTMLImageElement, width: number, height: number): [number, number, number, number] {
  const [fx, fy] = getComputedStyle(img)
    .objectPosition.split(' ')
    .map((v) => (v.endsWith('%') ? parseFloat(v) / 100 : 0.5));
  const imageRatio = img.naturalWidth / img.naturalHeight;
  const boxRatio = width / height;
  if (imageRatio > boxRatio) {
    const sx = boxRatio / imageRatio;
    return [sx, 1, (1 - sx) * fx, 0];
  }
  const sy = imageRatio / boxRatio;
  return [1, sy, 0, (1 - sy) * (1 - fy)];
}

const ready = (img?: HTMLImageElement) => !!img && img.complete && img.naturalWidth > 0;

/** Cambia de `from` a `to` dentro de `media` con la ola de satín. `dir`: hacia dónde avanza la ola. */
export function satinSwap(media: HTMLElement, from: HTMLImageElement, to: HTMLImageElement, dir: 1 | -1) {
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  if (!ready(from) || !ready(to)) return;
  if (satin === undefined) satin = createSatin();
  if (!satin) return;

  const { gl, canvas, uniform } = satin;
  running?.kill();

  const { width, height } = media.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio, MAX_DPR);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  gl.viewport(0, 0, canvas.width, canvas.height);
  if (canvas.parentElement !== media) media.insertBefore(canvas, media.querySelector('.gallery__dots'));

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textureFor(gl, from));
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, textureFor(gl, to));
  gl.uniform4fv(uniform('uFromCover'), coverOf(from, width, height));
  gl.uniform4fv(uniform('uToCover'), coverOf(to, width, height));
  gl.uniform1f(uniform('uDir'), dir);

  const state = { progress: 0 };
  const draw = () => {
    gl.uniform1f(uniform('uProgress'), state.progress);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  draw();
  canvas.style.visibility = 'visible';

  running = gsap.to(state, {
    progress: 1,
    duration: DURATION,
    ease: 'power2.inOut',
    onUpdate: draw,
    onComplete: () => {
      canvas.style.visibility = 'hidden';
      running = null;
    },
  });
}

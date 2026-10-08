// Chinche de plástico rojo: geometría de revolución (base, cuerpo y cabeza) + sombra de contacto.
// La aguja queda "enterrada": la base apoya en z = 0 (superficie del papel) y crece hacia la cámara.
import {
  Color,
  DoubleSide,
  Group,
  LatheGeometry,
  Mesh,
  MeshPhysicalMaterial,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
} from 'three';
import shadowVert from './shaders/shadow.vert.glsl?raw';
import shadowFrag from './shaders/shadow.frag.glsl?raw';

const PIN_RED = '#b3392a';

// Perfil (radio, altura) de abajo hacia arriba.
const PROFILE: [number, number][] = [
  [0, 0],
  [0.07, 0],
  [0.079, 0.007],
  [0.077, 0.019],
  [0.045, 0.028],
  [0.033, 0.045],
  [0.029, 0.1],
  [0.034, 0.114],
  [0.062, 0.123],
  [0.068, 0.138],
  [0.063, 0.156],
  [0.035, 0.168],
  [0, 0.171],
];

export function createPushPin() {
  const group = new Group();
  // Escala real: la cabeza mide ~6% del ancho de la hoja, como una chinche sobre un A4.
  group.scale.setScalar(0.55);

  const geometry = new LatheGeometry(
    PROFILE.map(([r, h]) => new Vector2(r, h)),
    64,
  );
  const material = new MeshPhysicalMaterial({
    color: new Color(PIN_RED),
    roughness: 0.38,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    specularIntensity: 0.6,
    side: DoubleSide,
  });
  const pin = new Mesh(geometry, material);
  // El eje del torno (Y) apunta a la cámara (Z), con una ligera inclinación para que se lea en 3D.
  pin.rotation.set(Math.PI / 2 - 0.3, 0.18, 0);

  // Sombra de contacto sobre el papel, desplazada según la luz (arriba-izquierda).
  const contact = new Mesh(
    new PlaneGeometry(0.3, 0.3),
    new ShaderMaterial({
      vertexShader: shadowVert,
      fragmentShader: shadowFrag,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uOpacity: { value: 0.55 },
        uColor: { value: new Color('#23261c') },
        uBox: { value: new Vector2(0.04, 0.04) },
        uRadius: { value: 0.04 },
        uSoft: { value: 0.42 },
      },
    }),
  );
  contact.position.set(0.05, -0.06, 0.004);

  group.add(contact, pin);
  return group;
}

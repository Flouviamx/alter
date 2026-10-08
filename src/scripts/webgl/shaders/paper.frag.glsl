// Papel: textura del flyer + sombreado según la normal real de la superficie deformada.
uniform sampler2D uMap;

varying vec2 vUv;
varying vec3 vWorld;

void main() {
  vec3 color = texture2D(uMap, vUv).rgb;

  vec3 normal = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
  float light = clamp(dot(normal, normalize(vec3(-0.35, 0.55, 1.0))), 0.0, 1.0);
  color *= mix(0.82, 1.04, light);

  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}

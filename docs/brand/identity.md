# Identidad de marca

Fuente: material que mandó la clienta, guardado en [`refs/`](./refs/).

| Archivo | Qué es |
|---|---|
| `refs/logo-anter-house.jpg` | Logo sobre fondo salvia |
| `refs/flyer-confeccion-ajustes.jpg` | Flyer de precios (fondo lino) |
| `refs/moodboard-editorial.jpg` | Referencia de layout: collage editorial, texto vertical, índice numerado, frase gigante sobre foto |
| `refs/boceto-cliente-canva.jpg` | Boceto de la clienta en Canva: "ANTER house / Nuestra esencia / Diseños / Agenda tu cita" |

## Estilo: editorial de moda / collage *broken grid*

El hero es la referencia de todo el sitio. Sus rasgos:

- Fotos sueltas a distintas escalas, sin retícula rígida, que se enciman.
- Una tipografía display fina de alto contraste como protagonista: el wordmark gigante.
- Texto vertical en terracota como acento.
- Índice numerado con líneas finas de 1 px y flechas en círculo.
- Fondo salvia continuo, sin bandas de color entre secciones.

Recursos de revista de moda disponibles (primero usado en Esencia):

- **Capital** (`<WordReveal dropCap />`): primera letra en Italiana terracota que ocupa varias líneas.
- **Cuerpo a dos columnas** con filete de 1 px y **entrada en versalitas** (primeras palabras en mayúsculas espaciadas).
- **Cita destacada**: Italiana con filete vertical terracota a la izquierda y firma en versalitas. No uses la comilla de Italiana, que se ve rara.
- **Pies de foto** (`ui/FigCaption.astro`): `Fig. n` + título en letra pequeña, vertical junto al borde (`vertical`) o debajo de la foto. La numeración es correlativa en toda la página.
- **Composición sin huecos**: si una pantalla queda con esquinas vacías, se llenan con piezas sueltas (foto chica con pie, nota de columna), como en el hero.

No usar:

- Etiquetas tipo `03 —— S E R V I C I O S` (número + raya + mayúsculas espaciadas). Se sienten corporativas.
- Filas de valores numerados (`01 DISEÑO PROPIO  02 …`). Se ven "hechas por IA"; usa una cita destacada o texto corrido.
- Títulos enormes fuera del wordmark.
- Secciones con fondos alternados.

## Logo

```
A N T E R
H O U S E
b e s p o k e   f a s h i o n
```

En la web se **recrea tipográficamente** (Hero, Header, Footer, flyer). Todavía no hay archivo vectorial.

**Pendiente:** pedir el logo en SVG y el nombre de la fuente original.

## Paleta

Valores muestreados directamente de las imágenes de referencia.

| Token | Hex | Origen | Uso |
|---|---|---|---|
| `--salvia` | `#C5C8AD` | Fondo del logo | **Fondo de todo el sitio** |
| `--salvia-soft` | `#D8DAC6` | Derivado | Placeholder de imágenes |
| `--salvia-deep` | `#8E9274` | Derivado | Texto secundario sobre tinta (menú) |
| `--lino` | `#EFF0E0` | Fondo del flyer | Papel del flyer, texto sobre tinta |
| `--tinta` | `#23261C` | Tinta del wordmark | Texto, botón Menú, overlay del menú |
| `--tinta-soft` | `#4A4D40` | Derivado | Párrafos y metadatos |
| `--terracota` | `#B4552F` | Vestido de satín del portafolio | **Solo acento**: etiquetas, texto vertical, números, hover |

Rojo de la chinche 3D: `#B3392A` (en `src/scripts/webgl/pushPin.ts`).

## Tipografía

| Rol | Fuente | Por qué |
|---|---|---|
| Display (wordmark, títulos, etiquetas de sección) | **Italiana** 400 | Sans de alto contraste, la más cercana al `ANTER` del logo |
| Texto, botones, índices | **Jost Variable** | Geométrica tipo Futura, como `HOUSE` y el flyer |

Escala en `global.css`: `--text-title` (títulos), `--text-lead` (manifiesto) y `--text-body`.

## Tono de voz

Cercano, cálido y artesanal, en segunda persona ("tu evento", "tu silueta"). Frases cortas. Se habla de proceso y de detalle, no de lujo genérico. Se usa el femenino plural cuando aplica ("elegimos juntas"). No uses guiones largos en títulos ni descripciones.

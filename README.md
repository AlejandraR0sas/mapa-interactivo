<!--
BASE DEL README: completen cada sección y borren este comentario al terminar.
Quién llena qué (entre paréntesis en cada sección):
  Ale:     descripción, tecnologías, capas base y puntos
  Yael:    estructura, convenciones de datos, GeoJSON, cómo correrlo
  Antulio: indicadores, cómo usar el mapa, publicación, limitaciones
Los hallazgos van en el PDF aparte, no aquí.
-->

# Mapa interactivo de México: [título del indicador principal]

[Una o dos frases: qué muestra el mapa, qué datos combina y para qué sirve.] *(Ale)*

**Mapa publicado:** [enlace de GitHub Pages]

**Integrantes:** Ale, Yael y Antulio

---

## Qué hace el mapa
- Colorea cada entidad federativa según un indicador (coropleta).
- Muestra un tooltip al pasar el mouse y un panel de detalle al hacer clic.
- Tiene leyenda y selectores de indicador y año.
- Incluye una capa de puntos de [universidades / hospitales] con agrupamiento de marcadores.

## Cómo usar el mapa *(Antulio)*
1. [Pasa el mouse sobre un estado para ver su valor.]
2. [Haz clic para abrir el detalle.]
3. [Cambia el indicador o el año con los selectores.]
4. [Enciende o apaga la capa de puntos.]

## Indicadores y años *(Antulio)*
| Indicador | Unidad | Años | Fuente |
|---|---|---|---|
| [ ] | [ ] | [ ] | [ ] |

## Tecnologías *(Ale)*
- Librería de mapas: [ ]
- Agrupamiento de marcadores: [ ]
- Escala de color: [ ]
- Capas base (tiles): [ ] — atribución: [ ]
- Publicación: GitHub Pages

## Estructura del proyecto *(Yael)*
```
index.html          Página principal
css/                base.css, panel.css, controles.css
js/                 main, mapa, datos, coropleta, interaccion, panel, selectores, puntos
data/               estados.geojson, indicadores.csv, puntos.geojson
docs/               investigacion.md
```
Funciones que ofrece cada archivo de js/ (acordadas por el equipo): [completar]

## Convenciones de datos *(Yael)*
- Clave de entidad: texto de dos dígitos ("01" a "32").
- Columnas de `indicadores.csv`: `cve_ent, entidad, anio, indicador, valor, unidad`
- Propiedades del GeoJSON de estados: [ ]
- Propiedades del GeoJSON de puntos: [ ]

## Fuentes de datos
| Archivo | Fuente | Enlace | Fecha de descarga | Transformaciones |
|---|---|---|---|---|
| estados.geojson | [ ] | [ ] | [ ] | [simplificado, reproyectado, etc.] *(Yael)* |
| indicadores.csv | [ ] | [ ] | [ ] | [ ] *(Antulio)* |
| puntos.geojson | [ ] | [ ] | [ ] | [ ] *(Ale)* |

## Cómo correrlo localmente *(Yael)*
[Pasos mínimos. Nota: abrir index.html con doble clic puede fallar al cargar los archivos de data/; usar un servidor local sencillo.]

## Publicación en GitHub Pages *(Antulio)*
[Repositorio, rama usada, carpeta, y los pasos que se siguieron. Recordar que todas las rutas deben ser relativas.]

## Limitaciones *(los tres)*
- [Los valores por estado ocultan diferencias dentro de cada estado.]
- [La escala de color y el número de clases influyen en lo que se ve.]
- [Otras.]

## Créditos
Datos: [instituciones]. Mapas base: [proveedores]. Proyecto de práctica de [materia], [institución].

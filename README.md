<!--
BASE DEL README: completen cada sección y borren este comentario al terminar.
Quién llena qué (entre paréntesis en cada sección):
  Ale:     descripción, tecnologías, capas base y puntos
  Yael:    estructura, convenciones de datos, GeoJSON, cómo correrlo
  Antulio: indicadores, cómo usar el mapa, publicación, limitaciones
Los hallazgos van en el PDF aparte, no aquí.
-->

# Mapa interactivo de México: población por entidad federativa
 
Mapa interactivo de las 32 entidades federativas de México que combina un indicador por estado (población, representada con colores) con la ubicación de 8,305 establecimientos de educación superior, para explorar patrones regionales.
 
**Mapa publicado:** [enlace de GitHub Pages]

---

## Qué hace el mapa
- Colorea cada entidad federativa según un indicador (coropleta).
- Muestra un tooltip al pasar el mouse y un panel de detalle al hacer clic.
- Tiene leyenda y selectores de indicador y año.
- Incluye una capa de puntos de universidades (establecimientos de educación superior) con agrupamiento de marcadores.


## Cómo usar el mapa
1. Pasa el mouse sobre un estado para ver su nombre y su valor.
2. Haz clic en un estado para abrir el panel de detalle.
3. Cambia el indicador o el año con los selectores; los colores y la leyenda se actualizan.
4. Enciende o apaga la capa de universidades con el interruptor de puntos.
5. Haz clic en un círculo con número para acercarte y separar el grupo; haz clic en un punto para ver los datos del establecimiento.
6. Cambia el mapa de fondo con el control de capas (arriba a la derecha).

## Indicadores y años *(Antulio)*
| Indicador | Unidad | Años | Fuente |
|---|---|---|---|
| Población total | Habitantes | [2010, 2015, 2020: confirmar] | INEGI, [Censo de Población y Vivienda / Encuesta Intercensal: confirmar] |

## Tecnologías
- **Librería de mapas:** Leaflet 1.9.4
- **Agrupamiento de marcadores:** Leaflet.markercluster 1.5.3
- **Capas base (tiles):** OpenStreetMap, en versión gris (filtro CSS) y a color. Atribución: © OpenStreetMap contributors
- **Lenguajes:** HTML, CSS y JavaScript, sin herramientas de compilación


## Estructura del proyecto
```
index.html          Página principal
css/                base.css, panel.css, controles.css
js/                 main, mapa, datos, coropleta, interaccion, panel, selectores, puntos
data/               estados.geojson, indicadores.csv, puntos.geojson
docs/               investigacion.md
```

| Archivo | Funciones |
|---|---|
| `mapa.js` | `crearMapa(idContenedor)` |
| `puntos.js` | `cargarPuntos(mapa)`, `mostrarPuntos(mapa)`, `ocultarPuntos(mapa)`, `alternarPuntos(mapa)` |
| `datos.js` | `cargarDatos()`, `obtenerIndicadores()`, `obtenerAnios(indicador)` |
| `coropleta.js` | `crearCoropleta(mapa, estados, estado)`, `actualizarCoropleta(estado)` |
| `interaccion.js` | `activarInteraccion(capaEstados, estado, alSeleccionar)` |
| `panel.js` | `mostrarPanel(estado)`, `actualizarPanel(estado)`, `cerrarPanel()` |
| `selectores.js` | `crearSelectores(estado, { alCambiar, alAlternarPuntos })` |
| `main.js` | Arranque y objeto `estado` (`indicador`, `anio`, `cveSeleccionada`) |
 
## Convenciones de datos
- Clave de entidad: texto de dos dígitos (`"01"` a `"32"`).
- Columnas de `indicadores.csv`: `cve_ent, entidad, anio, indicador, valor, unidad`
- Propiedades del GeoJSON de estados: [por definir]
- Propiedades del GeoJSON de puntos: `nombre`, `tipo`, `cve_ent`, `entidad`, `municipio`


## Fuentes de datos
| Archivo | Fuente | Enlace | Fecha de descarga | Transformaciones |
|---|---|---|---|---|
| estados.geojson | [ ] | [ ] | [ ] | [simplificado, reproyectado, etc.] |
| indicadores.csv | [ ] | [ ] | [ ] | [ ] |
| puntos.geojson | INEGI, DENUE (sector 61, Servicios educativos), datos de 05/2026 | https://www.inegi.org.mx/app/descarga/?ti=6 | 19/11/2026 | Filtrado por actividad SCIAN 6113 (educación superior): de 150,571 registros se conservaron 8,305; 53 duplicados eliminados; ninguno sin coordenadas ni fuera de México; convertido a GeoJSON con un script de Python |
 
## Cómo correrlo localmente
Abrir `index.html` con doble clic puede fallar, porque el navegador bloquea la carga de los archivos de `data/`. Hay que usar un servidor local desde la carpeta raíz del proyecto:
 
- **VS Code:** instalar la extensión *Live Server* y pulsar "Go Live".
- **Python:** ejecutar `python -m http.server 8000` y abrir `http://localhost:8000`.

## Publicación en GitHub Pages *(Antulio)*
[Repositorio, rama usada, carpeta, y los pasos que se siguieron. Recordar que todas las rutas deben ser relativas.]


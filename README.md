# Mapa interactivo de México: población por entidad federativa
 
Mapa interactivo de las 32 entidades federativas de México que combina un indicador por estado (población, representada con colores) con la ubicación de 8,305 establecimientos de educación superior, para explorar patrones regionales.
 
**Publicación:** el proyecto está listo para servirse como sitio estático; falta definir el repositorio/rama de GitHub Pages y publicar.

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
| Población total, de hombres y de mujeres | Personas | 2010, 2020 | INEGI, Censos de Población y Vivienda 2010 y 2020 |

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
| `datos.js` | `cargarDatos()`, `obtenerIndicadores()`, `obtenerAnios(indicador)`, `obtenerRegistro(clave, indicador, anio)`, `obtenerValor(clave, indicador, anio)`, `obtenerRango(indicador, anio)`, `obtenerDatosEstado(clave)` |
| `coropleta.js` | `crearCoropleta(mapa, estados, estado)`, `actualizarCoropleta(estado)` |
| `interaccion.js` | `activarInteraccion(capaEstados, estado, alSeleccionar)` |
| `panel.js` | `mostrarPanel(estado)`, `actualizarPanel(estado)`, `cerrarPanel()` |
| `selectores.js` | `crearSelectores(estado, { alCambiar, alAlternarPuntos })` |
| `main.js` | Arranque y objeto `estado` (`indicador`, `anio`, `cveSeleccionada`) |
 
## Convenciones de datos
- Clave de entidad: texto de dos dígitos (`"01"` a `"32"`).
- Columnas de `indicadores.csv`: `cve_ent, entidad, anio, indicador, valor, unidad`
- Propiedades mínimas del GeoJSON de estados: `cve_ent` (texto de dos dígitos), `entidad` (nombre) y `indicadores` (lista agregada al cargar). Se aceptan `nom_ent`/`NOMGEO` como nombre y `CVE_ENT`/`CVEGEO` como clave de origen.
- Propiedades del GeoJSON de puntos: `nombre`, `tipo`, `cve_ent`, `entidad`, `municipio`


## Fuentes de datos
| Archivo | Fuente | Enlace | Fecha de descarga | Transformaciones |
|---|---|---|---|---|
| estados.geojson | INEGI, Marco Geoestadístico, AGEE 2025 | https://www.inegi.org.mx/servicios/catalogounico.html | Descargado el 22/11/2026 | 32 geometrías estatales; propiedades reducidas a clave y nombre; simplificado topológicamente con Mapshaper; coordenadas geográficas para Leaflet; archivo de 1.65 MB. |
| indicadores.csv | INEGI, Censo de Población y Vivienda 2010 y 2020 | https://inegi.org.mx/contenidos/productos/prod_serv/contenidos/espanol/bvinegi/productos/nueva_estruc/889463904847.pdf | Consultado el 22/11/2026 | Población total, de hombres y de mujeres; 32 claves por indicador y año; sin separadores de miles y con unidad en columna aparte. |
| puntos.geojson | INEGI, DENUE (sector 61, Servicios educativos), datos de 05/2026 | https://www.inegi.org.mx/app/descarga/?ti=6 | 19/11/2026 | Filtrado por actividad SCIAN 6113 (educación superior): de 150,571 registros se conservaron 8,305; 53 duplicados eliminados; ninguno sin coordenadas ni fuera de México; convertido a GeoJSON con un script de Python |
 
## Cómo correrlo localmente
Abrir `index.html` con doble clic puede fallar, porque el navegador bloquea la carga de los archivos de `data/`. Hay que usar un servidor local desde la carpeta raíz del proyecto:
 
- **VS Code:** instalar la extensión *Live Server* y pulsar "Go Live".
- **Python:** ejecutar `python -m http.server 8000` y abrir `http://localhost:8000`.

`data/estados.geojson` contiene un `FeatureCollection` de 32 entidades con geometrías Polygon/MultiPolygon y clave `cve_ent`; `data/indicadores.csv` contiene una fila por entidad, indicador y año. El cargador valida encabezados y tipos, une por `cve_ent` y avisa en consola si detecta claves sin correspondencia.

## Publicación en GitHub Pages
Repositorio: https://github.com/AlejandraR0sas/mapa-interactivo (rama `main`, archivos en la raíz). Para publicarlo, abre **Settings → Pages**, selecciona **Deploy from a branch**, elige `main` y la carpeta `/ (root)`, y guarda. GitHub mostrará la URL pública cuando termine el primer despliegue. La publicación todavía no se ha activado desde este entorno.


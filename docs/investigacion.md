<!--
ARCHIVO:      docs/investigacion.md
Aportan LOS TRES: cada quien escribe una sección, otra persona la revisa,
y luego cada uno la expone al equipo (así los tres entienden todo).

  Sección 1 (Ale):     escribe Ale     | revisa Yael
  Sección 2 (Yael):    escribe Yael    | revisa Antulio
  Sección 3 (Antulio): escribe Antulio | revisa Ale

REGLAS
- Toda afirmación importante lleva su fuente (enlace y fecha de consulta).
- Escribir con palabras propias; no copiar texto de otras páginas.
- Cada sección indica quién la escribió y quién la revisó.
Borrar este comentario al terminar.
-->

# Investigación

## 1. Capas base y tiles
*Escribe: Ale — Revisa: Yael*

### ¿Qué es un tile?
Un tile (o tesela) es un fragmento rectangular de un mapa, casi siempre cuadrado, de 256×256 o 512×512 píxeles. En lugar de descargar un mapa gigante de todo el planeta, el navegador pide solo los fragmentos que caben en la pantalla según la zona y el nivel de acercamiento. Por eso un mapa que cubre el mundo entero puede cargar rápido. Los tiles pueden ser imágenes (ráster) o datos geográficos recortados (vectoriales), en este proyecto usamos tiles ráster.

### Cómo se numeran: z / x / y
Los mapas web identifican cada tile con tres números:

- **z (zoom):** nivel de acercamiento. En z = 0 todo el mundo cabe en un solo tile; en el nivel z hay 2^z × 2^z tiles.
- **x (columna):** posición horizontal, de 0 en el extremo oeste a 2^z − 1 en el este.
- **y (fila):** posición vertical, de 0 en el norte a 2^z − 1 en el sur (estándar XYZ de OpenStreetMap). En el estándar TMS el eje y se cuenta al revés, de sur a norte.

Con esta numeración cada tile tiene su propia dirección (por ejemplo `.../5/7/14.png`), lo que permite pedirlo directamente y guardarlo en caché.

### Capa base y capa superpuesta
La capa base es el fondo de referencia geográfica del mapa (calles, relieve). Como cambia poco, su imagen se calcula una vez y se reutiliza, por lo que se muestra muy rápido. La capa superpuesta es una capa con datos específicos que se coloca encima de la base para analizarlos o visualizarlos.

En nuestro proyecto, la capa base es OpenStreetMap, las capas superpuestas son los estados coloreados según el indicador y los puntos de [universidades / hospitales].

### La atribución
Los proveedores de tiles exigen mostrar un crédito visible en el mapa. Es una condición de uso: sin ella se incumplen sus términos. En nuestro mapa aparece abajo a la derecha.


## 2. GeoJSON y proyecciones
*Escribe: Yael — Revisa: Antulio*

<!--
- Qué es GeoJSON: colección, elementos, geometría y propiedades (explicado en palabras).
- Tipos de geometría (punto, polígono, multipolígono) y cuáles usamos.
- Proyecciones: coordenadas geográficas (WGS84) contra Web Mercator; por qué importan.
- Cómo se unen los datos por clave de entidad y por qué la clave debe tener el mismo formato.
- DECISIÓN: fuente del GeoJSON y cómo se simplificó.
-->

## 3. Escalas de color
*Escribe: Antulio — Revisa: Ale*

<!--
- Tipos de escala (secuencial, divergente, categórica) y cuál corresponde a nuestros indicadores.
- Métodos de clasificación: cuantiles, intervalos iguales, cortes naturales; ventajas y riesgos.
- Accesibilidad: daltonismo, contraste, número razonable de clases.
- DECISIÓN: escala y método elegidos (con la comparación visual que hicieron).
- DECISIÓN: indicadores y años elegidos, y por qué.
-->
### Fuentes
- CARTO. *A guide to map tiles.* https://carto.com/blog/map-tiles-guide/ (consultado el 18/11/2026)
- MappingGIS. *Qué son los vector tiles y cómo generarlos con GeoServer.* https://mappinggis.com/2017/09/que-son-los-vector-tiles-y-como-generarlos-con-geoserver/ (consultado el 18/11/2026)
- Esri. *Working with basemap layers.* https://desktop.arcgis.com/en/arcmap/latest/map/working-with-layers/working-with-basemap-layers.htm (consultado el 18/11/2026)
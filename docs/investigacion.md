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

En nuestro proyecto, la capa base es OpenStreetMap; las capas superpuestas son las entidades coloreadas por población y los establecimientos de educación superior.

### La atribución
Los proveedores de tiles exigen mostrar un crédito visible en el mapa. Es una condición de uso: sin ella se incumplen sus términos. En nuestro mapa aparece abajo a la derecha.


## 2. GeoJSON y proyecciones
*Escribe: Yael — Revisa: Antulio*

GeoJSON representa información geográfica como una colección de entidades (*features*). Cada entidad combina una geometría y propiedades descriptivas. En este mapa, los establecimientos se representan con geometrías `Point`; las entidades federativas deben ser `Polygon` o `MultiPolygon`, ya que algunas tienen islas o polígonos separados. Las propiedades mínimas que usa el proyecto son la clave geoestadística `cve_ent` y el nombre de la entidad.

Las coordenadas geográficas WGS84 se expresan como longitud y latitud en grados. Leaflet proyecta esos datos para mostrarlos en el mapa web; por eso no se debe etiquetar como WGS84 una capa que aún esté en la proyección cónica conforme de Lambert del Marco Geoestadístico. El servicio del Catálogo Único del INEGI publica geometrías GeoJSON de las áreas geoestadísticas estatales (AGEE) por clave y para todas las entidades. La clave estatal es texto de dos caracteres (`01` a `32`); conservarla como texto evita perder el cero inicial y permite unirla con la columna `cve_ent` del CSV.

El cargador transforma claves y valores a tipos consistentes, agrega los registros del CSV a cada entidad y avisa en consola si una geometría no encuentra observaciones o si el CSV contiene claves sin geometría. La simplificación geométrica debe conservar la topología y los límites reconocibles; después de simplificar se debe validar visualmente la capa y comprobar sus 32 claves.

**Fuente y preparación de la geometría:** [INEGI, Servicio Web del Catálogo Único de Claves Geoestadísticas](https://www.inegi.org.mx/servicios/catalogounico.html), consultado el 22/11/2026. Se descargaron las 32 geometrías AGEE del Marco Geoestadístico 2025 y se conservaron únicamente la clave y el nombre. El servicio describe `cve_ent` como clave textual de dos caracteres. Se simplificaron los polígonos con Mapshaper al 5 % de vértices, conservando las 32 entidades; el archivo resultante mide 1.65 MB y Mapshaper reconoce coordenadas geográficas WGS84. La geometría se validó estructuralmente como GeoJSON Polygon/MultiPolygon.

## 3. Escalas de color
*Decisión implementada en el mapa; fuentes y criterios anotados en esta sección.*

La población total es una variable cuantitativa ordenada y no tiene un punto medio con significado especial; por eso corresponde una escala secuencial. Se usan cinco tonos azules claros a oscuros de la paleta `Blues` de ColorBrewer. El gris se reserva para datos ausentes. La escala de un solo matiz evita sugerir una categoría o una diferencia positiva/negativa y conserva contraste con el fondo gris del mapa.

Se eligieron **cuantiles en cinco clases**: con 32 entidades, las clases quedan equilibradas en cantidad de estados, mientras que intervalos iguales concentran casi todas las entidades en los rangos bajos por la diferencia entre las entidades menos pobladas y el Estado de México. La comparación con población total 2020 lo muestra: los intervalos iguales distribuyen los estados en **22, 6, 3, 0 y 1** por clase; los cuantiles, en **7, 6, 7, 6 y 6**. Los cortes de cuantiles son 1,622,138; 2,402,598; 3,540,685 y 5,784,442 personas. Aguascalientes queda en la primera clase, Nuevo León en la cuarta y Estado de México en la quinta. Los límites se calculan para cada indicador y año con los 32 valores disponibles; por ello la leyenda cambia con la selección. La paleta y la clasificación facilitan comparar patrones relativos, pero los rangos deben leerse en la leyenda y no como incrementos iguales.

El conjunto ofrece tres indicadores —población total, población de hombres y población de mujeres— para 2010 y 2020, con personas como unidad. Se eligieron los dos censos por ser observaciones comparables de la misma fuente estadística y permitir explorar el cambio entre décadas. Los valores por sexo se tomaron del cuadro 2.2; el total femenino coincide con el total publicado menos el total de hombres.

Fuentes consultadas el 22/11/2026:

- [INEGI, Anuario estadístico y geográfico por entidad federativa 2021, cuadro 2.2 (población total por entidad, censos 2010 y 2020)](https://inegi.org.mx/contenidos/productos/prod_serv/contenidos/espanol/bvinegi/productos/nueva_estruc/889463904847.pdf).
- [ColorBrewer, herramienta de selección de paletas cartográficas](https://colorbrewer2.org/).

### Fuentes
- CARTO. *A guide to map tiles.* https://carto.com/blog/map-tiles-guide/ (consultado el 18/11/2026)
- MappingGIS. *Qué son los vector tiles y cómo generarlos con GeoServer.* https://mappinggis.com/2017/09/que-son-los-vector-tiles-y-como-generarlos-con-geoserver/ (consultado el 18/11/2026)
- Esri. *Working with basemap layers.* https://desktop.arcgis.com/en/arcmap/latest/map/working-with-layers/working-with-basemap-layers.htm (consultado el 18/11/2026)

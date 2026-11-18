/*
ARCHIVO:      js/datos.js
RESPONSABLE:  Yael
APOYO:        Antulio
REVISOR:      Ale

QUÉ DESARROLLAR
1. Cargar data/estados.geojson y data/indicadores.csv.
2. Convertir los valores al tipo correcto: números como números y la CLAVE DE ENTIDAD
   siempre como texto de dos dígitos ("01" ... "32").
3. UNIR el GeoJSON con la tabla por clave de entidad: a cada estado se le agregan
   sus valores por indicador y por año.
4. Verificar la unión: avisar en la consola cuántos estados quedaron sin dato
   y cuáles son (deben ser 0 de 32).
5. Ofrecer funciones simples al resto del equipo, por ejemplo:
   - lista de indicadores y de años disponibles,
   - valor de un estado para un indicador y un año,
   - mínimo y máximo de un indicador (lo necesita coropleta.js),
   - todos los valores de un estado (lo necesita panel.js).
6. Manejar errores de carga con un mensaje claro.

REGLAS
- Los nombres de columnas deben ser EXACTAMENTE los acordados en el README (convenciones de datos).
- Este archivo no dibuja nada ni toca la pantalla.

LISTO CUANDO
- Los 32 estados tienen dato y las funciones devuelven lo esperado.
*/

/*
ARCHIVO:      js/puntos.js
RESPONSABLE:  Ale
APOYO:        Yael
REVISOR:      Antulio

QUÉ DESARROLLAR
1. Cargar los puntos desde data/puntos.geojson.
2. Crear la capa de marcadores con AGRUPAMIENTO: al alejar el zoom se agrupan en
   círculos con el número de puntos, y al acercar se separan.
3. Definir el aspecto del marcador y del grupo para que se distingan de los
   colores de los estados.
4. POPUP al hacer clic en un punto: nombre y datos básicos (tipo, entidad, municipio).
5. Ofrecer una forma de ENCENDER Y APAGAR la capa (la usa selectores.js).
6. Verificar rendimiento: el mapa debe seguir fluido con todos los puntos y la coropleta activa.

REGLAS
- Los puntos van ENCIMA de los estados sin impedir hacer clic en ellos.
- Si hay datos raros, se corrigen en data/puntos.geojson, no aquí.

LISTO CUANDO
- Los grupos se forman y separan al hacer zoom y los popups muestran datos correctos.
*/

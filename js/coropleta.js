/*
ARCHIVO:      js/coropleta.js
RESPONSABLE:  Antulio
APOYO:        Ale
REVISOR:      Yael

QUÉ DESARROLLAR
1. Definir la ESCALA DE COLOR: tipo (secuencial), paleta, número de clases y método
   (cuantiles o intervalos iguales). Probar ambos y anotar en docs/investigacion.md
   cuál se eligió y por qué.
2. Función que, dado un estado, devuelva su color según el indicador y año activos.
3. Estilo de cada estado: relleno, borde, transparencia.
4. Color y mensaje para estados SIN dato (por ejemplo gris con "sin dato").
5. Construir la LEYENDA: rangos de cada clase, colores, indicador, unidad y año.
   Debe actualizarse al cambiar indicador o año.
6. Función para repintar todo el mapa cuando cambie el indicador o el año.
7. Accesibilidad: paleta distinguible en daltonismo y con buen contraste sobre el mapa base.

REGLAS
- Los valores vienen de datos.js. El formato visual de la leyenda está en css/controles.css.

LISTO CUANDO
- Los 32 estados tienen color, la leyenda coincide con los colores y se verificó con
  2 o 3 estados que el color corresponde al dato.
*/

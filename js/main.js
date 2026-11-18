/*
ARCHIVO:      js/main.js
RESPONSABLE:  Ale
APOYO:        Yael
REVISOR:      Antulio

QUÉ DESARROLLAR
Este archivo solo "dirige la orquesta": no contiene la lógica de cada pieza.
1. Definir el ESTADO de la aplicación: indicador activo, año activo, estado (entidad)
   seleccionado y si la capa de puntos está visible.
2. Llamar en orden a las piezas: mapa.js (crear el mapa), datos.js (cargar y unir),
   coropleta.js (pintar y leyenda), interaccion.js (tooltip y clic), panel.js (detalle),
   selectores.js (indicador y año) y puntos.js (capa de puntos).
3. Cuando cambie el indicador, el año o el estado seleccionado, avisar a las piezas
   que deban actualizarse, SIN recargar la página.
4. Manejar errores: si un archivo no carga, mostrar un mensaje claro en la página.

REGLAS
- Acordar con Yael y Antulio los NOMBRES de las funciones que ofrece cada archivo
  antes de escribirlos (anotarlos en el README, sección de estructura).
- Ningún cálculo de colores ni de datos vive aquí.

LISTO CUANDO
- Todas las piezas se conectan y cambiar de indicador actualiza todo el mapa.
*/

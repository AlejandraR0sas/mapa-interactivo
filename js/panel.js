/*
ARCHIVO:      js/panel.js
RESPONSABLE:  Yael
APOYO:        Antulio
REVISOR:      Ale

QUÉ DESARROLLAR
1. Panel de detalle que se llena al hacer clic en un estado: nombre, todos los
   indicadores disponibles con su valor, unidad y año.
2. Evolución por año del indicador activo (lista o gráfica sencilla).
3. Estado inicial del panel (mensaje de ayuda cuando no hay estado seleccionado)
   y botón o gesto para cerrarlo.
4. Actualizar el contenido si cambian el indicador o el año con un estado ya seleccionado.
5. Caso de un estado sin dato: mostrar "sin dato", sin errores.

REGLAS
- Los datos se piden a datos.js. El clic lo detecta interaccion.js, que avisa a este archivo.
- El diseño vive en css/panel.css.

LISTO CUANDO
- El panel se abre, se actualiza y se cierra correctamente en todos los casos.
*/

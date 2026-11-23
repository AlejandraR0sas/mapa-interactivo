function crearSelectores(estado, { alCambiar = () => {}, alAlternarPuntos = () => {} } = {}) {
  const selectorIndicador = document.getElementById('indicador');
  const selectorAnio = document.getElementById('anio');
  const interruptorPuntos = document.getElementById('mostrar-puntos');
  if (!selectorIndicador || !selectorAnio) return;

  const indicadores = obtenerIndicadores();
  selectorIndicador.replaceChildren(...indicadores.map((indicador) => new Option(indicador, indicador)));
  if (!indicadores.length) {
    selectorIndicador.add(new Option('Sin indicadores disponibles', ''));
    selectorIndicador.disabled = true;
    selectorAnio.add(new Option('Sin años disponibles', ''));
    selectorAnio.disabled = true;
    return;
  }

  selectorIndicador.value = estado.indicador || indicadores[0];
  const llenarAnios = (anioPreferido) => {
    const anios = obtenerAnios(estado.indicador);
    selectorAnio.replaceChildren(...anios.map((anio) => new Option(String(anio), String(anio))));
    selectorAnio.disabled = !anios.length;
    if (!anios.length) { estado.anio = null; return; }
    estado.anio = anios.includes(Number(anioPreferido)) ? Number(anioPreferido) : anios[anios.length - 1];
    selectorAnio.value = String(estado.anio);
  };
  llenarAnios(estado.anio);

  selectorIndicador.addEventListener('change', () => {
    estado.indicador = selectorIndicador.value;
    llenarAnios(estado.anio);
    alCambiar(estado);
  });
  selectorAnio.addEventListener('change', () => {
    estado.anio = Number(selectorAnio.value);
    alCambiar(estado);
  });
  interruptorPuntos?.addEventListener('change', () => alAlternarPuntos(interruptorPuntos.checked));
}

function formatearNumero(valor) {
  return valor === null || valor === undefined || !Number.isFinite(Number(valor))
    ? 'Sin dato'
    : new Intl.NumberFormat('es-MX', { maximumFractionDigits: 2 }).format(Number(valor));
}

function mostrarPanel(estado) {
  const panel = document.getElementById('panel');
  if (!panel) return;
  panel.hidden = false;
  panel.setAttribute('aria-live', 'polite');
  actualizarPanel(estado);
}

function actualizarPanel(estado) {
  const panel = document.getElementById('panel');
  if (!panel) return;
  const clave = estado?.cveSeleccionada;
  const feature = estadosCargados.find((f) => f.properties.cve_ent === normalizarClave(clave));
  if (!clave || !feature) { mostrarEstadoVacio(panel); return; }

  const nombre = feature.properties.entidad || `Entidad ${normalizarClave(clave)}`;
  const todos = obtenerDatosEstado(clave);
  const indicadores = obtenerIndicadores();
  const bloques = indicadores.map((indicador) => {
    const registros = todos.filter((f) => f.indicador === indicador).sort((a, b) => a.anio - b.anio);
    const actual = obtenerRegistro(clave, indicador, estado.indicador === indicador ? estado.anio : registros.at(-1)?.anio);
    const unidad = actual?.unidad || registros.find((f) => f.unidad)?.unidad || '';
    const filas = registros.length
      ? registros.map((f) => `<li><span>${f.anio}</span><strong>${formatearNumero(f.valor)}${f.valor !== null && unidad ? ` ${escaparTexto(f.unidad)}` : ''}</strong></li>`).join('')
      : '<li><span>Sin registros</span><strong>Sin dato</strong></li>';
    return `<section class="panel-indicador"><h3>${escaparTexto(indicador)}</h3><p class="panel-valor-actual">${actual ? formatearNumero(actual.valor) : 'Sin dato'}${actual?.valor !== null && actual?.unidad ? ` <span>${escaparTexto(actual.unidad)}</span>` : ''}${actual ? ` <small>(${actual.anio})</small>` : ''}</p><h4>Evolución por año</h4><ol>${filas}</ol></section>`;
  }).join('');

  panel.innerHTML = `<div class="panel-cabecera"><div><p class="panel-etiqueta">Entidad federativa</p><h2 id="panel-titulo">${escaparTexto(nombre)}</h2></div><button class="panel-cerrar" type="button" aria-label="Cerrar detalle">×</button></div>${bloques || '<p>Aún no hay indicadores cargados.</p>'}`;
  panel.querySelector('.panel-cerrar').addEventListener('click', cerrarPanel);
}

function mostrarEstadoVacio(panel) {
  panel.innerHTML = '<div class="panel-vacio"><h2>Detalle por entidad</h2><p>Selecciona una entidad en el mapa para consultar sus indicadores y su evolución por año.</p></div>';
}

function cerrarPanel() {
  const panel = document.getElementById('panel');
  if (!panel) return;
  panel.hidden = true;
}

function escaparTexto(texto) {
  const elemento = document.createElement('span');
  elemento.textContent = texto ?? '';
  return elemento.innerHTML;
}

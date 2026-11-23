const PALETA_COROPLETA = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];
const COLOR_SIN_DATO = '#a7adb5';
let capaCoropleta;
let estadoCoropleta;
let rangosCoropleta = [];

function escaparLeyenda(texto) {
  const nodo = document.createElement('span');
  nodo.textContent = texto ?? '';
  return nodo.innerHTML;
}

function calcularCortes(valores, cantidad = PALETA_COROPLETA.length) {
  const ordenados = valores.filter(Number.isFinite).sort((a, b) => a - b);
  if (!ordenados.length) return [];
  const cortes = [];
  for (let i = 1; i < cantidad; i++) {
    const indice = Math.ceil((i * ordenados.length) / cantidad) - 1;
    const corte = ordenados[Math.max(0, Math.min(indice, ordenados.length - 1))];
    if (corte < ordenados.at(-1) && (cortes.length === 0 || corte > cortes.at(-1))) cortes.push(corte);
  }
  return cortes;
}

function colorDelEstado(feature, estado = estadoCoropleta) {
  const valor = obtenerValor(feature.properties.cve_ent, estado?.indicador, estado?.anio);
  if (valor === null) return COLOR_SIN_DATO;
  const clase = rangosCoropleta.findIndex((corte) => valor <= corte);
  return PALETA_COROPLETA[clase < 0 ? rangosCoropleta.length : clase];
}

function estiloEstado(feature, estado = estadoCoropleta) {
  const seleccionado = feature.properties.cve_ent === estado?.cveSeleccionada;
  return {
    color: seleccionado ? '#101820' : '#ffffff',
    weight: seleccionado ? 3 : 1,
    opacity: 1,
    fillColor: colorDelEstado(feature, estado),
    fillOpacity: 0.82
  };
}

function crearCoropleta(mapa, estados, estado) {
  estadoCoropleta = estado;
  capaCoropleta = L.geoJSON(estados, { style: (feature) => estiloEstado(feature, estado) }).addTo(mapa);
  actualizarCoropleta(estado);
  return capaCoropleta;
}

function actualizarCoropleta(estado) {
  if (!estado) return;
  estadoCoropleta = estado;
  const rango = obtenerRango(estado.indicador, estado.anio);
  const valores = estadosCargados.map((f) => obtenerValor(f.properties.cve_ent, estado.indicador, estado.anio)).filter(Number.isFinite);
  rangosCoropleta = calcularCortes(valores);
  if (capaCoropleta) capaCoropleta.setStyle((feature) => estiloEstado(feature, estado));
  actualizarLeyenda(estado, rango);
}

function actualizarLeyenda(estado, rango) {
  let control = document.getElementById('leyenda');
  if (!control) {
    control = document.createElement('section');
    control.id = 'leyenda';
    control.className = 'leyenda';
    control.setAttribute('aria-label', 'Leyenda del mapa');
    document.querySelector('.zona-mapa')?.append(control);
  }
  const unidad = filasIndicadores.find((f) => f.indicador === estado.indicador && f.anio === Number(estado.anio))?.unidad || '';
  const items = PALETA_COROPLETA.slice(0, rangosCoropleta.length + 1).map((color, indice) => {
    const maximo = indice < rangosCoropleta.length ? rangosCoropleta[indice] : rango?.max;
    const minimo = indice === 0 ? rango?.min : rangosCoropleta[indice - 1];
    const texto = rango
      ? `${indice === 0 ? formatearNumero(minimo) : `> ${formatearNumero(minimo)}`}–${formatearNumero(maximo)}`
      : 'Sin observaciones';
    return `<li><span class="leyenda-muestra" style="background:${color}"></span>${texto}</li>`;
  }).join('');
  control.innerHTML = `<h2>${escaparLeyenda(estado.indicador || 'Indicador')} · ${escaparLeyenda(estado.anio ?? '')}</h2>${unidad ? `<p>${escaparLeyenda(unidad)}</p>` : ''}<ul>${items}<li><span class="leyenda-muestra sin-dato"></span>Sin dato</li></ul>`;
}

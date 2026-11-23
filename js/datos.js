// Carga y consulta de datos del mapa. Este módulo no modifica el DOM.
const URL_ESTADOS = 'data/estados.geojson';
const URL_INDICADORES = 'data/indicadores.csv';
let estadosCargados = [];
let filasIndicadores = [];

function normalizarClave(clave) {
  const texto = String(clave ?? '').trim();
  if (/^\d{3,}$/.test(texto)) return texto.slice(0, 2);
  return /^\d{1,2}$/.test(texto) ? texto.padStart(2, '0') : texto;
}

// Parser CSV que respeta comas y comillas escapadas dentro de campos.
function analizarCSV(texto) {
  const filas = [];
  let fila = [], campo = '', entreComillas = false;
  for (let i = 0; i < texto.length; i++) {
    const caracter = texto[i];
    if (entreComillas && caracter === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
    else if (caracter === '"') entreComillas = !entreComillas;
    else if (!entreComillas && caracter === ',') { fila.push(campo); campo = ''; }
    else if (!entreComillas && (caracter === '\n' || caracter === '\r')) {
      if (caracter === '\r' && texto[i + 1] === '\n') i++;
      fila.push(campo); filas.push(fila); fila = []; campo = '';
    } else campo += caracter;
  }
  if (campo || fila.length) { fila.push(campo); filas.push(fila); }
  const contenido = filas.filter((r) => r.some((v) => v.trim()) && !r[0].trim().startsWith('#'));
  if (!contenido.length) return [];
  const encabezados = contenido.shift().map((v) => v.trim().replace(/^\uFEFF/, ''));
  const esperados = ['cve_ent', 'entidad', 'anio', 'indicador', 'valor', 'unidad'];
  if (esperados.some((campoEsperado, i) => encabezados[i] !== campoEsperado)) {
    throw new Error(`Encabezado inválido en ${URL_INDICADORES}; se espera: ${esperados.join(', ')}`);
  }
  return contenido.filter((r) => r.some((v) => v.trim())).map((r) => Object.fromEntries(
    encabezados.map((encabezado, i) => [encabezado, (r[i] ?? '').trim()])
  ));
}

async function cargarDatos() {
  let respuestaEstados, respuestaIndicadores;
  try {
    [respuestaEstados, respuestaIndicadores] = await Promise.all([
      fetch(URL_ESTADOS), fetch(URL_INDICADORES)
    ]);
  } catch (error) {
    throw new Error(`No se pudieron descargar los archivos de datos. Usa un servidor local. ${error.message}`);
  }
  if (!respuestaEstados.ok) throw new Error(`No se pudo cargar ${URL_ESTADOS} (HTTP ${respuestaEstados.status}).`);
  if (!respuestaIndicadores.ok) throw new Error(`No se pudo cargar ${URL_INDICADORES} (HTTP ${respuestaIndicadores.status}).`);
  const geojson = await respuestaEstados.json();
  if (geojson.type !== 'FeatureCollection' || !Array.isArray(geojson.features)) {
    throw new Error(`${URL_ESTADOS} no contiene un FeatureCollection GeoJSON válido.`);
  }
  estadosCargados = geojson.features.map((feature) => {
    const propiedades = feature.properties ?? {};
    const clave = normalizarClave(propiedades.cve_ent ?? propiedades.CVE_ENT ?? propiedades.CVEGEO);
    const nombre = propiedades.entidad ?? propiedades.nom_ent ?? propiedades.NOMGEO ?? propiedades.nombre;
    return { ...feature, properties: { ...propiedades, cve_ent: clave, entidad: nombre, indicadores: [] } };
  });
  filasIndicadores = analizarCSV(await respuestaIndicadores.text()).map((fila) => ({
    ...fila,
    cve_ent: normalizarClave(fila.cve_ent),
    anio: fila.anio === '' ? NaN : Number(fila.anio),
    valor: fila.valor === '' ? null : Number(fila.valor)
  }));
  for (const fila of filasIndicadores) {
    if (!/^\d{2}$/.test(fila.cve_ent) || !Number.isFinite(fila.anio) ||
        (fila.valor !== null && !Number.isFinite(fila.valor))) {
      throw new Error(`Fila inválida en ${URL_INDICADORES} para la clave ${fila.cve_ent || '(vacía)'}.`);
    }
    const estado = estadosCargados.find((f) => f.properties.cve_ent === fila.cve_ent);
    if (estado) estado.properties.indicadores.push(fila);
  }
  const sinDatos = estadosCargados.filter((f) => f.properties.indicadores.length === 0).map((f) => f.properties.entidad || f.properties.cve_ent);
  const clavesEstado = new Set(estadosCargados.map((f) => f.properties.cve_ent));
  const clavesCSV = [...new Set(filasIndicadores.map((f) => f.cve_ent))];
  const desconocidas = clavesCSV.filter((clave) => !clavesEstado.has(clave));
  const combinaciones = [...new Set(filasIndicadores.map((f) => `${f.indicador}\u0000${f.anio}`))];
  const faltantes = combinaciones.flatMap((combinacion) => {
    const [indicador, anio] = combinacion.split('\u0000');
    const presentes = new Set(filasIndicadores.filter((f) => f.indicador === indicador && String(f.anio) === anio).map((f) => f.cve_ent));
    return [...clavesEstado].filter((clave) => !presentes.has(clave)).map((clave) => ({ clave, indicador, anio }));
  });
  const registros = new Set();
  const duplicados = [];
  for (const fila of filasIndicadores) {
    const llave = `${fila.cve_ent}\u0000${fila.indicador}\u0000${fila.anio}`;
    if (registros.has(llave)) duplicados.push(llave.replaceAll('\u0000', '/'));
    registros.add(llave);
  }
  if (estadosCargados.length !== 32 || sinDatos.length || desconocidas.length || faltantes.length || duplicados.length) {
    console.warn('Revisión de unión GeoJSON/CSV:', {
      totalEntidades: estadosCargados.length,
      estadosSinDato: sinDatos,
      clavesCSVDesconocidas: desconocidas,
      filasFaltantesPorIndicadorYAño: faltantes,
      combinacionesDuplicadas: duplicados
    });
  }
  else console.info(`Unión GeoJSON/CSV completa: ${estadosCargados.length} estados.`);
  return estadosCargados;
}

function obtenerIndicadores() { return [...new Set(filasIndicadores.map((f) => f.indicador))]; }
function obtenerAnios(indicador) {
  return [...new Set(filasIndicadores.filter((f) => !indicador || f.indicador === indicador).map((f) => f.anio))].sort((a, b) => a - b);
}
function obtenerRegistro(cveEnt, indicador, anio) {
  const clave = normalizarClave(cveEnt);
  return filasIndicadores.find((f) => f.cve_ent === clave && f.indicador === indicador && f.anio === Number(anio)) ?? null;
}
function obtenerValor(cveEnt, indicador, anio) { return obtenerRegistro(cveEnt, indicador, anio)?.valor ?? null; }
function obtenerRango(indicador, anio) {
  const valores = filasIndicadores.filter((f) => f.indicador === indicador && f.anio === Number(anio) && f.valor !== null).map((f) => f.valor);
  return valores.length ? { min: Math.min(...valores), max: Math.max(...valores) } : null;
}
function obtenerDatosEstado(cveEnt) {
  const clave = normalizarClave(cveEnt);
  return filasIndicadores.filter((f) => f.cve_ent === clave).sort((a, b) => a.indicador.localeCompare(b.indicador) || a.anio - b.anio);
}

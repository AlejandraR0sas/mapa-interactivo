let mapa;
const estado = { indicador: null, anio: null, cveSeleccionada: null };

function mostrarError(mensaje) {
  const aviso = document.createElement('div');
  aviso.textContent = mensaje;
  aviso.style.cssText =
    'position:fixed;top:10px;left:50%;transform:translateX(-50%);' +
    'background:#b00020;color:#fff;padding:10px 16px;border-radius:6px;z-index:2000;';
  document.body.appendChild(aviso);
}

function alCambiarSeleccion() {
  actualizarCoropleta(estado);
  if (estado.cveSeleccionada) actualizarPanel(estado);
}

function alSeleccionarEstado(cve) {
  estado.cveSeleccionada = cve;
  mostrarPanel(estado);
}

async function iniciar() {
  try {
    mapa = crearMapa('mapa');

    const estados = await cargarDatos();
    mostrarPanel(estado);
    estado.indicador = obtenerIndicadores()[0];
    const anios = obtenerAnios(estado.indicador);
    estado.anio = anios[anios.length - 1];   // el año más reciente

    const capaEstados = crearCoropleta(mapa, estados, estado);

    activarInteraccion(capaEstados, estado, alSeleccionarEstado);

    await cargarPuntos(mapa);

    crearSelectores(estado, {
      alCambiar: alCambiarSeleccion,
      alAlternarPuntos: (visible) => visible ? mostrarPuntos(mapa) : ocultarPuntos(mapa)
    });

  } catch (error) {
    console.error(error);
    mostrarError('Error al cargar el mapa: ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', iniciar);

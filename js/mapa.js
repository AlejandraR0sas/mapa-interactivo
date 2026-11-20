function crearMapa(idContenedor) {

  const mapa = L.map(idContenedor, {
    center: [23.6, -102.5],
    zoom: 5,
    minZoom: 4,
    maxZoom: 12
  });

  const atribucionOSM = '&copy; OpenStreetMap contributors';

  // Capa 1: OpenStreetMap en gris (el filtro está en css/base.css)
  const gris = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: atribucionOSM,
    maxZoom: 19,
    className: 'base-gris'
  });

  // Capa 2: OpenStreetMap a color, con más detalle de calles
  const calles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: atribucionOSM,
    maxZoom: 19
  });

  gris.addTo(mapa);

  L.control.layers({
    'Gris (OpenStreetMap)': gris,
    'Calles (OpenStreetMap)': calles
  }).addTo(mapa);

  return mapa;
}
let capaPuntos = null;

// Evita que un texto de los datos se interprete como HTML dentro del popup
function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto || '';
  return div.innerHTML;
}

// Carga los puntos, los agrupa y los agrega al mapa
async function cargarPuntos(mapa) {
  const respuesta = await fetch('data/puntos.geojson');
  if (!respuesta.ok) {
    throw new Error('No se pudo cargar data/puntos.geojson');
  }
  const datos = await respuesta.json();

  // Nivel propio, por encima de los estados (400) y por debajo de los grupos (600)
  if (!mapa.getPane('puntos')) {
    mapa.createPane('puntos');
    mapa.getPane('puntos').style.zIndex = 450;
  }

  capaPuntos = L.markerClusterGroup({
    chunkedLoading: true,        // carga por tandas
    showCoverageOnHover: false,  // sin el polígono que aparece al pasar sobre un grupo
    maxClusterRadius: 50         // qué tan cerca deben estar para agruparse (píxeles)
  });

  const puntos = L.geoJSON(datos, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
      pane: 'puntos',
      radius: 6,
      color: '#ffffff',
      weight: 1,
      fillColor: '#6a3d9a',
      fillOpacity: 0.9
    }),
    onEachFeature: (feature, layer) => {
      const p = feature.properties;
      layer.bindPopup(
        '<strong>' + escaparHTML(p.nombre) + '</strong><br>' +
        escaparHTML(p.tipo) + '<br>' +
        escaparHTML(p.municipio) + ', ' + escaparHTML(p.entidad)
      );
    }
  });

  capaPuntos.addLayer(puntos);
  capaPuntos.addTo(mapa);
  return capaPuntos;
}

// Para el interruptor que hace Antulio en selectores.js
function mostrarPuntos(mapa) {
  if (capaPuntos && !mapa.hasLayer(capaPuntos)) capaPuntos.addTo(mapa);
}

function ocultarPuntos(mapa) {
  if (capaPuntos && mapa.hasLayer(capaPuntos)) mapa.removeLayer(capaPuntos);
}

function alternarPuntos(mapa) {
  if (!capaPuntos) return;
  if (mapa.hasLayer(capaPuntos)) ocultarPuntos(mapa);
  else mostrarPuntos(mapa);
}
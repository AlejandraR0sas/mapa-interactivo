function activarInteraccion(capaEstados, estado, alSeleccionar) {
  capaEstados.eachLayer((capa) => {
    const feature = capa.feature;
    const propiedades = feature.properties;
    const clave = propiedades.cve_ent;
    const nombre = propiedades.entidad || `Entidad ${clave}`;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-entidad';
    capa.bindTooltip(tooltip, { sticky: true, direction: 'auto' });

    const actualizarTooltip = () => {
      const valor = obtenerValor(clave, estado.indicador, estado.anio);
      const unidad = obtenerRegistro(clave, estado.indicador, estado.anio)?.unidad || '';
      tooltip.textContent = `${nombre}: ${valor === null ? 'Sin dato' : `${formatearNumero(valor)} ${unidad}`}${estado.anio ? ` (${estado.anio})` : ''}`;
    };

    capa.on({
      mouseover: (evento) => {
        actualizarTooltip();
        if (clave !== estado.cveSeleccionada) evento.target.setStyle({ color: '#152238', weight: 2, fillOpacity: 0.95 });
        evento.target.openTooltip();
      },
      mouseout: (evento) => {
        capaEstados.resetStyle(evento.target);
        evento.target.closeTooltip();
      },
      click: () => {
        actualizarTooltip();
        capa.openTooltip();
        estado.cveSeleccionada = clave;
        actualizarCoropleta(estado);
        if (typeof alSeleccionar === 'function') alSeleccionar(clave);
      }
    });
  });
}

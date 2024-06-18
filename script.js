// Inicializar el mapa
var map = L.map('map').setView([-51.6226, -69.2181], 8);

// Capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Definir la URL del servicio WFS y el nombre de la capa deseada
var wfsUrl = 'http://situ.santacruz.gob.ar/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ide_santacruz:div_localidad&outputFormat=application/json';

// Estilo para las entidades cargadas desde el servicio WFS
var myStyle = {
  color: "#3388ff",
  weight: 2,
  opacity: 1,
  fillOpacity: 0.3,
  fillColor: "#3388ff"
};

// Cargar datos desde el servicio WFS y añadirlos al mapa con el estilo definido
fetch(wfsUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    L.geoJSON(data, {
      style: myStyle,
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<h3>' + feature.properties.nombre + '</h3>');
      }
    }).addTo(map);
  });

// Configura el mapa
var map = L.map('map').setView([-51.6266, -69.2165], 10); // Coordenadas y zoom inicial

// Añade una capa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// URL del servicio WFS y nombre de la capa deseada
var wfsUrl = 'http://situ.santacruz.gob.ar/geoserver/estad_censo/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=estad_censo:desocupacion_por_radio_censal_v3';
fetch(wfsUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        L.geoJSON(data, {
            style: function(feature) {
                return {
                    fillColor: getColor(feature.properties.porcentaje), // Color de relleno según el porcentaje
                    weight: 1, // Grosor del borde
                    color: '#ffffff', // Color del borde (blanco)
                    fillOpacity: 0.7 // Opacidad del relleno
                };
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup('<h3>Radio Censal</h3><p>Desocupación: ' + feature.properties.porcentaje + '%</p>');
            }
        }).addTo(map);
    });

// Función para determinar el color de relleno basado en el porcentaje
function getColor(porcentaje) {
    return porcentaje > 10 ? '#d73027' :
           porcentaje > 5  ? '#fc8d59' :
           porcentaje > 2  ? '#fee08b' :
                             '#ffffbf';
}

// var myMap = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 5
// });

// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets-basic",
//     accessToken: API_KEY
// }).addTo(myMap);

var last_week_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(last_week_url, function (response) {

    console.log(response.features);

    // The following function is only returning the default. 
    // Unsure if that's because the magnitudes in the features are all too small
    // or if it isn't working properly. Find a way to scale the color classes to
    // the existing magnitude range in the data...
    // Possibly replace witha chloropleth layer?

    var magVals = response.features.map(f => f.properties.mag)
    // var magMin = Math.min(magVals)
    var magMin = Math.min.apply(Math, magVals)
    var magMax = Math.max.apply(Math, magVals)
    console.log(magVals)
    console.log(magMax)
    function magColor(mag) {
            return mag > (0.667 * magMax) ? "red" :
            mag > (0.333 * magMax) ? "orange" :
                "yellow"
        }


// Test geoJSON version
    var earthquakes = L.geoJSON(response.features, {
    // onEachFeature: function (feature, layer) {

    style: function (feature) {
        // Need to write a function for specifying color
        return {
            color: magColor(feature.properties.mag),
        }
    },
    pointToLayer: function (feature, latlng) {
        return new L.CircleMarker(latlng, {
            radius: feature.properties.mag * 4,
            fillOpacity: 0.5
        });
    },
    onEachFeature: function (feature, layer) {
        var datePart = new Date(feature.properties.time)
        layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3>
            <div>${datePart}</div>`)
    }
})


var legend = L.control({position: "bottomright"});
legend.onAdd = function() {
    var legendInfo = `<h1>Earthquake Magnitude</h1>
    <div>
      <div class="min">${magMin}</div>
      <div class="max">${magMax}</div>
    </div>
  `;
}





var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2psYXBhbiIsImEiOiJjangxMzFyYWIwNGdzNDhsMzQ4Ymc5ZDVrIn0.oooU0Tjw_Wdamm6j95Ofwg",
    { attribution: "Leaflet" });


var baseMap = {
    "Street Map": streetmap
};

var overlayMaps = {
    Earthquakes: earthquakes
};

var myMap = L.map("map", {
    center: [
        39.8283, -98.5795
    ],
    zoom: 4,
    layers: [streetmap, earthquakes]
})
});

//     var quake_layer = L.geoJSON().addTo(map);
//     quake_layer.addData(response); 
// }
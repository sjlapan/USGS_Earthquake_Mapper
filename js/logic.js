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
    function magColor(mag) {
        switch (mag) {
            case (mag > 6.66):
            return "red";
            case (mag > 3.33):
                return "orange";
            default:
                return "yellow";
        }
    }
// Test choropleth version
    var earthquakes = L.choropleth(response.features, {
        valueProperty: properties.mag
    })


// Test geoJSON version
    var earthquakes = L.geoJSON(response.features, {
        // onEachFeature: function (feature, layer) {
        
        style: function(feature) {
                // Need to write a function for specifying color
                return {color: magColor(feature.properties.mag),
                }
            },
            pointToLayer: function(feature, latlng){
                return new L.CircleMarker(latlng, {
                    radius: feature.properties.mag * 4,
                    fillOpacity: 0.5 
                });
            },
            // var datePart = new Date(feature.properties.time)
            // layer.bindPopup()
        // }

});

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

})
//     var quake_layer = L.geoJSON().addTo(map);
//     quake_layer.addData(response); 
// }
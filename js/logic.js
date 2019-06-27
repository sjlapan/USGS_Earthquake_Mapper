var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
var last_week_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(last_week_url, function(response)=>{
   
    console.log(response.features);

    var earthquakes = L.geoJSON(response.features,
        onEachFeature : function(feature, layer){

        })
    };
//     var style = {

//     }
//     var quake_layer = L.geoJSON().addTo(map);
//     quake_layer.addData(response); 
// }
// )
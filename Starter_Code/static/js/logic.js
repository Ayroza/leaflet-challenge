let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Perform a GET request to the query URL/
d3.json(url).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
    console.log(data.features);
});

function createMap(earthquakeMap) {
        // Create the base layers.
        let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      
        let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
      
        // Create a baseMaps object.
        let baseMaps = {
          "Map": street,
          "Topographic Map": topo
        };
      
        // Create an overlay object to hold our overlay.
        let overlayMaps = {
          Earthquakes: earthquakeMap
        };
      
        // Create our map, giving it the streetmap and earthquakes layers to display on load.
        let myMap = L.map("map", {
          center: [
            37.09, -95.71
          ],
          zoom: 5,
          layers: [street, earthquakeMap]
        });
      
        // Create a layer control.
        // Pass it our baseMaps and overlayMaps.
        // Add the layer control to the map.
        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
        }).addTo(myMap);    

  };
  



  function createFeatures(earthquakeData) {
  console.log(earthquakeData)
    
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><br><h3>Magnitude: ${feature.properties.mag}</h3><br><hr><br><h3>Depth: ${feature.geometry.coordinates[2]}</h3><br><p>${new Date(feature.properties.time)}</p>`);
    }
        function geojsonMarkerOptions(feature) {
         return  {
            radius: feature.properties.mag*6,
            fillColor: colour(feature.geometry.coordinates[2]),
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.4
    
    }
     
    }

    let earthquake = L.geoJSON(earthquakeData, {
        pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng);
        },
        onEachFeature: onEachFeature,
        style: geojsonMarkerOptions
        
    
     
});
createMap(earthquake); 
  }


  function getRadius(magnitude) {
    return (magnitude + 1) * 5; 
}


function colour(depth) {

    if (depth > 90) {
        return "#FF0000";
    }
    else if (depth > 70) {
        return "#FF4500";
    }
    else if (depth > 50) {
        return "#FF8C00";
    }
    else if (depth > 30) {
        return "#FFD700";
    }    
    else if (depth > 10) {
        return "#7FFF00";
    }
    else {return "#006400"; 
    }
}

function getRadius(magnitude) {
    return (magnitude + 1) * 5;
    
}


function colour(depth) {

    if (depth < 10) {
        return "green"
    }
    else if (depth < 30) {
        return "blue"
    }
    else if (depth < 50) {
        return "yellow"
    }
    else if (depth < 70) {
        return "orange"
    }    
    else if (depth < 90) {
        return "pink"
    }
    else {return "red";
    }
}

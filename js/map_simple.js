var map;

require(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer","dojo/domReady!", "dojo/on"], 
  function(Map, ArcGISDynamicMapServiceLayer, on) {
    // Create your map, add layers, and perform any other setup routines necessary to start your application
    
    map = new Map("map", {
      basemap: "topo",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
      center: [-122.19, 37.94], // longitude, latitude
      zoom: 6,
    });

    // var operationalLayer = new ArcGISDynamicMapServiceLayer("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer" ,{"opacity":0.5});
    // map.addLayer(operationalLayer);

    var dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer"); 
    dynamicMapServiceLayer.setVisibleLayers([0,1]); 
    map.addLayer(dynamicMapServiceLayer); 
    // If you want to add more than one layer to the map in one go, you can use Map.addLayers(), which accepts an array of layer objects.

    function addPoint(evt) { 
        alert(evt.mapPoint.x, evt.mapPoint.y); 
    } 
  
    var mapClickEvent = map.on("click", addPoint); 
    // mapClickEvent.remove();





  }






);




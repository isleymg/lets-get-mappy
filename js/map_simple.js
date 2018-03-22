var map, defPopSymbol, onePopSymbol, twoPopSymbol, threePopSymbol, 
  fourPopSymbol, fivePopSymbol;

require(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "dojo/on", 
        "esri/tasks/query", "esri/tasks/QueryTask", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "dojo/_base/Color", "dojo/domReady!"], 
  function(Map, ArcGISDynamicMapServiceLayer, on, Query, QueryTask, SimpleFillSymbol, InfoTemplate, Color) {
   
    // Create your map, add layers, and perform any other setup routines necessary to start your application
    map = new Map("map", {
      basemap: "topo",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
      center: [-122.19, 37.94], // longitude, latitude
      zoom: 6,
    });


    // For more layers, use Map.addLayers(), which accepts an array of layer objects.
    var dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer"); 
    dynamicMapServiceLayer.setVisibleLayers([0,1]); 
    map.addLayer(dynamicMapServiceLayer); 


    /*
    Graphics
    -------
    A graphic is composed of four items: Geometry, Symbol, Attributes, and an InfoTemplate
      - Geometry objects can be Point, Multipoint, Polyline, Polygon, or Exten
    */

    // defPopSymbol = new SimpleFillSymbol().setColor(new Color([255,255,255, 0])); //transparent 
    onePopSymbol = new SimpleFillSymbol().setColor(new Color([255,255,128, .55])); //yellow 
    twoPopSymbol = new SimpleFillSymbol().setColor(new Color([250,209,85, .55]));  
    threePopSymbol = new SimpleFillSymbol().setColor(new Color([242,167,46, .55])); //orange 
    fourPopSymbol = new SimpleFillSymbol().setColor(new Color([173,83,19, .55]));  
    fivePopSymbol = new SimpleFillSymbol().setColor(new Color([107,0,0, .55])); //dark maroon 
    
    var queryTask = new QueryTask("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/2");
    var query = new Query();
    query.where = "STATE_NAME = 'Colorado'"; 
    query.returnGeometry = true; 
    query.outFields = ["NAME","POP90_SQMI","HOUSEHOLDS","MALES","FEMALES","WHITE","BLACK","HISPANIC"];

    queryTask.execute(query, addPolysToMap);
    resultTemplate = InfoTemplate("County Attributes", "${*}"); 



    // Obtain the population density information from each graphic and save to var pop
    function addPolysToMap(featureSet) {
      var features = featureSet.features;
      var feature;
      for (var i=0, il=features.length; i<il; i++) {
        feature = features[i]; 
        attributes = feature.attributes; 
        pop = attributes.POP90_SQMI; 
                        
        if (pop < 10) { 
          map.graphics.add(features[i].setSymbol(onePopSymbol)); 
        } else if (pop >= 10 && pop < 95) { 
            map.graphics.add(features[i].setSymbol(twoPopSymbol)); 
        } else if (pop >= 95 && pop < 365) { 
            map.graphics.add(features[i].setSymbol(threePopSymbol)); 
        } else if (pop >= 365 && pop < 1100) { 
            map.graphics.add(features[i].setSymbol(fourPopSymbol)); 
        } else { 
            map.graphics.add(features[i].setSymbol(fivePopSymbol)); 
        }
      }
      map.graphics.setInfoTemplate(resultTemplate); 
    }




});




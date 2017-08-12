var MapWrapper = require('./mapWrapper.js')
var AutoCompleteDirectionsHandler = require('./autoCompleteDirectionsHandler.js')
var BikeOrHike = require('./bikeOrHike.js')
var routeSelected = function(evt) {
  console.log("routeSelected");
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('main-map'), {
    mapTypeControl: false,
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });

  new AutoCompleteDirectionsHandler(map);
}

var entry = function(){
  initMap();
  // console.log('entry.js is working')
  // var mapDiv = document.querySelector("#main-map");
  // var center = {lat: 55.9470, lng: -3.2020}
  // var mainMap = new MapWrapper(mapDiv, center, 10);
  // mainMap.addMarker(center);
 

  var formSubmission = document.querySelector("#submit");
  formSubmission.addEventListener('click', routeSelected);



  // var travelMode = new BikeOrHike()
  // var auto = new AutoCompleteDirectionsHandler(mainMap)
}

window.addEventListener('load', entry);

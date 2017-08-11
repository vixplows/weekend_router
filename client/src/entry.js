var MapWrapper = require('./mapWrapper.js')
var AutoComplete = require('./autoComplete.js')
var routeSelected = function(evt) {
  console.log("routeSelected");
}

var entry = function(){
  console.log('entry')
  var mapDiv = document.querySelector("#main-map");
  var center = {lat: 55.9470, lng: -3.2020}
  var mainMap = new MapWrapper(mapDiv, center, 10);
  mainMap.addMarker(center);

  var formSubmission = document.querySelector("#submit");
  formSubmission.addEventListener('click', routeSelected);

  var auto = new AutoComplete(mainMap)
}

window.addEventListener('load', entry);

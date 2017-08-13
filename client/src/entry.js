var AutoCompleteDirectionsHandler = require('./autoCompleteDirectionsHandler.js')
var routeSelected = function(evt) {
  console.log("routeSelected");
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('main-map'), {
    mapTypeControl: false,
    center: {lat: 55.9470, lng: -3.2020},
    zoom: 13
  });

  new AutoCompleteDirectionsHandler(map);
}

function saveRouteIDs(startID, endID) {
  this.startID = startID;
  this.endID = endID;
  console.log(startID);
  console.log(endID);
}

var entry = function(){
  initMap();

  var formSubmission = document.querySelector("#submit");
  formSubmission.addEventListener('click', routeSelected);
}

window.addEventListener('load', entry);

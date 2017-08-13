var AutoCompleteDirectionsHandler = require('./autoCompleteDirectionsHandler.js')

var routeSelected = function(evt) {
  var startInput = document.querySelector("#start-input")
  var endInput = document.querySelector("#end-input")

  console.log(startInput.ID);
  console.log(endInput.ID);
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('main-map'), {
    mapTypeControl: false,
    center: {lat: 55.9470, lng: -3.2020},
    zoom: 13
  });

  new AutoCompleteDirectionsHandler(map);
}

var entry = function(){
  initMap();

  var saveRoute = document.querySelector("#save-route");
  saveRoute.addEventListener('click', routeSelected);
}

window.addEventListener('load', entry);

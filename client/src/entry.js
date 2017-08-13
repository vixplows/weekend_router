var AutoCompleteDirectionsHandler = require('./autoCompleteDirectionsHandler.js')

var routeSelected = function(evt) {
  var startInput = document.querySelector("#start-input")
  var endInput = document.querySelector("#end-input")

  var routeName = prompt("Please enter your route name", "Route Name?");
  if (routeName != null) {
      console.log(routeName)
  }


  var url = "/routes"

  var routeObject = {
    "name": routeName,
    "start": startInput.ID,
    "end": endInput.ID,
    "complete": false
  }

  var request = new XMLHttpRequest();
  request.addEventListener('load', function(){
    // populateSavedList();
  })
  request.open("POST", url)
  request.setRequestHeader('Content-Type', 'application/json')
  request.send(JSON.stringify(routeObject))

  console.log(startInput.ID);
  console.log(endInput.ID);
  console.log(routeObject);
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

var AutoCompleteDirectionsHandler = require('./autoCompleteDirectionsHandler.js');
var PopulateRoutesList = require('./PopulateRoutesList');
// var PubFinder = require('./PubFinder');

///

var displayPubs = function() {

  // var map = new google.maps.Map(document.getElementById('main-map'); 
  var map;
  var infowindow;

// function initMap() {
  console.log('I have arrived')

    var codeclan = {lat: 55.9470 , lng: -3.2020};

    map = new google.maps.Map(document.getElementById('main-map'), {
      center: codeclan,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: codeclan,
      radius: 500,
      type: ['bar']
    }, callback);
  // }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
}
///

var routeSelected = function(evt, callback) {
  var startInput = document.querySelector("#start-input");
  var endInput = document.querySelector("#end-input");
  var modeSelector = document.querySelector("#mode-selector");

  console.log("before: " + modeSelector.mode)
  if (!modeSelector.mode) {
    modeSelector.mode = 'WALKING';
  }
  console.log("after: " + modeSelector.mode)

  var routeName;
  var proceed = false;
  while(!proceed) {
    routeName = prompt("Please enter your route:");
    if (typeof(routeName) == "string") {
      routeName = routeName.trim();  
      if (routeName=="") {
        proceed = false;
        alert('Please enter a route name to proceed');
      } else {
        proceed=true;
      };
    };
    if (routeName===null) {
      proceed = false;
      alert('Route not saved');
      return;
    };
  };

  var url = "/routes";

  var routeObject = {
    "name": routeName,
    "start": startInput.ID,
    "end": endInput.ID,
    "mode": modeSelector.mode,
    "status": 1
  };

  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', callback);
  request.send(JSON.stringify(routeObject));
};

var makeRequest = function (callback) {
  var url = "/routes";
  var routesRequest = new XMLHttpRequest();

  routesRequest.open("GET", url);
  routesRequest.setRequestHeader('Content-Type', 'application/json');
  routesRequest.addEventListener('load', callback);
  routesRequest.send();
};

var requestComplete = function () {
  if(this.status !== 200) return;

  var routesString = this.responseText;
  var routes = JSON.parse(routesString);
  new PopulateRoutesList(routes);
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('main-map'), {
    mapTypeControl: false,
    center: {lat: 55.9470, lng: -3.2020},
    zoom: 13
  });
  new AutoCompleteDirectionsHandler(map);
};

var entry = function(){
  initMap();

  makeRequest(requestComplete);

  var saveRoute = document.querySelector("#save-route");
  saveRoute.addEventListener('click', function() {
    routeSelected(this.responseText, requestComplete);
  });

//not sure if should be response text
  var showPubs = document.querySelector("#show-pubs");
  showPubs.addEventListener('click', function() {
    displayPubs();
  });
};

window.addEventListener('load', entry);

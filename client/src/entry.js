var AutoCompleteDirectionsHandler = require('./autoCompleteDirectionsHandler.js');
var makeRequest = require('./request.js')
var PopulateRoutesList = require('./populateRoutesList.js');

var requestComplete = function () {
  if(this.status !== 200) return;
  var routesString = this.responseText;
  var routes = JSON.parse(routesString);
  new PopulateRoutesList(routes);
};

var routeSelected = function(evt, callback) {
  var startInput = document.querySelector("#start-input");
  var endInput = document.querySelector("#end-input");
  var modeSelector = document.querySelector("#mode-selector");

  if (!modeSelector.mode) {
    modeSelector.mode = 'WALKING';
  }

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

  var options = {};
  options.type = "entry";
  makeRequest(options, requestComplete);
  var saveRoute = document.querySelector("#save-route");
  saveRoute.addEventListener('click', function() {
    routeSelected(this.responseText, requestComplete);
  });
};

window.addEventListener('load', entry);

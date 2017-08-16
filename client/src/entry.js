var AutoCompleteDirectionsHandler = require('./autoCompleteDirectionsHandler.js');
var makeRequest = require('./request.js')
var PopulateRoutesList = require('./populateRoutesList.js');

var requestComplete = function () {
  if(this.status !== 200) return;
  var routesString = this.responseText;
  var routes = JSON.parse(routesString);
  new PopulateRoutesList(routes);
};

var displayPubs = function() {

  var map;
  var infowindow;

  var boxpolys = null;
  var startInput = document.querySelector("#start-input");
  var endInput = document.querySelector("#end-input");
  var modeSelector = document.querySelector("#mode-selector");

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById('main-map'), {
    zoom: 13
});
  
//google library added to render boxes to show points along our route
var routeBoxer = new RouteBoxer();

//Had to redraw the route again, as lost on binding new data to map, with same start and end points
directionsService.route({
  origin: {'placeId': startInput.ID},
  destination: {'placeId': endInput.ID},
  travelMode: 'WALKING'}, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var path = response.routes[0].overview_path;
      
      var distance = 0.04;//km
      var boxes = routeBoxer.box(path, distance);

      //redraw on each request and remove any prior boxes
      clearBoxes();
      // drawBoxes(boxes);
      service = new google.maps.places.PlacesService(map);

      //foreach box on the 10th box call google API, can only call a max on 20 times...
      for (var i = 0; i < boxes.length; i++) {
        var bounds = boxes[i];

        var request = {
         bounds: boxes[i],
         type: ['bar']
        }; 
               
        // if((i % 1) == 0){
        var last = (i === (boxes.length - 1));
        fetchResult(service, request, i * 225, last);
      //  }
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    };
  });

function fetchResult(service, request, delay, last) {
  setTimeout(function() {
    service.radarSearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0, result; result = results[i]; i++) {
          var marker = createMarker(result);
        };
      };

      if (status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
        console.log("OVER LIMIT");
      }else if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        console.log("ZERO");
      }

      if(last) {
        console.log("last item");
      }
    });  
  }, delay);
}

  directionsDisplay.setMap(map);

  //taken from examples where routeboxer was used.
  function drawBoxes(boxes) {
    boxpolys = new Array(boxes.length);
    for (var i = 0; i < boxes.length; i++) {
      boxpolys[i] = new google.maps.Rectangle({
        bounds: boxes[i],
        fillOpacity: 0,
        strokeOpacity: 1.0,
        strokeColor: '#000000',
        strokeWeight: 1,
        map: map
      });
    };
  };

  // Clear boxes currently on the map
  function clearBoxes() {
    if (boxpolys != null) {
      for (var i = 0; i < boxpolys.length; i++) {
        boxpolys[i].setMap(null);
      };
    };
    boxpolys = null;
  };

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      };
    };
  };

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: '/images/bar.png'
    });

    google.maps.event.addListener(marker, 'click', function() {

      detailsService = new google.maps.places.PlacesService(map);

      var request = {
        placeId: place.place_id
      }

      detailsService.getDetails(request, function(placeDetails, status) {
        var infoWindow = new google.maps.InfoWindow({
          content: placeDetails.name
        })

        infoWindow.open(map, marker);
      });
    });
  };
};

var routeSelected = function(evt, callback) {
  var startInput = document.querySelector("#start-input");
  var endInput = document.querySelector("#end-input");
  var modeSelector = document.querySelector("#mode-selector");

  if (!modeSelector.mode) {
    modeSelector.mode = 'WALKING';
  };

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

  //not sure if should be response text
  var showPubs = document.querySelector("#show-pubs");
  showPubs.addEventListener('click', function() {
    displayPubs();
  });
};

window.addEventListener('load', entry);

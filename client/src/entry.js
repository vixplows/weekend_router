var MapWrapper = require('./mapWrapper.js')
// var GoogleMapsLoader = require('google-maps'); 
 
// GoogleMapsLoader.load(function(google) {
//     new google.maps.Map(el, options);
// });

var entry = function(){
  console.log('entry')
  var mapDiv = document.querySelector("#main-map");
  // GoogleMapsLoader();
  navigator.geolocation.getCurrentPosition(function(position){
    var center = {lat: position.coords.latitude, lng: position.coords.longitude};
    var mainMap = new MapWrapper(mapDiv, center, 10);
  });
}






window.addEventListener('load', entry);
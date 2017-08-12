var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}


MapWrapper.prototype.addMarker = function(coords) {
  var marker = new google.maps.Marker({
    position: coords, 
    map: this.googleMap,
    animation: google.maps.Animation.DROP
  });
  return marker;
}

// MapWrapper.prototype.geoLocate = function() {
//   navigator.geoLocation.getCurrentPosition(function(position){
//     var center = {lat: position.coords.latitude, lng: position.coords.longitude};
//     this.googleMap.setCenter(center);
//     this.addMarker(center);
//     console.log(this);
//   }.bind(this));
// }

module.exports = MapWrapper
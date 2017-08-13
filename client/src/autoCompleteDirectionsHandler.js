var originInput;
var destinationInput

var AutoCompleteDirectionsHandler = function(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'WALKING';
  originInput = document.getElementById('start-input');
  destinationInput = document.getElementById('end-input');
  var modeSelector = document.getElementById('mode-selector');

  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(map);

  var originAutocomplete = new google.maps.places.Autocomplete(
    originInput, {placeIdOnly: true});
  var destinationAutocomplete = new google.maps.places.Autocomplete(
    destinationInput, {placeIdOnly: true});

  this.setupClickListener('changemode-walking', 'WALKING');
  this.setupClickListener('changemode-bicycling', 'BICYCLING');


  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
}

AutoCompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
  var radioButton = document.getElementById(id);
  var me = this;
  radioButton.addEventListener('click', function() {
    me.travelMode = mode;
    me.route();
  });
};

AutoCompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
  var me = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.place_id) {
      window.alert("Please select an option from the dropdown list.");
      return;
    }
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
    } else {
      me.destinationPlaceId = place.place_id;
    }
    // console.log(me.originPlaceId)
    // console.log(me.destinationPlaceId)
    me.route();
    originInput.ID = me.originPlaceId;
    destinationInput.ID = me.destinationPlaceId;
    // saveRouteIDs(me.originPlaceId, me.destinationPlaceId);
    console.log(originInput.ID)
    console.log(destinationInput.ID)
  });

};

AutoCompleteDirectionsHandler.prototype.route = function() {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  this.directionsService.route({
    origin: {'placeId': this.originPlaceId},
    destination: {'placeId': this.destinationPlaceId},
    travelMode: this.travelMode
  }, function(response, status) {
    if (status === 'OK') {
      me.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

}


module.exports = AutoCompleteDirectionsHandler;

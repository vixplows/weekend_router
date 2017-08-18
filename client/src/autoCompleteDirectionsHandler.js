var originInput;
var destinationInput;
var modeSelector;

var AutoCompleteDirectionsHandler = function(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'WALKING';
  originInput = document.getElementById('start-input');
  destinationInput = document.getElementById('end-input');
  modeSelector = document.getElementById('mode-selector');

  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(map);
  var directionsPanel = document.getElementById('directions');
  directionsPanel.innerHTML = "";
  this.directionsDisplay.setPanel(directionsPanel);

  var originAutocomplete = new google.maps.places.Autocomplete(
    originInput, {placeIdOnly: true});
  var destinationAutocomplete = new google.maps.places.Autocomplete(
    destinationInput, {placeIdOnly: true});

  this.setupClickListener('changemode-walking', 'WALKING');
  this.setupClickListener('changemode-bicycling', 'BICYCLING');

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
};

AutoCompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
  var radioButton = document.getElementById(id);
  var me = this;
  radioButton.addEventListener('click', function() {
    me.travelMode = mode;
    me.route();
    modeSelector.mode = mode;
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
    };
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
    } else {
      me.destinationPlaceId = place.place_id;
    };
    me.route();
    originInput.ID = me.originPlaceId;
    destinationInput.ID = me.destinationPlaceId;
  });
};

AutoCompleteDirectionsHandler.prototype.route = function() {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  };
  var me = this;

  if (this.travelMode === 'WALKING') {
    document.getElementById('changemode-walking').checked = true;
  } else {
    document.getElementById('changemode-bicycling').checked = true;
  };
  this.map = new google.maps.Map(document.getElementById('main-map'), {
      zoom: 13
  });
  this.directionsDisplay.setMap(this.map);
  this.directionsService.route({
    origin: {'placeId': this.originPlaceId},
    destination: {'placeId': this.destinationPlaceId},
    travelMode: this.travelMode
  }, function(response, status) {
    if (status === 'OK') {
      me.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    };
  });
  if (me.reDraw = true) {
    originInput.ID = me.originPlaceId;
    destinationInput.ID = me.destinationPlaceId;
  };
};

module.exports = AutoCompleteDirectionsHandler;

var AutoComplete = function(map) {
  var startInput = document.getElementById('start-input');
  var endInput = document.getElementById('end-input');
  //
  //takes route html elements + add html elements

  var autocompleteStart = new google.maps.places.Autocomplete(startInput);
  var autocompleteEnd = new google.maps.places.Autocomplete(endInput);
  //fills input-fields

  // var infowindow = new google.maps.InfoWindow();
  // var infowindowContent = document.getElementById('infowindow-content');
  // infowindow.setContent(infowindowContent);
  //creates info ontop of markers

  // var marker = new google.maps.Marker({
  //   map: map,
  //   anchorPoint: new google.maps.Point(0, -29)
  // });
  //drops mark on the "end" location

  autocompleteStart.addListener('place_changed', function() {
    // infowindow.close();
    // marker.setVisible(false);

    var place = autocompleteStart.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // // If the place has a geometry, then present it on a map.
    // if (place.geometry.viewport) {
    //   map.fitBounds(place.geometry.viewport);
    // } else {
    //   map.setCenter(place.geometry.location);
    //   ////need to change this in "autocompleteEnd" function
    //   map.setZoom(17);  // Why 17? Because it looks good.
    // }
    // marker.setPosition(place.geometry.location);
    // marker.setVisible(true);////remove for "autocompleteStart"

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
    console.log("I am startInput: " + startInput.value)
    console.log("I am endInput: " + endInput.value)
    console.log("I am autoStart: ", autocompleteStart)
    console.log("I am autoEnd:  ", autocompleteEnd)

    // infowindowContent.children['place-icon'].src = place.icon;
    // infowindowContent.children['place-name'].textContent = place.name;
    // infowindowContent.children['place-address'].textContent = address;
    // infowindow.open(map, marker);
  });

  autocompleteEnd.addListener('place_changed', function() {
    // infowindow.close();
    // marker.setVisible(false);

    var place = autocompleteEnd.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // // If the place has a geometry, then present it on a map.
    // if (place.geometry.viewport) {
    //   map.fitBounds(place.geometry.viewport);
    // } else {
    //   map.setCenter(place.geometry.location);
    //   ////need to change this in "autocompleteEnd" function
    //   map.setZoom(17);  // Why 17? Because it looks good.
    // }
    // marker.setPosition(place.geometry.location);
    // marker.setVisible(true);////remove for "autocompleteStart"

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
    console.log("I am startInput: " + startInput.value)
    console.log("I am endInput: " + endInput.value)
    console.log("I am autoStart: ", autocompleteStart)
    console.log("I am autoEnd:  ", autocompleteEnd)

    // infowindowContent.children['place-icon'].src = place.icon;
    // infowindowContent.children['place-name'].textContent = place.name;
    // infowindowContent.children['place-address'].textContent = address;
    // infowindow.open(map, marker);
  });

}


module.exports = AutoComplete;

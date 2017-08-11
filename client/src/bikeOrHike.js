var BikeOrHike = function() {

  var types = document.querySelector('.radio-killed-the');//Tv star

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function(){
      console.log(types)
    });
  }////needed for bike and hike feature

  setupClickListener('changetype-hike', ['hike']);
  setupClickListener('changetype-bike', ['bike']);
}

module.exports = BikeOrHike;

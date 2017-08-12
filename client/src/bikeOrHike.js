var BikeOrHike = function() {

  var types = document.querySelector('#radio-button');//Tv star

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {

    var radioButton = document.querySelector(id);
    radioButton.addEventListener('click', function(){
      
    });
  }////needed for bike and hike feature

  setupClickListener('#hike', ['hike']);
  setupClickListener('#bike', ['bike']);
  console.log(this)
}

module.exports = BikeOrHike;

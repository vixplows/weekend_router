var AutoCompleteDirectionsHandler = require('./autoCompleteDirectionsHandler.js');
var makeRequest = require('./request.js');

var PopulateRoutesList = function(routes, requestFunctions){
  this.render(routes);
};

var requestComplete = function () {
  if(this.status !== 200) return;
  var routesString = this.responseText;
  var routes = JSON.parse(routesString);
  new PopulateRoutesList(routes);
};

// function myFunction() {
//     var person = prompt("Add note");
//     if (person != null) {
//         document.getElementById("demo").innerHTML =
//         person;
//     }
// }

PopulateRoutesList.prototype.render = function (routes) {
  var start = document.querySelector('#routes-to-do');
  start.innerHTML = "";
  var tableTag = document.createElement('table');
  tableTag.classList.add('tableTag');
  var trTag = document.createElement('tr');
  var nameTag = document.createElement('th');
  nameTag.classList.add('th-name');
  var doneTag = document.createElement('th');
  var notesTag = document.createElement('th');
  var deleteTag = document.createElement('th');

  trTag.classList.add('saved-list');

  nameTag.innerText = "Route"
  doneTag.innerText = "Done?"
  notesTag.innerText = "Notes"
  deleteTag.innerText = "Remove"

  trTag.appendChild(nameTag);
  trTag.appendChild(doneTag);
  trTag.appendChild(deleteTag);
  trTag.appendChild(notesTag);
  tableTag.appendChild(trTag);
  start.appendChild(tableTag);

  // var Starttr = document.querySelector('#routes-to-do');

  var Starttr = document.createElement('tr');
  Starttr.innerHTML = "";
  trTag.appendChild(Starttr);

  routes.forEach(function(route){
    var tr = document.createElement('tr');
    tr.classList.add('saved-list-item');
    var nameLi = document.createElement('th');
    nameLi.innerText = route.name;
    nameLi.classList.add('th-name');
    //add what switch does for user

    // var thForSwitch = document.createElement('th');

    var statusButton = document.createElement('label');
    statusButton.classList.add('switch');
    var inputOfButton = document.createElement('input');
    inputOfButton.classList.add('check');
    inputOfButton.type = 'checkbox';
    var span = document.createElement('span');
    span.classList.add('slider');

    var deleteById = document.createElement('th');
    deleteById.innerText = 'X';
    deleteById.classList.add('remove-x');
    deleteById.addEventListener('click', function(){
      route.type = "del";
      makeRequest(route, requestComplete);
    });

    tr.appendChild(nameLi);
    statusButton.appendChild(inputOfButton);
    statusButton.appendChild(span);
    tr.appendChild(statusButton);
    // thForSwitch.appendChild(statusButton);
    // tr.appendChild(thForSwitch)
    tr.appendChild(deleteById);

    var notes = document.createElement('th');
    notes.classList.add('notes');
    notes.addEventListener('click', function() {
      var note = prompt("Add note");
      if (note === null) {
        notes.innerHTML = note;
      } else if (note !== null) {
        prompt(note)
      };
      // if (note != null) {
      //   prompt(note)
      // } else if {
      //   notes.innerHTML = note;
      // }
    });

    tr.appendChild(notes);
    tableTag.appendChild(tr);

    /// Added in event listener so that when user clicks on route name ultimately that route will show in map
    nameLi.addEventListener('click', function() {
      var map = new google.maps.Map(document.getElementById('main-map'), {
        mapTypeControl: false,
        center: {lat: 53.8, lng: -1.54},
        zoom: 13
      });
      var reDraw = new AutoCompleteDirectionsHandler(map);
      reDraw.originPlaceId = route.start;
      reDraw.destinationPlaceId = route.end;
      reDraw.travelMode = route.mode;
      reDraw.route();
    });

    inputOfButton.addEventListener('change', function () {//html = checkbox
      route.status++;
      route.type = "status";
      makeRequest(route);
    });

    if (route.status %2 === 0) {
      inputOfButton.checked = true;
    }
    else if (route.status %2 !== 0) {
      inputOfButton.checked = false;
    };//toggles button to be checkout or not
  });
};

module.exports = PopulateRoutesList;

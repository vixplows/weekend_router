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

  nameTag.innerText = "ROUTE NAME"
  doneTag.innerText = "DONE"
  // notesTag.innerText = "NOTES"
  deleteTag.innerText = "REMOVE"
  notesTag.innerText = "NOTES"

  // trTag.appendChild(nameTag);
  // trTag.appendChild(doneTag);
  // trTag.appendChild(notesTag);
  // trTag.appendChild(deleteTag);
  // tableTag.appendChild(trTag);
  start.appendChild(tableTag);

  // var Starttr = document.querySelector('#routes-to-do');

  var Starttr = document.createElement('tr');
  Starttr.innerHTML = "";
  trTag.appendChild(Starttr);

  routes.forEach(function(route){
    var tr = document.createElement('tr');
    tr.classList.add('saved-list-item');
    tr.id = "hit-this"
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
    deleteById.id = 'remove-x';
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


    var notes = document.createElement('th');
    notes.id = 'notes'
    notes.innerText = (route.notes) ? route.notes : "";
    notes.addEventListener('click', function() {
      var message = (route.notes) ? route.notes : ""
      var note = prompt( message + " Please enter your note", " update message");
      if (note != null) {
        notes.innerHTML = note;
      }
      // console.log(route);
      route.notes = notes;
      route.type = "notes";
      makeRequest(route);
    })//where does the GET request Populate the notes?

    tr.appendChild(notes);
    tr.appendChild(deleteById);
    tableTag.appendChild(tr);

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
      reDraw.reDraw = true;
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

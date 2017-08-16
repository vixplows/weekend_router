var AutoCompleteDirectionsHandler = require('./autoCompleteDirectionsHandler.js');

var PopulateRoutesList = function(routes){
  this.render(routes);
};

var makeDeleteRequest = function (id, callback) {
  var url = "/delete/"+ id;
  var routesRequest = new XMLHttpRequest();

  routesRequest.open("POST", url);
  routesRequest.setRequestHeader('Content-Type', 'application/json');
  routesRequest.addEventListener('load', callback);
  routesRequest.send();
};

var requestComplete = function () {
  if(this.status !== 200) return;
  var routesString = this.responseText;
  var freshRoutes = JSON.parse(routesString);
  new PopulateRoutesList(freshRoutes);
};

var changeStatus = function(route, callback) {
  console.log(route._id);
  var id = route._id;

  var url = "/routes/" + id + "/status";
  var changeStatusRequest = new XMLHttpRequest();

  changeStatusRequest.open("PUT", url);
  changeStatusRequest.setRequestHeader('Content-Type', 'application/json');
  changeStatusRequest.addEventListener('load', callback);
  changeStatusRequest.send();
};

var saveNotes = function(route, callback) {
  var id = route._id;
  var notes = route.notes.innerHTML
  // console.log(notes);//not working for some reason

  var url = "/routes/" + id + "/" + notes;
  var changeNotesRequest = new XMLHttpRequest();

  changeNotesRequest.open("PUT", url);
  changeNotesRequest.setRequestHeader('Content-Type', 'application/json');
  changeNotesRequest.addEventListener('load', callback);
  changeNotesRequest.send();
}


PopulateRoutesList.prototype.render = function (routes) {
  var start = document.querySelector('#routes-to-do');
  start.innerHTML = "";
  var tableTag = document.createElement('table');
  tableTag.classList.add('tableTag')
  var trTag = document.createElement('tr');
  var nameTag = document.createElement('th');
  nameTag.classList.add('th-name')
  var doneTag = document.createElement('th');
  var notesTag = document.createElement('th');
  var deleteTag = document.createElement('th');

  trTag.classList.add('saved-list');

  nameTag.innerText = "Route"
  doneTag.innerText = "Done?"
  notesTag.innerText = "Notes"
  deleteTag.innerText = "Remove"

  trTag.appendChild(nameTag)
  trTag.appendChild(doneTag)
  trTag.appendChild(deleteTag)
  trTag.appendChild(notesTag)
  tableTag.appendChild(trTag)
  start.appendChild(tableTag)

  // var Starttr = document.querySelector('#routes-to-do');

  var Starttr = document.createElement('tr');
  Starttr.innerHTML = "";
  trTag.appendChild(Starttr)

  routes.forEach(function(route){
    var tr = document.createElement('tr');
    tr.classList.add('saved-list-item');
    var nameLi = document.createElement('th');
    nameLi.innerText = route.name;
    nameLi.classList.add('th-name')
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
    deleteById.classList.add('remove-x')
    deleteById.addEventListener('click', function(){
      makeDeleteRequest(route._id, requestComplete);
    });

    tr.appendChild(nameLi);
    statusButton.appendChild(inputOfButton);
    statusButton.appendChild(span);
    tr.appendChild(statusButton)
    // thForSwitch.appendChild(statusButton);
    // tr.appendChild(thForSwitch)
    tr.appendChild(deleteById);



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
      changeStatus(route);
    });

    if (route.status %2 === 0) {
      inputOfButton.checked = true;
    }
    else if (route.status %2 !== 0) {
      inputOfButton.checked = false;
    };//toggles button to be checkout or not

    var notes = document.createElement('th');
    notes.id = 'notes'
    notes.addEventListener('click', function() {
      var note = prompt("Please enter your note", "Welcome to your note");
      if (note != null) {
        notes.innerHTML = "Note: " + note ;
      }
      // console.log(route);
      route.notes = notes
      saveNotes(route)
    })//where does the GET request Populate the notes?


    tr.appendChild(notes);
    tableTag.appendChild(tr);
  });
};

module.exports = PopulateRoutesList;

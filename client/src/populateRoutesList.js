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

/// Added in put request to persist change to status to document in db to true and stays as changed status when refresh page - but doesn't work for turning back to false yet!

var changeStatus = function(route, callback) {
  console.log(route._id);
  var id = route._id;

  var url = "/routes/" + id;
  var changeStatusRequest = new XMLHttpRequest();

  changeStatusRequest.open("PUT", url);
  changeStatusRequest.setRequestHeader('Content-Type', 'application/json');
  changeStatusRequest.addEventListener('load', callback); // is this needed?
  changeStatusRequest.send();
};

///

PopulateRoutesList.prototype.render = function (routes) {
  var div = document.querySelector('#routes-to-do');
  div.innerHTML = "";

  routes.forEach(function(route){
    var ul = document.createElement('ul');
    ul.classList.add('saved-routes-list');
    var nameLi = document.createElement('li');
    nameLi.innerText = route.name;

    //add what switch does for user

    var statusButton = document.createElement('label');
    statusButton.classList.add('switch');

    var inputOfButton = document.createElement('input');
    inputOfButton.classList.add('check');
    inputOfButton.type = 'checkbox';

    var span = document.createElement('span');
    span.classList.add('slider');

    ul.appendChild(nameLi);
    ul.appendChild(statusButton);
    statusButton.appendChild(inputOfButton);
    statusButton.appendChild(span);
    div.appendChild(ul);

    /// Added in event listener so that when user clicks on route name ultimately that route will show in map
    nameLi.addEventListener('click', function() {
      console.log("OrginPlaceId: " + route.start)
      console.log("DestinationPlaceId: " + route.end)
      console.log("TraveMode: " + route.mode)

      // when clicked it should:
      // take start and end points (place ids? might need lat and lngs) and the travel mode and give to a route directions object/function to then display on map

      // hard coded to test that map changes when a route name is clicked - if attach lat lng to nameLi element then could access dynamically here but would still need a way of setting both start and end, travel mode and route
      var map = new google.maps.Map(document.getElementById('main-map'), {
        mapTypeControl: false,
        center: {lat: 53.8, lng: -1.54},
        zoom: 13
      });

      // directionsService.route({
      //   origin: {'placeId': route.start},
      //   destination: {'placeId': route.end},
      //   travelMode: route.mode
      // });

    });
    // /

    inputOfButton.addEventListener('change', function () {//html = checkbox
      if (route.status === false) {

        route.status = true;
        changeStatus(route);
      } else if (route.status === true) {

        route.status = false;
        changeStatus(route);
      };
    });

    if (route.status === true) {
      inputOfButton.checked = true;
    }
    else if (route.status === false) {
      inputOfButton.checked = false;
    };//toggles button to be checkout or not

    var deleteById = document.createElement('button');
    deleteById.innerText = 'X';
    deleteById.addEventListener('click', function(){
      makeDeleteRequest(route._id, requestComplete);
    });
    ul.appendChild(deleteById);
  });
};

module.exports = PopulateRoutesList;

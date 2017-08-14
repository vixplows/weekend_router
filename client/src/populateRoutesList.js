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

var changeStatus = function(route) {
  console.log(route.status);
};

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

    // adding in an eventlistener so that when the savedRouteName is clicked it calls the showSelectedRoute function passing in the places ids and travel mode
    nameLi.addEventListener('click', function() {
      var originPlaceId = route.start;
      var destinationPlaceId = route.end;
      var travelMode = route.mode;
      console.log(originPlaceId);
      console.log(destinationPlaceId);
      console.log(travelMode)
    });
    //

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

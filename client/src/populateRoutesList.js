var PopulateRoutesList = function(routes){
  this.render(routes);
};

var changeStatus = function(evt) {
  console.log(this.route.status);
};

PopulateRoutesList.prototype.render = function (routes) {
  var div = document.querySelector('#routes-to-do');

  routes.forEach(function(route){
    var ul = document.createElement('ul');
    ul.classList.add('saved-routes-list');
    var nameLi = document.createElement('li');
    var statusButton = document.createElement('button');

    nameLi.innerText = route.name;

    if (route.status === true) {
      statusButton.innerText = "Done";
    }
    else {
      statusButton.innerText = "To be done";
    }

    statusButton.route = route;
    // console.log(statusButton.ID);
    statusButton.addEventListener('click', changeStatus);

    div.appendChild(ul);
    ul.appendChild(nameLi);
    ul.appendChild(statusButton);
  });
};

module.exports = PopulateRoutesList;

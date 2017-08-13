var PopulateRoutesList = function(routes){
  this.render(routes);
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

    div.appendChild(ul);
    ul.appendChild(nameLi);
    ul.appendChild(statusButton);
  });
};

module.exports = PopulateRoutesList;

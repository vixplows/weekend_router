var PopulateRoutesList = function(routes){
  this.render(routes);
};

PopulateRoutesList.prototype.render = function (routes) {
  var div = document.querySelector('#routes-to-do');

  routes.forEach(function(route){
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    li.innerText = route.name;

    div.appendChild(ul);
    ul.appendChild(li);
  });
};

module.exports = PopulateRoutesList;

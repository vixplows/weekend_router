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
    nameLi.innerText = route.name;
    ul.appendChild(nameLi);

    var statusButton = document.createElement('label');
    statusButton.classList.add('switch')
    ul.appendChild(statusButton);

    var inputOfButton = document.createElement('input');
    inputOfButton.classList.add('check')
    inputOfButton.type = 'checkbox'
    statusButton.appendChild(inputOfButton)

    var span = document.createElement('span');
    span.classList.add('slider')
    statusButton.appendChild(span)

    div.appendChild(ul);

    inputOfButton.addEventListener('change', function () {
      if (route.status === false) {

        route.status = true

      } else if (route.status === true) {

        route.status = false

      }
    });

    if (route.status === true) {
      inputOfButton.checked = true;
    }
    else if (route.status === false) {
      inputOfButton.checked = false;
    }//toggles button to be checkout or not

    statusButton.route = route;
    // console.log(statusButton.ID);
    statusButton.addEventListener('click', changeStatus);
  });
};

module.exports = PopulateRoutesList;

var PopulateRoutesList = function(routes){
  this.render(routes);
};

var changeStatus = function(route) {
  console.log(route.status);
};

PopulateRoutesList.prototype.render = function (routes) {
  var div = document.querySelector('#routes-to-do');

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

    inputOfButton.addEventListener('change', function () {//html = checkbox
      if (route.status === false) {

        route.status = true;
        changeStatus(route);
      } else if (route.status === true) {

        route.status = false;
        changeStatus(route);
      }
    });

    if (route.status === true) {
      inputOfButton.checked = true;
    }
    else if (route.status === false) {
      inputOfButton.checked = false;
    }//toggles button to be checkout or not

    var deleteById = document.createElement('button');
    deleteById.addEventListener('click', function(){
      console.log(route._id)
    })
    ul.appendChild(deleteById)
  });
};

module.exports = PopulateRoutesList;

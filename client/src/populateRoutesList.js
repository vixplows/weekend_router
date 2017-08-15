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
    tableTag.appendChild(tr);
      // </tr>
      // <div id="routes-to-do">


      // </div>
    // </table>

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
  });
};

module.exports = PopulateRoutesList;

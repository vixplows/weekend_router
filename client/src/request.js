// var PopulateRoutesList = require('./populateRoutesList.js');

var makeRequest = function (options, callback) {
  var url;
  var routesRequest = new XMLHttpRequest();

  if (options.type === "del") {
    url = "/delete/"+ options._id;
    routesRequest.open("POST", url);
  } else if (options.type === "status") {
    var id = options._id;
    var url = "/routes/" + id;
    routesRequest.open("PUT", url);
  } else if (options.type === "entry") {
    url = "/routes";
    routesRequest.open("GET", url);
  };

  routesRequest.setRequestHeader('Content-Type', 'application/json');
  routesRequest.addEventListener('load', callback);
  routesRequest.send();
};

module.exports = makeRequest;
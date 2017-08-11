var express = require('express');
var entry = express();
var path = require('path')

entry.get('/', function (req, res) {
  console.log('html')
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

entry.use(express.static('client/build'));
entry.use(express.static('client/public'));

var server = entry.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('entry listening at http://%s:%s', host, port);
});
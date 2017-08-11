var express = require('express');
var parser = require('body-parser');
var entry = express();
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var db;

entry.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

entry.post('/route', function(req, res) {
  res.redirect('/');
});

entry.use(parser.json());
entry.use(parser.urlencoded({extended: true}));
entry.use(express.static('client/build'));
entry.use(express.static('client/public'));

var server = entry.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('entry listening at http://%s:%s', host, port);
});

// MongoClient.connect('mongodb://localhost:27017/weekend_router'), function(err, database) {
  
//   if(err) {
//     console.log(err);
//     return;
//   }

//   db = database;

//   console.log('Connected to database');

//   entry.listen(3000, function() {
//     console.log('Listening on port 3000');
//   });

// }
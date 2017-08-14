var express = require('express');
var parser = require('body-parser');
var entry = express();
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db;

entry.use(parser.json());
entry.use(parser.urlencoded({extended: true}));
entry.use(express.static('client/build'));
entry.use(express.static('client/public'));


// entry.get('/', function (req, res) {
//   console.log("Hello im alive");
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

entry.post('/routes', function(req, res) {
  db.collection('routes').save(req.body, function(err, result){
    res.json(result);
  });
  // res.redirect('/');
  // console.log("hello")
});

entry.get('/routes', function(req, res){
  db.collection('routes').find().toArray(function(err, results){
    res.json(results);
  });
});

entry.post('/delete/:id', function(req, res){
  var id = req.params.id;
  db.collection('routes').deleteOne({'_id': new ObjectID(id)},function(err, result){
    db.collection('routes').find().toArray(function(err, results){
      res.json(results);
    });
  });
});

entry.post('/delete', function(req, res){
  db.collection('routes').remove({}, function(err, result){
    res.redirect('/');
  });
});

MongoClient.connect('mongodb://localhost:27017/weekend_router', function(err, database) {

  if(err) {
    console.log(err);
    return;
  }

  db = database;

  console.log('Connected to database');

  entry.listen(3000, function() {
    console.log('Listening on port 3000');
  });
});

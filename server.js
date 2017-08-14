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


entry.post('/routes', function(req, res) {
  db.collection('routes').save(req.body, function(err, result){
    db.collection('routes').find().toArray(function(err, results){
      res.json(results);
    });
  });
});

entry.get('/routes', function(req, res){
  db.collection('routes').find().toArray(function(err, results){
    res.json(results);
  });
});

///
entry.put('/routes/:id', function(req, res){
  var id = req.params.id;
  // var status = route.status

  // console.log("status in put" + route.status) 

  db.collection('routes').update({'_id': new ObjectID(id)} , {
    $set: {
      status: "something"
    }
  });
});

// db.books.update(
//    { _id: 1 },
//    {
//      $inc: { stock: 5 },
//      $set: {
//        item: "ABC123",
//        "info.publisher": "2222",
//        tags: [ "software" ],
//        "ratings.1": { by: "xyz", rating: 3 }
//      }
//    }
// )

///

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

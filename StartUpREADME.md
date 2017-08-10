
# Mongo db

## learning objectives

### Part 1
1. Explain what NoSQL is
2. Know how to run Mongo db
3. Know how to create datebase(db)
4. Know how to create collection
5. Know how to create a document
6. Know how to delete a datebase

### Part 2
1. be able to use Mongo with express
2. Perform & get requests
3. Perform & post requests

### Prerequisites

What things you need to install the software and how to install them

1. npm + nodejs
2. text editor
3. JSON Formatter (install on your browser)
4. npm body-parser
5. Insomnia REST Client

#### Tips for terminal
in your terminal you can use the alias 'i' for install on npm and other program frameworks like so
```sh
npm i --save express
```
#### Tips of debugging

```js
function = function(event) {
  console.log(event)
}
```
also works in RESTful requests with body-parser(npm)
```js
filmsRouter.post('/', function(req, res){
  console.log(req.body)
  films.push(req.body.film)
  res.json({data: films})
})
```
<br>
Remember if stuff double check your webpack and server terminal, while there running you will get feedback
```sh
throw er; // Unhandled 'error' event
      ^
Error: listen EADDRINUSE 'error' event
    at errnoExecption (net.js:901:11)
```
ect

## What is NoSQL?
basically in the simplest idea of NoSQL is anything not SQL based database language

<br>

### Name Reference Table

|SQL| to |NoSql|
|---|---|--|
|Database|=>|Database|
|Table|=>|collection|
|Row|=>|Document|
|Columns|=>|Field|


## Start Mongo and create datebase

```sh
mongod
```
then open a new tab in terminal and type
```sh
mongo
```
this starts your server and puts you into the shell of Mongo
<br>

## Inside Mongo
your terminal should look like this now
```sh
>
```
if not, you are not in Mongo
<br>

### Create
once in Mongo to create your db type:
```sh
>use farm;
```
which moves you into 'farm' database.

now make your table within the db(farm) with:

```sh
db.animals
```

<br>

### Insert
```sh
db.animals.insert({});
```
creates a animals table within your farm database
<br>
then add your js object into the input field

```sh
db.animals.insert({name:"Billy", type:"Little Lion"});
```

this will create and insert into table/collection
<br>

### Find all
```sh
db.animals.find();
```
will find all items within that table/collection
<br>
### Drop database
```sh
db.dropDatabase();
```
drops the database

## Making a Mongo file
make a mongo folder and cd into it, then touch a js file ['mongo_play.js'](mongo/mongo_play.js) and add this code, same as when we wore in mongo db

### Start template/Create

```js
use farm;

db.dropDatabase();
```
then test in terminal by typing
```sh
mongo < mongo_play.js
```
<br>

### Inserting

```js
db.animals.insert({
  name: "Billy",
  type: "Little Lion"
});

db.animals.find();
```
and then run in terminal again
```sh
mongo < mongo_play.js
```

add to the file
```js
db.animals.insert([{
  name: "Billy",
  type: "Little Lion"
},{
  name: "Whitepaw",
  type: "Dire Wolf"
},{
  name: "Andrea",
  type: "Mermaid"
},{
  name: "Eugene",
  type: "Catfish"
}]);
```
<br>
add your find method
```js
db.animals.find();
```
this will return your table(animals)

<br>
### Finding by id
if you need to find one thing use
```js
db.animals.find({name: "Eugene"});
```
it will find the individual item

### Updating by id

```js
db.animals.update(
  { name: "Eugene" },
  {
    $set: { type: "Goose" }
});
```

### Deleting by id

```js
db.animals.remove({ name: "Eugene" });
```

Interesting when you try to look for it with
```js
db.animals.find({name: "Eugene"});
```
this will be the response
```sh
WriteResult({ "nRemoved" : 1 })
```


---

## Getting Started Part2

Open startpoint.zip then cd into start_point and open your ['package.json'](./start_point/package.json) and read through(hint: write down the dependencies on a page to reference).

while in 'package.js' add at line just under line 8
```json
"start": "nodemon server.js"
//Add your code here on line 9
```
so that it looks like this
```json
"start": "nodemon server.js",
"bundle": "cd client && webpack -w"
```
now we will have access to webpack.
<br>

Once your ready open your terminal and then install the package.json dependencies with
```sh
npm i
```

## server.js setup
First your want to open server.js file ['server.sj'](./start_point/server.js) and start coding

to start we need to require mongo into the server.js file

```js
var path = require("path");
//Add your code here line 5

app.use(parser.json());
```
so it looks like this
```js
var path = require("path");
var MongoClient = require('mongodb').MongoClient

app.use(parser.json());
```

<br>

Now on line 13 add the connector
```js
MongoClient.connect('mongodb://localhost:27017/star_wars', function(err, database){
  if(err){
    console.log(err)
    return
  }

  db = database

  console.log("Connect to database")

  app.listen(3000, function(){
    console.log("Listening on port 3000")
  })
})
```

### RESTful request
create a var(variable) to accept the database on the top of the page with the other global variables
```js
var db;
```

#### post
```js
app.post('/quotes', function(req, res) {
  db.collection('quotes').save(req.body, function(err, result) {
    res.json(result)
  })
})
```
now test in insomnia, this should be your result
```js
{
	"n": 1,
	"ok": 1
}
```
as a mongo object reply

### GET

```js
app.get('/quotes', function(req, res){
  db.collection('quotes').find().toArray(function(err, results) {
    res.json(results)
  })
})
```

### Delete all

```js
app.post('/delete', function(req, res){
  db.collection('quotes').remove({}, function(err, result){
    res.redirect('/')
  })
})
```

#### other delete examples
The "optimistic" assumes there is no need for the response on the .remove request(only recommended for a very causal server database... so don't do it)
```js
app.post('/delete', function(req, res){
  db.collection('quotes').remove()
  res.redirect('/')
})
```

Or just drop the database
```js
app.post('/delete', function(req, res){
  db.collection('quotes').drop()
  res.redirect('/')
})
```

<br><br><br><br>

## App.js
Open ['app.js'](./start_point/client/src/app.js) and start coding!


at start of page put
```js
var QuoteView = require('./views/quoteView');
```

### app constructor
put app function at bottom of page
```js
var app = function(){
  var url = "http://localhost:3000/quotes"
  makeRequest(url, requestComplete)
}
```

add under app function
```js
window.addEventListener('load', app);
```

### makeRequest function

```js
var makeRequest = function(url, callback){
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.addEventListener('load', callback)
  request.send()
}
```

### requestComplete function
```js
var requestComplete = function() {
  if(this.status !== 200) return

  var quoteString = this.response
  var quotes = JSON.parse(quoteString)
  var quoteView = new QuoteView(quotes)
}
```

<br>

## Built With

* [sublime](https://www.sublimetext.com/) - the lightweight text editor
* [atom](https://atom.io/) - the lightweight text editor
* [npm](https://www.npmjs.com/) - package manager for JavaScript
* [Json Formatter](https://github.com/callumlocke/json-formatter) - a great little formatting extension for browsers
* [Insomnia](https://insomnia.rest/) - a platform to test your RESTful routes with

## Authors

* **Victoria Plows** - [vixplows](https://github.com/vixplows)
* **Sam Campbell** - [Samcam1985](https://github.com/Samcam1985)
* **Ross Murray** - [BoscoMurray](https://github.com/BoscoMurray)
* **Reece Jones**  - [lost-in-Code](https://github.com/lost-in-Code-au)

See also the list of [contributors](https://github.com/vixplows/weekend_router/graphs/contributors) who participated in this project.


## Acknowledgments

* Thanks to google for providing api and base code for your applications
* Thanks to the instructors at CodeClan for your instruction

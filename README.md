# weekend_router:

## MVP

Users should be able to:

1. Select start and finish locations for their route
2. Save routes to a wish-list
3. Mark completed routes as ‘done’

## Setup

## Getting Started

First use the clone down the repo, then unzip(if downloaded) in decided location.

Run NPM dependencies command in terminal
```sh
$ npm install
```
<br>
you will also need to require mongodb for the sever database.

first of all you'll need to update your home brew with
```sh
brew update
```

once done you can install mongodb with
```sh
brew install mongodb -g
```
which will install mongodb globally (-g)
<br>
now we get to the good part, start up your new mongodb with
```sh
mongod
```
then start your sever with
```sh
npm start
```
to start up sever, which should be on localhost:3000
<br>
remeber if you want to edit the files you'll have to have webpack running(and our consent if your doing anything but playing with the code).
to run webpack type
```sh
npm run bundle
```

#### As an option you can download and install the font for the page
It is called [KangarooSong]("http://www.1001freefonts.com/kangaroo_song.font")(click to download)
## Tips of debugging
```js
function = function(event) {
  console.log(event)
}
```
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

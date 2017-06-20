var express = require('express');
//var util = require('./lib/utility');
var bodyParser = require('body-parser');
var Club = require('./models/clubs');
var handler = require('./lib/request-handler');
var cors = require('cors');
// var db = require('./app/config');
// var Users = require('./app/collections/users');
// var User = require('./app/models/user');
// var Links = require('./app/collections/links');
// var Link = require('./app/models/link');
// var Click = require('./app/models/click');

var app = express();

app.use(cors());


// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

// app.get('/john', function(req, res) { //new
//   res.status(200);
//   res.send('hello, world\n');
// });

// app.post('/john', function(req, res) { //new
//   console.log(req.body);
//   var username = req.body.username;
//   var age = req.body.age;
//   res.status(200);
//   res.send('hello, ' + username + '\n' + age + '\n');
// });

app.get('/clubs', handler.findAllClubs);

app.get('/clubs/:name', handler.findOneClub);

////////////////app.post('/john', function(req, res) { //new
app.post('/clubs', handler.addClub);

app.delete('/clubs/:name', handler.deleteClub);

app.put('/clubs/:name', handler.updateClub);
//////////////////////////////////////////////////////

app.get('*', function(req, res) { //new
  res.status(200);
  res.send('something elses\n');
});

module.exports = app;
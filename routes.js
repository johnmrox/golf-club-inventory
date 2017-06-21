var express = require('express');
var bodyParser = require('body-parser');
var Club = require('./models/clubs');
var handler = require('./lib/request-handler');
var cors = require('cors');

var app = express();

app.use(cors());


// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

app.get('/clubs', handler.findAllClubs);

app.get('/clubs/:_id', handler.findOneClub);

app.post('/clubs', handler.addClub);

app.delete('/clubs/:_id', handler.deleteClub);

app.put('/clubs/:_id', handler.updateClub);

app.get('*', function(req, res) {
  res.status(200);
  res.send('catchall route\n');
});

module.exports = app;
var express = require('express');

var app = express();

app.get('/index', function(req, res) {
	res.status(200);
	res.send('hello')
})

module.exports = app;
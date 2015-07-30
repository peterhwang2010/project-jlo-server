var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var anyDB = require('any-db');

var events = require('./routes/event');
var attendees = require('./routes/attendee'); 

var app = express();
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', events);
app.use('/', attendees); 

module.exports = app;

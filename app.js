var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var events = require('./routes/event');
var persons = require('./routes/person'); 
var attendees = require('./routes/attendee');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', events);
app.use('/', persons);
app.use('/', attendees);  

module.exports = app;

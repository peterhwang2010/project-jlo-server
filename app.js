var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var events = require('./routes/events');
var persons = require('./routes/persons'); 
var guests = require('./routes/guests');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', events);
app.use('/', persons);
app.use('/', guests);  

module.exports = app;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// requiring a file (cats) and passing app into the file
// note that "cats" returns a function
var cats = require('./routes/dog.js')(app);

var server = app.listen(3001, function() {
  console.log('Server running at http://127.0.0.1:3001/');
});
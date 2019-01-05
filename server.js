module.paths.push('/usr/local/lib/node_modules')

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var friends = require('./app/data/friends.js');

var app = express();

// Set default port for Heroku
var PORT = process.env.PORT || 3000; 

app.use(express.static('app/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Require Routes
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// Start the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
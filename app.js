var express = require('express');
var path = require('path');
var routes = require('./routes/index');

var app = express();

var port = 3000;

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/', express.static(__dirname + '/node_modules/snapsvg/dist'))
app.use('/', express.static(__dirname + '/node_modules/jquery/dist'))

// define routes
app.use('/', routes);

app.listen(port);
console.log('Server running on port ' + port);
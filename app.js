var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan'); // This is a logging middleware
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))

server.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Server listening on %s:%s", host, port);
        console.log("hello");
})
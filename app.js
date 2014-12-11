var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

app.use(logger('dev'));
// Tell Express that we also want to parse json bodies from put or post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')));  //automatically create route for everything in public



//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies
console.log("test");

app.get('/', function (req, res) {
  res.send('Hello World!')
  console.log("get request to /")
})

app.get('/', function (req, res) {
	//res.sendFile(path.join(__dirname, '../Macman/public', 'index.html'))
	res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// Handle the put http verb for when we want to save a score
app.post('/gameover', function(req, res) {
	//var scoreData = req.body.score;
	console.log("post request for /gameover handled");
	//res.send(req);
	// req.collections.images.insert(drawingData, function(error, response){
	// 	if (error) throw error;
	// 	res.send(response);
	// })
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
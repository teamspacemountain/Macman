var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');

// Tell Express that we also want to parse json bodies from put or post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//   res.send('Hello World!')
//   console.log("get request to /")
// })

app.get('/', function (req, res) {
	//res.sendFile(path.join(__dirname, '../Macman/public', 'index.html'))
	res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// Handle the put http verb for when we want to save
app.put('/gameover', function(req, res) {
	var scoreData = req.body.score;
	console.log("put request for /gameover handled");
	res.send("hello?");
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
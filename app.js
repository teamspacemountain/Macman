var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://@localhost:27017/Macman', {safe: true});
var collections = { scores: db.collection('scores')};
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
	var newScores=[100,200,300,400,500];
	var scoreData = req.body.score;
	console.log("score data is below");
	console.log(scoreData);
	console.log(scoreData.score);
	db.collection('scores').find().toArray(function(err, result) {
    	if (err) throw err;
    	//result is an array
    	console.log(result);
    	console.log(result[0].scores); //this is the array of current high scores
    	newScores = [100,200,300,400,500];
    	// console.log("logging unsorted then sorted");
    	// console.log(currentHighScores);
    	// console.log(currentHighScores.sort(function(a, b){return a-b}));  //sorts array in ascending
    	// var max_of_array = Math.max.apply(Math, currentHighScores);
    	// console.log("logging max, then min");
    	// console.log(max_of_array);
    	// var min_of_array = Math.min.apply(Math, currentHighScores);
    	// console.log(min_of_array);
	});

	db.collection('scores').insert({scores: newScores}, function(err, result) {
    	if (err) throw err;
    	if (result) console.log('Added!');
	});
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
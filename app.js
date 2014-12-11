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

var determineRank = function(val, scores){
  scores.sort(function(a,b){return a-b});
  if(val<= scores[0]){
    return([false,-1,scores]);
  }
  else if(val>scores[0]){
    scores[5]= val;
    
    scores.sort(function(a,b){return a-b});
    console.log(scores);
    scores=scores.slice(1,6);
    var index=scores.indexOf(val);
    return([true,index,scores]);
  }
}



// Handle the put http verb for when we want to save a score
//ALWAYS REMEMBER TO INSERT DUMMY SCORES TO START THAT MATCH HTML PAGE
app.post('/gameover', function(req, res) {
	var scoreData = req.body.score;
  var userScore = scoreData.score;
	// console.log("score data is below");
	// console.log(scoreData);
	//console.log(scoreData.score);

  //first check to see if db is empty
  // db.collection('scores').find().toArray(function(err, result) {
  //     if (err) throw err;
  //     console.log("logging result");
  //     console.log(result);
  //     console.log(result.length);
  //     if(result.length===0){
  //       //default scores
  //       console.log("In IF statement");
  //       db.collection('scores').insert({scores: [59,67,75,82,90]}, function(err, result) {
  //         if (err) throw err;
  //         if (result) console.log('Added!');
  //       });
  //     }
  // });

	db.collection('scores').find().toArray(function(err, result) {
    	if (err) throw err;
    	//result is an array
      console.log("logging result");
    	console.log(result);
      console.log(result.length);
      //insert default scores if database is empty

    	//console.log(result[0].scores); //this is the array of current high scores
      var currHighScores = result[0].scores;
    	var isHighScore = determineRank(userScore, currHighScores);
      console.log(isHighScore);
      db.collection('scores').remove({}, function(err, result) {
        if (!err) console.log('VR deleted!');
      });
      db.collection('scores').insert({scores: isHighScore[2]}, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!');
      });

	});

	// db.collection('scores').insert({scores: newScores}, function(err, result) {
 //    	if (err) throw err;
 //    	if (result) console.log('Added!');
	// });
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
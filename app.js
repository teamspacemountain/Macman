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


db.collection('scores').find().toArray(function(err, result){
  var currentScores = [];
  for(var i = 0;i<result.length;i++){
    currentScores[i] = [result[i].name,result[i].score];
  }
  currentScores.sort(function(a,b){return a[1]-b[1]});
  console.log("First Log");
  console.log(currentScores.length);
  if(currentScores.length==0){
    //populate database with default data
    db.collection('scores').insert({name: "Blastoise", score: 200}, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!');
    });
    db.collection('scores').insert({name: "Dragonite", score: 300}, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!');
    });
    db.collection('scores').insert({name: "Vegeta", score: 9001}, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!');
    });       
    db.collection('scores').insert({name: "Gyarados", score: 400}, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!');
    });
    db.collection('scores').insert({name: "space", score: 10000}, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!');
    });    
  }
})

// app.get('/', function (req, res) {
//   res.send('Hello World!')
//   //console.log("get request to /")
// })

app.get('/', function (req, res, next) {
	//res.sendFile(path.join(__dirname, '../Macman/public', 'index.html'))
	res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

//used to figure out where the user's score fits into the current top scores
//if it's not a high score it returns the old scores
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

app.get('/updateTable', function(req, res, next){

  db.collection('scores').find().toArray(function(err, result){
    var currentScores = [];
    for(var i = 0;i<result.length;i++){
      currentScores[i] = [result[i].name,result[i].score];
    }
    currentScores.sort(function(a,b){return a[1]-b[1]});
    console.log(currentScores);

    var returnData = {name1:currentScores[4][0], score1:currentScores[4][1],name2:currentScores[3][0], score2:currentScores[3][1],name3:currentScores[2][0], score3:currentScores[2][1],name4:currentScores[1][0], score4:currentScores[1][1],name5:currentScores[0][0], score5:currentScores[0][1]};
    res.send(returnData);

  })
})


// Handle the put http verb for when we want to save a score
//ALWAYS REMEMBER TO INSERT DUMMY SCORES TO START THAT MATCH HTML PAGE
app.post('/gameover', function(req, res, next) {



  var clientData = req.body.score;
  var userScore = clientData.score;
  var userName = clientData.name;

  db.collection('scores').find().toArray(function(err, result){
    if(err) throw err;
    console.log(result[0].name);
    console.log(result[0].score);
    var currentScores = [];
    for(var i = 0;i<result.length;i++){
      currentScores[i] = [result[i].name,result[i].score];
    }
    
    currentScores[5] = [userName,userScore];
    currentScores.sort(function(a,b){return a[1]-b[1]});
    currentScores=currentScores.slice(1,6);
    console.log(currentScores);
    //now clear database
    db.collection('scores').remove({}, function(err, result) {
        if (!err) console.log('VR deleted!');
     });

    //now repopulate database with updated stuff from currentScores
    for(var j=0;j<currentScores.length;j++){
      db.collection('scores').insert({name: currentScores[j][0], score: currentScores[j][1]}, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!');
      });
    }

    var returnData = {name1:currentScores[4][0], score1:currentScores[4][1],name2:currentScores[3][0], score2:currentScores[3][1],name3:currentScores[2][0], score3:currentScores[2][1],name4:currentScores[1][0], score4:currentScores[1][1],name5:currentScores[0][0], score5:currentScores[0][1]};
    res.send(returnData);
  })

})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Macman listening at http://%s:%s', host, port)

})
var express = require('express')
var app = express()
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('Hello World!')
  console.log("get request to /")
})

app.get('/index.html', function (req, res) {
	res.sendFile(path.join(__dirname, '../Macman/public', 'index.html'))
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
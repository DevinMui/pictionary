var express = require('express')
var app = express()

app.use(express.static('./'))

app.get('/', function(req, res){
	res.sendfile('index.html')
})
app.get('/svg-test', function(req, res){
	res.sendfile('another.svg')
})
app.listen(3000, function(){
	console.log('running')
})
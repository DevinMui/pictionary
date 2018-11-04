var express = require('express')
var app = express()
var exec = require('child_process').exec

app.use(express.static('./'))

app.get('/', function(req, res){
	res.sendfile('index.html')
})
app.get('/svg-test', function(req, res){
	res.sendfile('another.svg')
})

app.get('/generate', function(req, res){
	exec('python more_vae.py', function(err, stdout, stderr){
		if(err) console.log(err)
		if(stderr) console.log(stderr)
		res.json({ filename: stdout })
	})
})

app.listen(3000, function(){
	console.log('running')
})
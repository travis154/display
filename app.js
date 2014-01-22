
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/tweets');
var schema = mongoose.Schema({
		"delete":{
			"status":{}
		},
		entities:{},
		text:'string',
		id_str:'string',
		id:'number',
		user:{
			screen_name:'string'
		}
	}
	,{strict:false}
);
var tweets = db.model('tweets', schema);


var app = express();
var server = http.createServer(app).listen(3030);
var io = require('socket.io').listen(server);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', function(req,res){
	res.render('index');
});
app.get('/:keyword', function(req,res){
	var k = req.params.keyword;
	var query = {};
	if(keyword){
		query = {text:new RegExp(k,"gi")}
	}
	var t = tweets
	.find(query)
	.sort({_id:-1})
	.lean()
	.stream();
	t.on('data', function(data){
		var print="";
		if(program.full)
			print = data;
		else
			print = data.id_str + "\t" +data.created_at  + " " + data.user.screen_name + ": " + data.text;
		if(program.single){
			print = JSON.stringify(print);
		}
		console.log(print);
	});
	t.on('end', function(){
		console.log("done");
		process.exit();
	});
	
});




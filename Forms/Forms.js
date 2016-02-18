var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

function getMathRandom(){
	var mathNum = Math.random();
	return mathNum;
}//end getMathRandom

function genContext(){
	var stuffToDisplay={};
	stuffToDisplay.time = (new Date(Date.now())).toLocaleTimeString('en-US');
	return stuffToDisplay;
}//end genContext

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home.handlebars') //We can omit the .handlebars extension as we do below
});

app.get('/other-page',function(req,res){
  res.render('other-page');
});

app.get('/time',function(req,res){
	res.render('time',genContext());
});

app.get('/randomMath',function(req,res){
	res.render('randomMath',genContext());
});

app.get('/get-loopback-improved',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }//end for
  var context = {};
  context.dataList = qParams;
  console.log('Context:',context);
  res.render('get-loopback-improved', context);
});//end app.get

app.get('/getRequest',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }//end for
  var context = {};
  context.dataList = qParams;
  console.log('Context:',context);
  res.render('getRequest', context);
});//end app.get

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
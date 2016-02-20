var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.render('home.handlebars') 
});

app.get('/getRequest',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }//end for
  var context = {};
  context.dataList = qParams;
  res.render('getRequest', context);
});//end app.get

app.post('/getPost', function(req,res){
  //URL parameters
  var qParamsURL = [];
  for (var p in req.query){
    qParamsURL.push({'name':p,'value':req.query[p]})
  }//end for
  var context = {};
  context.dataListURL = qParamsURL;
  //res.render('getPost', contextURL);

  //Body parameters
  var qParamsBody = [];
  for (var p in req.body){
    qParamsBody.push({'name':p,'value':req.body[p]})
  }
  
  context.dataList = qParamsBody;
  res.render('getPost', context);
});

//500 error
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

//400 error
app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
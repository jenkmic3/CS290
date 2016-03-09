var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');
var path = require('path')

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret:'SuperSecretPassword'}));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/',function(req,res,next){
  console.log("----------");
  var context = {};
  //If there is no session, go to the main page.
  console.log("Get Function");
  console.log("req.query:",req.query);
  console.log("Before main");
  /*if (req.query.page=='mainPage'){
    console.log("In the main Page if");
    res.render('mainPage',context);
    console.log("before main return");    
    return;       
  }//end if req.query*/
  if (req.query.page=='csvPage'){
    console.log(" Rendering the Csv Page");
    res.render('csvPage',context);    
    
  }//end if
  else if (req.query.page=='yqlPage'){
    console.log(" Rendering the yql Page");
    res.render('yqlPage',context);    
    
  }//end if
  else {
    console.log("Main");
    res.render('mainPage');
    return;
  }
  console.log("End of If's");
  
 });//end app.get

app.post('/',function(req,res){
  var context = {};
  //end function(req,res)

});//end post

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
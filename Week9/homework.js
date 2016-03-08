var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');
var path = require('path')
var mysql = require('mysql');
var pool = mysql.createPool({
  host: "value", 
  user: "student", 
  password: "default", 
  database: "student", 
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret:'SuperSecretPassword'}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res,next){
  var context = {};
  context.time = Date();
  context.noExercise=false;
  //setup database
  pool.query("DROP TABLE IF EXISTS myExerciseData", function(err){
    var createString = "CREATE TABLE myExerciseData(" + 
      "id INT PRIMARY KEY AUTO_INCREMENT," + 
      "name VARCHAR(255) NOT NULL," + 
      "reps INT, " + 
      "weight FLOAT," + 
      "dateOccured VARCHAR(255)," +
      "lbs FLOAT)";
    pool.query(createString,function(err){
      context.results = "Table reset";
      res.render('home',context);
    });
  });  
});//end app.get

app.post('/',function(req,res,next){
  var context = {};
   if(req.body['add']){
      //insert data
      pool.query("INSERT INTO myExerciseData ('name', 'reps', 'weight', 'dateOccured','lbs') VALUES " + 
        "(?,?,?,?,?)", [req.body.name, req.body.reps, req.body.weight, req.body.dateOccured, req.body.lbs],function(err){
          console.log("name: ",req.body.name);
          console.log("reps: ",req.body.reps);
          console.log("weight: ",req.body.weight);
          console.log("dateOccured: ",req.body.dateOccured);
          console.log("lbs: ",req.body.lbs);
          if (err){
            console.log("Err");
            next(err);
            return;
          }//end if err
      });//end pool.query
  }//end if req.body['add']


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
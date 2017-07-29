var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/:data',function(req,res){
    var fins;
    var dataHere=req.params.data;
    
    var mongo=require("mongodb").MongoClient;
mongo.connect('mongodb://gowisgreat1995:'+process.env.db_password+'@cluster0-shard-00-00-1hsjf.mongodb.net:27017,cluster0-shard-00-01-1hsjf.mongodb.net:27017,cluster0-shard-00-02-1hsjf.mongodb.net:27017/'+process.env.db_name+'?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',function(err,db){
    console.log("successful");
    var urls=db.collection("urls");
    urls.find({urlShort:dataHere}).toArray(function(err,documents){
        console.log(documents[0]);
       fins =documents[0]["urlOriginal"];
        res.redirect("https://"+fins);
        res.end();
        
       
    });
    
    
    
    
    db.close();
    
});
    
})

app.get('/new/:data',function(req,res){
    var gotLink=req.params.data;
    console.log(gotLink);
        function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
var rString = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        
     
    var httpreg=/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
   if( httpreg.test(gotLink))
       {
           var mongo=require("mongodb").MongoClient;
mongo.connect('mongodb://gowisgreat1995:'+process.env.db_password+'@cluster0-shard-00-00-1hsjf.mongodb.net:27017,cluster0-shard-00-01-1hsjf.mongodb.net:27017,cluster0-shard-00-02-1hsjf.mongodb.net:27017/'+process.env.db_name+'?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',function(err,db){
    
    var urls=db.collection("urls");
    urls.insert({
        urlOriginal:gotLink,
        urlShort:rString
    },function(err,data){
        
        res.send({urlOriginal:gotLink,
        urlShort:rString});
        res.end();
        
    });
     db.close();
});
       }
    else{
        
        res.send("ENTER A VALID URL!");
        res.end();
    }

        
        
       
    });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8000);

module.exports = app;

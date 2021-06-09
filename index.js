var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');


//middleware
var middleware = require('./middleware/reqresmiddleware');
var http = require('http');
const sql = require("./models/mysqlconnect.js");
var messageconst = require("./config/messageconstant");
//routes - controller
/*var appRouter = require('./routes/app_api');*/
var adminRouter = require('./routes/admin_router');
/*var informationRouter = require('./routes/information');
var usersRouter = require('./routes/users');
var enDecryptRouter = require('./routes/endecrypt');
var logRouter = require('./routes/logaccess');*/



var app = express();
app.use(cors({origin: '*'}));
app.use(function(req, res, next) {
    //res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authentication");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,DELETE,OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');



//HTTP config START
 var http = require('http').Server(app);
//HTTP config  end

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
var path = require('path');
app.use(express.static(__dirname+'/uploads'));


/*app.use('/admin/api/v1/login',testing);

function testing(req, res, next){
    console.log("asfaafa");
    return false;
}*/

//mobile app routes
//app.use('/api/v1',appRouter,middleware.beforeresponse);
// Admin Routes
app.use('/admin/api/v1',adminRouter,middleware.beforeresponse);
/*app.use('/api/v1/information',informationRouter,middleware.beforeresponse);
// routes
app.use('/users', usrAuthToken, middleware.afterrequest, usersRouter, middleware.beforeresponse);
app.use('/crypt',enDecryptRouter);
app.use('/log',logRouter);*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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



// HTTP config start
 http.listen(3000);
 http.on('listening', function() {
     console.log('Server started on port %s at %s', http.address().port, http.address().address);
 });
// HTTP config end
module.exports = app;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessions = require('express-session')
const mongoose  = require('mongoose')
const User = require("./model/product_model")
const fileupload = require('express-fileupload')

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
const { hasSubscribers } = require('diagnostics_channel');
const hbs = require('hbs')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
 const partialsPath = path.join(__dirname,"./views/partials");
 hbs.registerPartials(partialsPath);
//  app.set("views",path.join(__dirname,"./views/partials"));

mongoose.connect( "mongodb://localhost:27017/coffee").then((success) => {
  console.log('success')
}).catch((err) => {
  console.log(err)
})



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload())



const oneDay = 1000 * 60 * 24;
app.use(sessions({
  key:"user",
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767jg",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false 
}));

console.log(mongoose.models)
app.use('/', userRouter);
app.use('/admin', adminRouter);

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

module.exports = app;

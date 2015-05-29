var express = require('express');
var path = require('path');
var logs = require('./utilities/log').logger;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('hostname', ip);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*.*.*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};
app.use(allowCrossDomain);

routes.routes(app);

//close mongo connection
process.on('SIGINT', function() {
    logs.info('Mongoose disconnected.');
    process.exit(0);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;

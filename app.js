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
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));	

// use requireJS
var requirejs = require('requirejs');

app.use('/', index);
app.use('/users', users);

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




var debug = require('debug')('tank-battalion:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = ('8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var commonPort = app.listen(port, () => {
	console.log('App running on localhost:8000');
});

var io = require('socket.io').listen(commonPort);

// socket.io communication
io.on('connection', function(socket) {
	io.emit('msg', 'user connected');
	io.emit('tank', 'tank loaded');
	socket.on('tank', function(msg){
		console.log('message: ' + msg);
		socket.broadcast.emit('msg', msg);
	});
});
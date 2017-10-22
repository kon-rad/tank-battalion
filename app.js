const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const Player  = require('./lib/Player');
const GameState  = require('./lib/GameState');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));	

// use requireJS
let requirejs = require('requirejs');

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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

const debug = require('debug')('tank-battalion:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = ('8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const commonPort = app.listen(port, () => {
	console.log('App running on localhost:8000');
});

const io = require('socket.io').listen(commonPort);

/**
 * Socket.io Communication.
 */ 

let playerSockets = [];
let gameState = new GameState();

io.on('connection', function(socket) {

	io.emit('msg', 'user connected');

	/**
	 *  User disconnected.
	 */ 

	socket.on('disconnect', () => {
	    let player = playerSockets.find(function(player) {
	      return player.socket == socket
	    });
	    gameState.players = gameState.players.filter(function(p) {
	      return p.id != player.id
	    });
	    io.emit('player-disconnected', {id: socket.id })
	});

	/**
	 *  User Created.
	 */ 

	socket.on('create-player', function(data){
		let id = socket.id;
		playerSockets.push({id: id, socket: socket});
		let newPlayer = new Player(id, data.x, data.y, data.tankDirection, data.speed, data.moving, data.color, data.bullet, data.bulletFired);
		gameState.players.push(newPlayer);
		socket.emit('player-created', { newPlayer: newPlayer, players: gameState.players, world: gameState.world});
	});

	/**
	 *  Update Player and Game Sates.
	 */ 

	socket.on('game-state', function (update) {
		gameState.updatePlayer(update.player.id, update.player);
		gameState.updateWorld();
	});
});

setInterval(() => {
  io.emit('send-game-state', gameState)
}, 100)
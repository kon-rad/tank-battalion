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
const gameUpdate = require('./lib/gameUpdate');

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

var port = (process.env.PORT || '8000');
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

let render = 0;
const renderFn = () => {
	render = setInterval(() => {
		gameState = gameUpdate(gameState);
		io.emit('send-game-state', gameState);
	}, 30);
}

let playerSockets = [];
let gameState = new GameState();
const spawnPosition = [{x:100,y:580}, {x:580,y:300}, {x:20,y:350}, {x:300,y:20}];
var xy = Math.floor(Math.random()*4);

io.on('connection', function(socket) {

	socket.on('game-restart', function() {
		clearInterval(render);
		gameState = new GameState();
		renderFn();
	})

	io.emit('msg', 'user connected');

	/**
	 *  User disconnected.
	 */ 

	socket.on('disconnect', () => {
	    let player = playerSockets.find(function(player) {
	      return player.socket == socket
	    });
	    if(player == undefined)
	    	return new Error();
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
		xy = ((xy+1>=4)?0:xy+1);
		let posX = spawnPosition[xy].x, posY = spawnPosition[xy].y;
		let newPlayer = new Player(id, posX, posY, data.tankDirection, data.speed, data.moving, data.color, data.bullet, data.bulletFired, data.name);
		gameState.players.push(newPlayer);
		gameState.game.users[id] = {name:data.name, color:data.color, points:0, lives:3, explosion:false};
		socket.emit('player-created', { newPlayer: newPlayer, players: gameState.players, world: gameState.world});
	});

	/**
	 *  Update Player and Game Sates.
	 */ 

	socket.on('game-state', function (newGameState) {
		clearInterval(render);
		gameState.updatePlayer(newGameState.player.id, newGameState.player);
		renderFn();
	});
});

renderFn();
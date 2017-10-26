'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

define(['game', 'events', 'audio', 'mWorld', 'tank', 'draw', 'singlePlayer', 'multiPlayer'], function (game, events, audio, mWorld, tank, draw, singlePlayer, multiPlayer) {

	var display = document.getElementById('display_text');
	var display_lives = document.getElementsByClassName('score__lives_tank');

	var control = function control() {
		display.innerHTML = '<div class="display_text__1player">' + 'VS COMPUTER</div></br></br>' + '<div class="display_text__2player">MULTIPLAYER</div>';
		var onePlayer = document.getElementsByClassName('display_text__1player')[0];
		var multiPlayer = document.getElementsByClassName('display_text__2player')[0];
		onePlayer.addEventListener('click', startOnePlayer);
		multiPlayer.addEventListener('click', startMultiPlayer);
		startScreen();
	};

	var startScreen = function startScreen() {
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		game.worldData = mWorld.parent.slice();
		mWorld.draw(game.worldData);
	};

	var loading = function loading() {
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		mWorld.draw(game.worldData);
		if (game.bool) {
			game.bool = false;
			tank.moving_up(game.x, game.y);
		} else {
			game.bool = true;
		}
	};

	var startOnePlayer = function startOnePlayer() {
		game.playerOneLives = 3;
		game.bullets = [];
		game.bots_destroyed = 0;
		game.bots_on_screen = 0;
		game.round = 1;
		game.round_display.innerHTML = game.round;
		game.difficulty = 0;
		if (parseInt(game.high_num.innerHTML) <= game.playerOnePoints * 10) {
			game.high_num.innerHTML = game.playerOnePoints * 10;
		}
		game.playerOnePoints = 0;
		game.score_num.innerHTML = game.playerOnePoints * 10;
		restorePlayerOneLives();
		restoreOnScreenBots();
		restoreDestroyedBots();
		loadOnePlayer();
	};

	var startMultiPlayer = function startMultiPlayer() {
		game.difficulty = 0;
		loadMultiplayerMenu();

		if (parseInt(game.high_num.innerHTML) <= game.playerOnePoints * 10) {
			game.high_num.innerHTML = game.playerOnePoints * 10;
		}

		document.addEventListener("keydown", events.handleKeydown, false);
		document.addEventListener("keyup", events.handleKeyUp, false);
	};

	var loadMultiplayer = function loadMultiplayer(name, color) {

		var plr = {};
		plr.x = Math.floor(Math.random() * 600);
		plr.y = Math.floor(Math.random() * 600);
		plr.moving = false;
		plr.bullet = {};
		plr.color = color;
		plr.name = name;
		plr.tankDirection = 'up';
		plr.speed = 10;
		plr.bulletFired = false;

		game.socket = io();
		game.socket.emit('create-player', plr);

		audio.start.play();
		game.canvas.setAttribute('tabindex', '0');
		game.canvas.focus();
		game.socket.on('player-created', function (data) {
			console.log('data recieved from setup: ', data);
			game.currentPlayer = data.newPlayer;
			game.mpCurrentId = data.newPlayer.id;
			game.mpPlayers = data.players;
			game.mpWorld = data.world;
			mWorld.draw(game.mpWorld);
		});
		multiPlayer.init();
	};

	var loadOnePlayer = function loadOnePlayer() {
		if (game.playerOneLives <= 0) {
			singlePlayer.ai.bots = [];
			return gameOver();
		}
		if (game.newRound) {

			game.newRound = false;
			game.round_display.innerHTML = game.round;
			game.difficulty += .2;
			game.playerOneLives = 3;
			game.bots_destroyed = 0;
			game.bots_loaded = 0;
			game.bots_on_screen = 0;
			restorePlayerOneLives();
			restoreOnScreenBots();
			restoreDestroyedBots();
			game.worldData = mWorld.parent.slice();
			mWorld.draw(game.worldData);
			game.bots_loaded = 0;

			if (game.round >= 5) {
				return youWin();
			}
		}
		game.bots_on_screen = game.bots_destroyed;
		game.bots_loaded = game.bots_on_screen;
		game.playerOneLives--;
		display_lives[game.playerOneLives].style.display = 'none';
		restoreOnScreenBots();

		game.x = 460;
		game.y = 580;
		game.bullets = [];
		game.bullets_fired = false;
		display.innerHTML = '';
		var startGame = setInterval(loading, 100);
		setTimeout(clearLoading, 1400);

		function clearLoading() {
			clearInterval(startGame);
			document.addEventListener("keydown", events.handleKeydown, false);
			document.addEventListener("keyup", events.handleKeyUp, false);
			singlePlayer.ai.bots = [];
			singlePlayer.init();
			audio.start.play();
			game.canvas.setAttribute('tabindex', '0');
			game.canvas.focus();
			tank.moving_up(game.x, game.y);
			game.tankDirection = 'up';
			draw.start();
		}
	};

	var restoreOnScreenBots = function restoreOnScreenBots() {
		[].concat(_toConsumableArray(game.display_bots)).forEach(function (bot) {
			if (bot.classList.contains('on_screen')) {
				bot.classList.remove('on_screen');
			}
		});
	};
	var restoreDestroyedBots = function restoreDestroyedBots() {
		[].concat(_toConsumableArray(game.display_bots)).forEach(function (bot) {
			if (bot.style.visibility == 'hidden') {
				bot.style.visibility = 'visible';
			}
		});
	};

	var restorePlayerOneLives = function restorePlayerOneLives() {
		[].concat(_toConsumableArray(display_lives)).forEach(function (life) {
			life.style.display = 'block';
		});
	};

	var youWin = function youWin() {
		display.innerHTML = '<div id="win" class="display_text__1player_win">' + 'You Won the Game!</div>';
		var win = document.getElementById('win');
		win.addEventListener('click', control);
	};

	var gameOver = function gameOver() {
		display.innerHTML = '<div id="win" class="display_text__1player_win">' + 'Game Over!</div>';
		var win = document.getElementById('win');
		win.addEventListener('click', control);
		game.bullets = [];
		game.bots_destroyed = 0;
		game.bots_on_screen = 0;
		game.playerOnePoints = 0;
		game.score_num.innerHTML = game.playerOnePoints * 10;
		restorePlayerOneLives();
		restoreOnScreenBots();
		restoreDestroyedBots();
	};

	var loadMultiplayerMenu = function loadMultiplayerMenu() {
		display.innerHTML = '<div class="display_text__multiplayerMenu"><input id="mpName"' + ' type="text" placeholder="Username"><select id="mpColor" name="mpColor">' + '<option value="#76ff03">neon green</option>' + '<option value="#7b1fa2">purple</option>' + '<option value="#03a9f4">blue</option>' + '<option value="#e91e63">pink</option>' + '</select><button id="mpSubmit">Enter</button></div>';
		var mpForm = document.getElementById('mpSubmit');
		var color = document.getElementById('mpColor').value;
		mpForm.addEventListener('click', mpFormSubmit);
	};

	var mpFormSubmit = function mpFormSubmit() {
		var name = document.getElementById('mpName').value;
		var color = document.getElementById('mpColor').value;
		display.innerHTML = '';
		loadMultiplayer(name, color);
	};

	return {
		control: control,
		loadOnePlayer: loadOnePlayer
	};
});
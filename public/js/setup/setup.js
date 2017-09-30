'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

define(['game', 'events', 'audio', 'mWorld', 'tank', 'draw', 'singlePlayer'], function (game, events, audio, mWorld, tank, draw, singlePlayer) {

	var display = document.getElementById('display_text');
	var display_lives = document.getElementsByClassName('score__lives_tank');

	var control = function control() {

		display.innerHTML = '<div class="display_text__1player">' + 'START GAME</div>';
		var onePlayer = document.getElementsByClassName('display_text__1player')[0];
		onePlayer.addEventListener('click', startOnePlayer);
		startScreen();
	};

	var startScreen = function startScreen() {
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		mWorld.data = mWorld.org.slice();
		mWorld.draw();
	};

	var loading = function loading() {
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		mWorld.draw();
		if (game.bool) {
			game.bool = false;
			tank.moving_up();
		} else {
			game.bool = true;
		}
	};

	var startOnePlayer = function startOnePlayer() {
		game.stop = false;
		game.playerOneLives = 3;
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

	var loadOnePlayer = function loadOnePlayer() {
		if (game.playerOneLives <= 0) {
			return gameOver();
		}
		if (game.newRound) {

			game.newRound = false;
			game.round_display.innerHTML = game.round;
			game.difficulty += .2;
			game.playerOneLives = 3;
			game.bots_destroyed = 0;
			game.bots_on_screen = 0;
			restorePlayerOneLives();
			restoreOnScreenBots();
			restoreDestroyedBots();
			mWorld.data = mWorld.org.slice();
			mWorld.draw();
			if (game.round >= 5) {
				return youWin();
			}
		}
		game.bots_on_screen = game.bots_destroyed;
		game.playerOneLives--;
		display_lives[game.playerOneLives].style.display = 'none';
		restoreOnScreenBots();

		game.x = 500;
		game.y = 20;
		game.stop = false;
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
			tank.moving_up();
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
	};

	return {
		control: control,
		loadOnePlayer: loadOnePlayer
	};
});
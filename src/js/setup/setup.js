'use strict';

define([ 'game', 'events', 'audio', 'mWorld', 'tank', 'draw', 'singlePlayer', 'multiPlayer'], 
	function ( game, events, audio, mWorld, tank, draw, singlePlayer, multiPlayer) {

	const display = document.getElementById('display_text');
	const display_lives = document.getElementsByClassName('score__lives_tank');

	const control = () => {
		display.innerHTML = '<div class="display_text__1player">' 
		+ 'VS COMPUTER</div></br></br>'
		+ '<div class="display_text__2player">MULTIPLAYER</div>';
		const onePlayer = document.getElementsByClassName('display_text__1player')[0];
		const multiPlayer = document.getElementsByClassName('display_text__2player')[0];
		onePlayer.addEventListener('click', startOnePlayer);
		multiPlayer.addEventListener('click', startMultiPlayer);
		startScreen();
	};

	const startScreen = () => {
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		game.worldData = mWorld.parent.slice();
		mWorld.draw(game.worldData);
	}

	const loading = () => {
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		mWorld.draw(game.worldData);
		if (game.bool) {
			game.bool = false;
			tank.moving_up(game.x, game.y);
		} else {
			game.bool = true;

		}
	}

	const startOnePlayer = () => {
		game.playerOneLives = 3;
		game.bullets = [];
		game.bots_destroyed = 0;
		game.bots_on_screen = 0;
		game.round = 1;
		game.round_display.innerHTML = game.round;
		game.difficulty = 0;
		if(parseInt(game.high_num.innerHTML) <= game.playerOnePoints*10) {
			game.high_num.innerHTML = game.playerOnePoints*10;
		}
		game.playerOnePoints = 0;
		game.score_num.innerHTML = game.playerOnePoints*10;
		restorePlayerOneLives();
		restoreOnScreenBots();
		restoreDestroyedBots();
		loadOnePlayer();
	}

	const startMultiPlayer = () => {
		game.difficulty = 0;
		loadMultiplayerMenu();

		if(parseInt(game.high_num.innerHTML) <= game.playerOnePoints*10) {
			game.high_num.innerHTML = game.playerOnePoints*10;
		}

		document.addEventListener("keydown", events.handleKeydown, false);
		document.addEventListener("keyup", events.handleKeyUp, false);
	}

	const loadMultiplayer = (name, color) => {

		let plr = {};
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
		game.canvas.setAttribute('tabindex','0');
		game.canvas.focus();
		game.socket.on('player-created', function(data) {
			game.currentPlayer = data.newPlayer;
			game.mpCurrentId = data.newPlayer.id;
			game.mpPlayers = data.players;
			game.mpWorld = data.world;
			mWorld.draw(game.mpWorld);
		});
		multiPlayer.init();
	   	document.getElementById('resetGameButton').addEventListener('click', () => {
	   		console.log('test');
	   		game.socket.emit('game-restart');
	   		
	   		location.reload();
	   	});
	}

	const loadOnePlayer = () => {
		if (game.playerOneLives <= 0) {
			singlePlayer.ai.bots = [];
			return gameOver();
		}
		if (game.newRound) {
			game.newRound = false;
			game.round_display.innerHTML = game.round;
			game.difficulty+=.2;
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

			if(game.round >= 5) {
				return youWin();
			}
		}
		game.bots_on_screen = game.bots_destroyed;
		game.bots_loaded = game.bots_on_screen;
		game.playerOneLives--;
		display_lives[game.playerOneLives].style.display = 'none';
		restoreOnScreenBots();
		let posX = [100, 200, 440, 560]
		game.x = posX[Math.floor(Math.random()*4)];
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
			game.canvas.setAttribute('tabindex','0');
			game.canvas.focus();
			tank.moving_up(game.x, game.y);
			game.tankDirection = 'up'
			draw.start();
		}
	}

	const restoreOnScreenBots = () => {
		[...game.display_bots].forEach((bot) => {
			if(bot.classList.contains('on_screen')) {
				bot.classList.remove('on_screen');
			}
		})		
	}
	const restoreDestroyedBots = () => {
		[...game.display_bots].forEach((bot) => {
			if(bot.style.visibility == 'hidden') {
				bot.style.visibility = 'visible';
			}
		})
	}

	const restorePlayerOneLives = () => {
		[...display_lives].forEach((life) => {
			life.style.display = 'block';
		});
	}

	const youWin = () => {
		display.innerHTML = '<div id="win" class="display_text__1player_win">' 
		+ 'You Won the Game!</div>';
		const win = document.getElementById('win');
		win.addEventListener('click', control);
	}

	const gameOver = () => {
		display.innerHTML = '<div id="win" class="display_text__1player_win">' 
		+ 'Game Over!</div>';
		const win = document.getElementById('win');
		win.addEventListener('click', control);
		game.bullets = [];
		game.bots_destroyed = 0;
		game.bots_on_screen = 0;
		game.playerOnePoints = 0;
		game.score_num.innerHTML = game.playerOnePoints*10;
		restorePlayerOneLives();
		restoreOnScreenBots();
		restoreDestroyedBots();
	}

	const loadMultiplayerMenu = () => {
		display.innerHTML = '<div class="display_text__multiplayerMenu"><input id="mpName"'
			+ ' type="text" placeholder="Username"><select id="mpColor" name="mpColor">'
			+ '<option value="#76ff03">neon green</option>'
			+ '<option value="#7b1fa2">purple</option>'
			+ '<option value="#03a9f4">blue</option>'
			+ '<option value="#e91e63">pink</option>'
  			+ '</select><button id="mpSubmit">Enter</button></div>';
		let mpForm = document.getElementById('mpSubmit');
		let color = document.getElementById('mpColor').value;
		mpForm.addEventListener('click', mpFormSubmit);
	}

	const mpFormSubmit = () => {
		let name = document.getElementById('mpName').value;
		let color = document.getElementById('mpColor').value;
		display.innerHTML = '';
		loadMultiplayer(name, color);
	}

	return {
		control: control,
		loadOnePlayer: loadOnePlayer
	};
});
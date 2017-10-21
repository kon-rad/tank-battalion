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
		mWorld.data = mWorld.org.slice();
		mWorld.draw();
	}

	const loading = () => {
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		mWorld.draw();
		if (game.bool) {
			game.bool = false;
			tank.moving_up();
		} else {
			game.bool = true;

		}
	}

	const startOnePlayer = () => {
		game.stop = false;
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
		game.stop = false;
		game.round = 1;
		game.round_display.innerHTML = game.round;
		game.difficulty = 0;

		if(parseInt(game.high_num.innerHTML) <= game.playerOnePoints*10) {
			game.high_num.innerHTML = game.playerOnePoints*10;
		}

		mWorld.data = mWorld.org.slice();
		mWorld.draw();

		document.addEventListener("keydown", events.handleKeydown, false);
		document.addEventListener("keyup", events.handleKeyUp, false);

		game.x = 460;
		game.y = 580;
		game.stop = false;
		game.bullets = [];
		game.bullets_fired = false;

		audio.start.play();
		game.canvas.setAttribute('tabindex','0');
		game.canvas.focus();
		tank.moving_up();
		game.tankDirection = 'up';
		display.innerHTML = '';
		multiPlayer.init();

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
			mWorld.data = mWorld.org.slice();
			mWorld.draw();
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

		game.x = 460;
		game.y = 580;
		game.stop = false;
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
			tank.moving_up();
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
		const win= document.getElementById('win');
		win.addEventListener('click', control);
	}

	const gameOver = () => {
		display.innerHTML = '<div id="win" class="display_text__1player_win">' 
		+ 'Game Over!</div>';
		const win= document.getElementById('win');
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

	return {
		control: control,
		loadOnePlayer: loadOnePlayer
	};
});
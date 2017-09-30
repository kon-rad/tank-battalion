'use strict';

define([ 'game', 'events', 'audio', 'mWorld', 'tank', 'draw', 'singlePlayer'], 
	function ( game, events, audio, mWorld, tank, draw, singlePlayer) {

	const display = document.getElementById('display_text');
	const display_lives = document.getElementsByClassName('score__lives_tank');

	const control = () => {

		display.innerHTML = '<div class="display_text__1player">' 
		+ 'START GAME</div>';
		const onePlayer = document.getElementsByClassName('display_text__1player')[0];
		onePlayer.addEventListener('click', startOnePlayer);
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

	const loadOnePlayer = () => {
		if (game.playerOneLives <= 0) {
			return gameOver();
		}
		if (game.newRound) {
			game.newRound = false;
			game.round_display.innerHTML = game.round;
			game.difficulty+=.2;
			game.playerOneLives = 3;
			game.bots_destroyed = 0;
			game.bots_on_screen = 0;
			restorePlayerOneLives();
			restoreOnScreenBots();
			restoreDestroyedBots();
			if(game.round >= 5) {
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
	}

	return {
		control: control,
		loadOnePlayer: loadOnePlayer
	};
});
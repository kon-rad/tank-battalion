'use strict';

define([ 'game', 'events', 'audio', 'mWorld', 'tank', 'draw', 'singlePlayer'], 
	function ( game, events, audio, mWorld, tank, draw, singlePlayer) {

	const display = document.getElementById('display_text');

	const control = () => {

		display.innerHTML = '<div class="display_text__1player">' 
		+ '1 PLAYER</div><br><div class="display_text__2player">' 
		+ '2 PLAYER</div>';
		const onePlayer = document.getElementsByClassName('display_text__1player')[0];
		const twoPlayer = document.getElementsByClassName('display_text__2player')[0];
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
		game.onePlayerBegin = true;
		game.playerOneLives = 2;
		loadOnePlayer();
	}

	const loadOnePlayer = () => {
		game.playerOneLives--;
		if (game.playerOneLives <= 0) {
			return control();
		}
		game.x = 560;
		game.y = 20;
		game.stop = false;
		game.onePlayerBegin = true;
		display.innerHTML = '';
		var startGame = setInterval(loading, 100);
		setTimeout(clearLoading, 1000);

		function clearLoading() {
			clearInterval(startGame);
			document.addEventListener("keydown", events.handleKeydown, false);
			document.addEventListener("keyup", events.handleKeyUp, false);
			game.onePlayerBegin = false;
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

	return {
		control: control,
		loadOnePlayer: loadOnePlayer
	};
});
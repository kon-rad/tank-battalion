'use strict';

define([ 'game', 'events', 'audio', 'mWorld', 'tank', 'draw'], 
	function ( game, events, audio, mWorld, tank, draw) {

	const display = document.getElementById('display_text');

	const control = () => {
		const startScreen = () => {
			game.context.fillStyle = '#000';
			game.context.fillRect(0, 0, game.cw, game.ch);
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

		const loadOnePlayer = () => {
			var startNow = false;
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
				audio.start.play();
				game.canvas.setAttribute('tabindex','0');
				game.canvas.focus();
				tank.moving_up();
				game.tankDirection = 'up'
				draw.start();
				game.onePlayerGame = setInterval(draw.start, 100);
			}
		}

		display.innerHTML = '<div class="display_text__1player">' 
		+ '1 PLAYER</div><br><div class="display_text__2player">' 
		+ '2 PLAYER</div>';
		const onePlayer = document.getElementsByClassName('display_text__1player')[0];
		const twoPlayer = document.getElementsByClassName('display_text__2player')[0];
		onePlayer.addEventListener('click', loadOnePlayer);
		startScreen();

	};

	return {
		control: control
	};
});
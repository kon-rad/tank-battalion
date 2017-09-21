'use strict';

define(['draw', 'game', 'events', 'audio', 'mWorld', 'tank'], 
	function (draw, game, events, audio, mWorld, tank) {

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
			console.log('loading');
		}

		const startOnePlayer = () => {
			var startNow = false;
			game.stop = false;
			game.onePlayerBegin = true;
			display.innerHTML = '';
			clearInterval(waiting);
			var startGame = setInterval(loading, 100);
			setTimeout(clearInterval(startGame), 1000);
			console.log('startOnePlayer');


			// draw.start();
			// setInterval(draw.start, 100);
		}

		const startTwoPlayer = () => {
			game.stop = false;
			game.twoPlayer = true;
			display.innerHTML = '';
			return false;
		}
		display.innerHTML = '<div class="display_text__1player">' 
		+ '1 PLAYER</div><br><div class="display_text__2player">' 
		+ '2 PLAYER</div>';
		const onePlayer = document.getElementsByClassName('display_text__1player')[0];
		const twoPlayer = document.getElementsByClassName('display_text__2player')[0];
		onePlayer.addEventListener('click', startOnePlayer);
		// TODO: add two player feature
		//twoPlayer.addEventListener('click', startTwoPlayer);
		var waiting = setInterval(startScreen, 100);

		// while (waiting) {
		// 	if (!game.stop) {
		// 		waiting = false;
		// 	}
		// 	loading();
		// }
		// loading();

		if(game.onePlayerBegin) {
			return 'single_player';
		} else {
			return 'two_player';
		}

	};

	const startGame = () => {
		document.addEventListener("keydown", events.handleKeydown, false);
		document.addEventListener("keyup", events.handleKeyUp, false);
		game.onePlayerBegin = false;
		audio.start.play();
		game.canvas.setAttribute('tabindex','0');
		game.canvas.focus();
	}

	const startScreen = () => {


		setInterval(loading, 100);
	}

	return {
		control: control,
		startGame: startGame,
		startScreen: startScreen
	};
});
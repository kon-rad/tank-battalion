'use strict';

define(['game', 'events', 'audio'], function (game, events, audio) {

	const display = document.getElementById('display_text');

	const control = () => {
		display.innerHTML = '<div class="display_text__1player">' 
		+ '1 PLAYER</div><br><div class="display_text__2player">' 
		+ '2 PLAYER</div>';
		const onePlayer = document.getElementsByClassName('display_text__1player')[0];
		const twoPlayer = document.getElementsByClassName('display_text__2player')[0];
		onePlayer.addEventListener('click', startOnePlayer);
		// TODO: add two player feature
		//twoPlayer.addEventListener('click', startTwoPlayer);

		return true;
	};

	const startOnePlayer = () => {
		game.stop = false;
		game.onePlayerBegin = true;
		display.innerHTML = '';
		return false;
	}
	const startTwoPlayer = () => {
		game.stop = false;
		game.twoPlayer = true;
		display.innerHTML = '';
		return false;
	}

	const startGame = () => {
		document.addEventListener("keydown", events.handleKeydown, false);
		document.addEventListener("keyup", events.handleKeyUp, false);
		game.onePlayerBegin = false;
		audio.start.play();
		game.canvas.setAttribute('tabindex','0');
		game.canvas.focus();
	}

	return {
		control: control,
		startGame: startGame
	};
});
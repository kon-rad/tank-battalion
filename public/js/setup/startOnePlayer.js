'use strict';

define(['game', 'audio', 'events', 'draw'], function (game, audio, events, draw) {

	var init = function init() {
		console.log(draw);

		console.log('inside sop return');
		document.addEventListener("keydown", events.handleKeydown, false);
		document.addEventListener("keyup", events.handleKeyUp, false);
		game.onePlayerBegin = false;
		audio.start.play();
		game.canvas.setAttribute('tabindex', '0');
		game.canvas.focus();
		draw.start();
		setInterval(draw.start, 100);
		// var onePlayerGame = setInterval(draw.start, 100);
		// return onePlayerGame;			
	};

	return {
		init: init
	};
});
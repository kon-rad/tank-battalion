'use strict';

define(function() {

	const game = {};
	game.canvas = document.getElementById('tank');
	game.context = game.canvas.getContext('2d');
	game.cw = game.canvas.width;
	game.ch = game.canvas.height;
	game.tankDirection = false;
	game.moving = false;
	game.bullets = [];
	game.stop = true;
	game.onePlayerBegin = false;
	game.twoPlayerBegin = false;
	game.bool = true;
	game.time = 0;
	game.playerOnePoints = 0;
	game.playerOneLives = 0;
	game.timer = setInterval(function(){
		game.time += 100;
	}, 100);

	// set focus to canvas
	game.canvas.setAttribute('tabindex','0');
	game.canvas.focus();
	game.x = 190;
	game.y = 20;
	return game;

})


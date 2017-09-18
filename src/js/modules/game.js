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

	// set canvas to be a tab stop (necessary to give it focus)
	game.canvas.setAttribute('tabindex','0');
	// set focus to the canvas
	game.canvas.focus();
	game.x = 400;
	game.y = 200;
	return game;

})


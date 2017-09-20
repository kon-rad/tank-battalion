'use strict';

define(function () {

	var game = {};
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
	game.bool = false;

	// set focus to canvas
	game.canvas.setAttribute('tabindex', '0');
	game.canvas.focus();
	game.x = 190;
	game.y = 490;
	return game;
});
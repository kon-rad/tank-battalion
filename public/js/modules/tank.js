'use strict';

define(['game'], function (game) {

	var tank = {};

	tank.drawTank = function () {
		game.context.fillStyle = '#004a00';
		game.context.fillRect(game.x - 10, game.y - 10, 20, 20);
		game.context.fillStyle = 'green';
		game.context.fillRect(game.x, game.y, 14, 14);
		game.context.fillRect(game.x, game.y, 4, 10);
		game.context.fillRect(game.x, game.y, 6, 24);
		game.context.fillRect(game.x, game.y, 6, 24);
	};

	tank.moving_up = function () {
		game.context.fillStyle = '#004a00';
		game.context.fillRect(game.x - 10, game.y - 10, 20, 20);
		game.context.fillStyle = 'green';
		game.context.fillRect(game.x - 10, game.y - 10, 14, 14);
		game.context.fillRect(game.x - 2, game.y - 18, 4, 10);
		game.context.fillRect(game.x - 3, game.y - 20, 6, 3);
		game.context.fillRect(game.x - 12, game.y - 12, 6, 24);
		game.context.fillRect(game.x + 6, game.y - 12, 6, 24);
	};
	tank.moving_down = function () {
		game.context.fillStyle = '#004a00';
		game.context.fillRect(game.x - 10, game.y - 10, 20, 20);
		game.context.fillStyle = 'green';
		game.context.fillRect(game.x - 10, game.y - 10, 14, 14);
		game.context.fillRect(game.x - 2, game.y + 10, 4, 10);
		game.context.fillRect(game.x - 3, game.y + 20, 6, 3);
		game.context.fillRect(game.x - 12, game.y - 12, 6, 24);
		game.context.fillRect(game.x + 6, game.y - 12, 6, 24);
	};
	tank.moving_right = function () {
		game.context.fillStyle = '#004a00';
		game.context.fillRect(game.x - 10, game.y - 10, 20, 20);
		game.context.fillStyle = 'green';
		game.context.fillRect(game.x - 10, game.y - 10, 14, 14);
		game.context.fillRect(game.x + 8, game.y - 2, 12, 4);
		game.context.fillRect(game.x + 20, game.y - 4, 3, 8);
		game.context.fillRect(game.x - 12, game.y - 12, 24, 6);
		game.context.fillRect(game.x - 12, game.y + 8, 24, 6);
		game.context.fillStyle = '#004a00';
		game.context.fillRect(game.x - 12, game.y + 14, 24, 2);
	};
	tank.moving_left = function () {
		game.context.fillStyle = '#004a00';
		game.context.fillRect(game.x - 10, game.y - 10, 20, 20);
		game.context.fillStyle = 'green';
		game.context.fillRect(game.x - 4, game.y - 10, 14, 14);
		game.context.fillRect(game.x - 20, game.y - 2, 12, 4);
		game.context.fillRect(game.x - 22, game.y - 4, 3, 8);
		game.context.fillRect(game.x - 12, game.y - 12, 24, 6);
		game.context.fillRect(game.x - 12, game.y + 8, 24, 6);
		game.context.fillStyle = '#004a00';
		game.context.fillRect(game.x - 12, game.y + 14, 24, 2);
	};

	return tank;
});
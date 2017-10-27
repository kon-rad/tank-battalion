'use strict';

define(['game'], function (game) {

	var tank = {};

	tank.moving_up = function (x, y, color) {
		if (color == undefined) {
			color = 'green';
		}
		game.context.fillStyle = color;
		game.context.fillRect(x - 8, y - 8, 14, 14);
		game.context.fillRect(x - 2, y - 18, 4, 12);
		game.context.fillRect(x - 3, y - 20, 6, 3);
		game.context.fillRect(x - 12, y - 12, 6, 24);
		game.context.fillRect(x + 6, y - 12, 6, 24);
	};
	tank.moving_down = function (x, y, color) {
		if (color == undefined) {
			color = 'green';
		}
		game.context.fillStyle = color;
		game.context.fillRect(x - 8, y - 7, 14, 14);
		game.context.fillRect(x - 2, y + 6, 4, 12);
		game.context.fillRect(x - 3, y + 18, 6, 3);
		game.context.fillRect(x - 12, y - 12, 6, 24);
		game.context.fillRect(x + 6, y - 12, 6, 24);
	};
	tank.moving_right = function (x, y, color) {
		if (color == undefined) {
			color = 'green';
		}
		game.context.fillStyle = color;
		game.context.fillRect(x - 7, y - 6, 14, 14);
		game.context.fillRect(x + 7, y - 2, 12, 4);
		game.context.fillRect(x + 20, y - 4, 3, 8);
		game.context.fillRect(x - 12, y - 12, 24, 6);
		game.context.fillRect(x - 12, y + 8, 24, 6);
	};
	tank.moving_left = function (x, y, color) {
		if (color == undefined) {
			color = 'green';
		}
		game.context.fillStyle = color;
		game.context.fillRect(x - 8, y - 6, 14, 14);
		game.context.fillRect(x - 20, y - 2, 12, 4);
		game.context.fillRect(x - 22, y - 4, 3, 8);
		game.context.fillRect(x - 12, y - 12, 24, 6);
		game.context.fillRect(x - 12, y + 8, 24, 6);
	};

	return tank;
});
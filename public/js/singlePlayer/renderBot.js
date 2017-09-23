'use strict';

define(['game', 'tank', 'bullets', 'mWorld', 'mwObstacle', 'images', 'audio', 'singlePlayer', 'renderBot'], function (game, tank, bullets, mWorld, mwObstacle, images, audio, singlePlayer, renderBot) {

	var bot = {};

	bot.drawBot = function (x, y) {
		game.context.fillStyle = '#004a00';
		game.context.fillRect(x - 10, game.y - 10, 20, 20);
		game.context.fillStyle = 'blue';
		game.context.fillRect(x, y, 14, 14);
		game.context.fillRect(x, y, 4, 10);
		game.context.fillRect(x, y, 6, 24);
		game.context.fillRect(x, y, 6, 24);
	};

	bot.moving_up = function (x, y) {
		game.context.fillStyle = '#004a00';
		game.context.fillRect(x - 10, y - 10, 20, 20);
		game.context.fillStyle = 'blue';
		game.context.fillRect(x - 10, y - 10, 14, 14);
		game.context.fillRect(x - 2, y - 18, 4, 10);
		game.context.fillRect(x - 3, y - 20, 6, 3);
		game.context.fillRect(x - 12, y - 12, 6, 24);
		game.context.fillRect(x + 6, y - 12, 6, 24);
	};
	bot.moving_down = function (x, y) {
		game.context.fillStyle = '#004a00';
		game.context.fillRect(x - 10, y - 10, 20, 20);
		game.context.fillStyle = 'blue';
		game.context.fillRect(x - 10, y - 10, 14, 14);
		game.context.fillRect(x - 2, y + 10, 4, 10);
		game.context.fillRect(x - 3, y + 20, 6, 3);
		game.context.fillRect(x - 12, y - 12, 6, 24);
		game.context.fillRect(x + 6, y - 12, 6, 24);
	};
	bot.moving_right = function (x, y) {
		game.context.fillStyle = '#004a00';
		game.context.fillRect(x - 10, y - 10, 20, 20);
		game.context.fillStyle = 'blue';
		game.context.fillRect(x - 10, y - 10, 14, 14);
		game.context.fillRect(x + 8, y - 2, 12, 4);
		game.context.fillRect(x + 20, y - 4, 3, 8);
		game.context.fillRect(x - 12, y - 12, 24, 6);
		game.context.fillRect(x - 12, y + 8, 24, 6);
		game.context.fillStyle = '#004a00';
		game.context.fillRect(x - 12, y + 14, 24, 2);
	};
	bot.moving_left = function (x, y) {
		game.context.fillStyle = '#004a00';
		game.context.fillRect(x - 10, y - 10, 20, 20);
		game.context.fillStyle = 'blue';
		game.context.fillRect(x - 4, y - 10, 14, 14);
		game.context.fillRect(x - 20, y - 2, 12, 4);
		game.context.fillRect(x - 22, y - 4, 3, 8);
		game.context.fillRect(x - 12, y - 12, 24, 6);
		game.context.fillRect(x - 12, y + 8, 24, 6);
		game.context.fillStyle = '#004a00';
		game.context.fillRect(x - 12, y + 14, 24, 2);
	};

	var render = function render(bot_i) {
		if (bot_i.dir == 'up') {
			return bot.moving_up(bot_i.x, bot_i.y);
		} else if (bot_i.dir == 'down') {
			return bot.moving_down(bot_i.x, bot_i.y);
		} else if (bot_i.dir == 'right') {
			return bot.moving_right(bot_i.x, bot_i.y);
		} else if (bot_i.dir == 'left') {
			return bot.moving_left(bot_i.x, bot_i.y);
		}
	};

	return {
		render: render
	};
});
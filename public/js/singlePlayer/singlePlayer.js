'use strict';

define(['game', 'bullets', 'mwObstacle', 'audio'], function (game, bullets, mwObstacle, audio) {

	var ai = {};
	ai.elapsedTime = game.time;
	ai.bots = [];
	ai.dir = ['up', 'down', 'right', 'left'];

	var loadBot = function loadBot() {
		var dir = game.time % 2 == 0 ? 'right' : 'left';
		var bot = {
			id: game.time + '',
			index: ai.bots.length,
			dir: 'right',
			moving: true,
			x: 520,
			y: 20,
			bullets: []
		};
		ai.bots.push(bot);
	};

	var init = function init() {
		console.log('ai here');
		setTimeout(loadBot, 500);
		var loading = setInterval(function () {
			loadBot();
			if (ai.bots.length >= 10) {
				clearInterval(loading);
			}
		}, 7000);
		var botEngine = setInterval(function () {
			ai.bots.forEach(function (bot) {
				if (bot.moving) {
					if (bot.dir == 'up') {
						if (detect(bot.x, bot.y - 16, bot.index)) {
							bot.y += 8;
							bot.dir = 'down';
						} else if (mwObstacle.detect(bot.x, bot.y - 16, bot.dir)) {
							bot.y += 6;
							bot.dir = ai.dir[Math.floor(Math.random() * 4)];
						} else {
							bot.y -= 6;
							if (shootBool()) {
								shootBullet(bot.x, bot.y, bot.index, bot.dir);
							}
						}
					} else if (bot.dir == 'down') {
						if (detect(bot.x, bot.y + 16, bot.index)) {
							bot.y -= 8;
							bot.dir = 'up';
						} else if (mwObstacle.detect(bot.x, bot.y + 16, bot.dir)) {
							bot.y -= 6;
							bot.dir = ai.dir[Math.floor(Math.random() * 4)];
						} else {
							bot.y += 6;
							if (shootBool()) {
								shootBullet(bot.x, bot.y, bot.index, bot.dir);
							}
						}
					} else if (bot.dir == 'right') {
						if (detect(bot.x + 16, bot.y, bot.index)) {
							bot.x -= 8;
							bot.dir = 'left';
						} else if (mwObstacle.detect(bot.x + 16, bot.y, bot.dir)) {
							bot.x -= 6;
							bot.dir = ai.dir[Math.floor(Math.random() * 4)];
						} else {
							bot.x += 6;
							if (shootBool()) {
								shootBullet(bot.x, bot.y, bot.index, bot.dir);
							}
						}
					} else if (bot.dir == 'left') {
						if (detect(bot.x - 16, bot.y, bot.index)) {
							bot.x += 8;
							bot.dir = 'right';
						} else if (mwObstacle.detect(bot.x - 16, bot.y, bot.dir)) {
							bot.x += 6;
							bot.dir = ai.dir[Math.floor(Math.random() * 4)];
						} else {
							bot.x -= 6;
							if (shootBool()) {
								shootBullet(bot.x, bot.y, bot.index, bot.dir);
							}
						}
					}
				}
			});
		}, 100);
	};

	var detect = function detect(x, y, index) {
		var collision = false;
		var len = ai.bots.length;
		x = Math.floor(x / 10);
		y = Math.floor(y / 10);
		for (var k = 0; k < len; k++) {
			var b = ai.bots[k];
			var b_x = Math.floor(b.x / 10);
			var b_y = Math.floor(b.y / 10);
			if (b.moving && (x == b_x || x == b_x + 1 || x == b_x - 1) && (y == b_y || y == b_y + 1 || y == b_y - 1) && k != index) {
				collision = true;
				break;
			}
		}
		if (collision) return true;
		return false;
	};

	var shootBool = function shootBool() {
		var random = Math.floor(Math.random() * 30);
		return random === 0;
	};

	var shootBullet = function shootBullet(b_x, b_y, i, b_dir) {
		if (b_dir == 'up') b_y -= 20;else if (b_dir == 'down') b_y += 20;else if (b_dir == 'right') b_x += 20;else if (b_dir == 'left') b_x -= 20;

		var bullet = {
			x: b_x,
			y: b_y,
			dir: b_dir
		};

		ai.bots[i].bullets.push(bullet);
	};

	return {
		init: init,
		botsArr: ai.bots
	};
});
'use strict';

define(['game', 'tank', 'bullets', 'mWorld', 'mwObstacle', 'images', 'audio', 'singlePlayer', 'renderBot'], function (game, tank, bullets, mWorld, mwObstacle, images, audio, singlePlayer, renderBot) {

	var start = function start() {
		console.log('start');
		game.onePlayerGame = setInterval(go, 100);
	};

	var go = function go() {
		if (game.newGame) {
			game.newGame = false;
			clearInterval(game.onePlayerGame);
			clearInterval(game.bots);
			clearInterval(game.loadBots);
			require(['setup'], function (setup) {
				setup.loadOnePlayer();
			});
		}
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		mWorld.draw();

		game.context.drawImage(images.eagle, 274, 566);
		if (bullets.renderExplosion) {
			game.context.drawImage(images.explosion, bullets.renderExplosion_x - 10, bullets.renderExplosion_y - 10);
			bullets.renderExplosion = false;
		}

		game.context.fillStyle = 'green';
		if (game.tankDirection == 'up') {
			if (game.moving) {
				if (!mwObstacle.detect(game.x, game.y - 10, game.tankDirection)) {
					game.y -= 6;
				}
			}
			tank.moving_up();
		} else if (game.tankDirection == 'down') {
			if (game.moving) {
				if (!mwObstacle.detect(game.x, game.y + 10, game.tankDirection)) {
					game.y += 6;
				}
			}
			tank.moving_down();
		} else if (game.tankDirection == 'right') {
			if (game.moving) {
				if (!mwObstacle.detect(game.x + 15, game.y, game.tankDirection)) {
					game.x += 6;
				}
			}
			tank.moving_right();
		} else if (game.tankDirection == 'left') {
			if (game.moving) {
				if (!mwObstacle.detect(game.x - 15, game.y, game.tankDirection)) {
					game.x -= 6;
				}
			}
			tank.moving_left();
		}

		game.bullets.forEach(function (item, index) {
			bullets.render_bullet(item, index);
		});

		var bots = singlePlayer.ai.bots;
		bots.forEach(function (bot, bot_index) {
			if (bot.moving) {
				renderBot.render(bot);
			}
			bot.bullets.forEach(function (bullet, bullet_index) {
				renderBot.render_bullet(bullet, bullet_index, bot_index);
			});
		});
	};

	return {
		start: start,
		go: go
	};
});
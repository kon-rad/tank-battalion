'use strict';

define(['game', 'tank', 'bullets', 'mWorld', 'mwObstacle', 'images', 'setup', 'audio'], function (game, tank, bullets, mWorld, mwObstacle, images, setup, audio) {

	var start = function start(action) {
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		mWorld.draw();
		if (game.stop) {
			return true;
		} else if (game.onePlayerBegin) {
			game.moving = false;
			tank.flashing_right(game.bool);
			if (game.bool) game.bool = false;else game.bool = true;
			audio.start.play();
			setTimeout(setup.startGame, 2000);
		}

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
	};

	return {
		start: start
	};
});
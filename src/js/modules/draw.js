'use strict';

define(['game', 'tank', 'bullets', 'mWorld', 'mwObstacle', 'images', 'audio', 'singlePlayer', 'renderBot'], 
	function(game, tank, bullets, mWorld, mwObstacle, images, audio, singlePlayer, renderBot) {

	const start = () => {
		game.onePlayerGame = setInterval(go, 100);
	};

	const go = () => {
		// Handles game ending, starts new game
		if(game.newGame) {
			// game.explosion decides if to render an explosion
			if(game.explosion) {
				game.context.drawImage(images.explosion, (game.x)-10, (game.y)-10);
				game.explosion = false;
			}

			// clear repeating interval functions; reset game
			game.newGame = false;
			clearInterval(game.onePlayerGame);
			clearInterval(game.bots);
			clearInterval(game.loadBots);

			require(['setup'], function(setup) {
				setup.loadOnePlayer();
			})
		}
		if (game.pause) {
			clearInterval(game.onePlayerGame);
			clearInterval(game.bots);
			clearInterval(game.loadBots);
			game.checkGameUnpaused = setInterval(() => {
				if (game.pause) return;
				singlePlayer.init();
				start();
			}, 1000);

		}
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);

		// renders map in current state
		mWorld.draw(game.worldData);

		game.context.drawImage(images.eagle, 274, 566);
		if(bullets.renderExplosion) {
			game.context.drawImage(images.explosion, bullets.renderExplosion_x-10, bullets.renderExplosion_y-10);
			bullets.renderExplosion = false;
		}

		game.context.fillStyle = 'green';

		// renders tank and moves if game.moving is true
    moveTank();

		game.bullets.forEach(function(item, index) {
			bullets.render_bullet(item, index);
		});

		let bots = singlePlayer.ai.bots;
		bots.forEach(function(bot, bot_index) {
			if(bot.moving) {
				renderBot.render(bot);
			}

			bot.bullets.forEach((bullet, bullet_index) => {
				renderBot.render_bullet(bullet, bullet_index, bot_index);
			});
		})
	};

	/**
	 * Move tank by one 'speed' increment if no obstacle is detected
	 */
	const moveTank = () => {
		let speed = game.playerOneSpeed;

		switch (game.tankDirection) {
			case 'up':
        if (game.moving && !mwObstacle.detect(game.x, game.y-15, game.tankDirection, game.worldData)) {
          game.y -= speed;
        }
        tank.moving_up(game.x, game.y);
        break;
      case 'down':
        if (game.moving && !mwObstacle.detect(game.x, game.y+15, game.tankDirection, game.worldData)) {
          game.y += speed;
        }
        tank.moving_down(game.x, game.y);
        break;
      case 'right':
        if (game.moving && !mwObstacle.detect(game.x+15, game.y, game.tankDirection, game.worldData)) {
          game.x += speed;
        }
        tank.moving_right(game.x, game.y);
        break;
      case 'left':
        if (game.moving && !mwObstacle.detect(game.x-15, game.y, game.tankDirection, game.worldData)) {
          game.x -= speed;
        }
        tank.moving_left(game.x, game.y);
        break;
		}
	};


	return {
		start: start,
		go: go
	};
});
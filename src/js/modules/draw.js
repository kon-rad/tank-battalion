'use strict';

define(['game', 'tank', 'bullets', 'mWorld', 'mwObstacle', 'images', 'audio', 'singlePlayer', 'renderBot'], 
	function(game, tank, bullets, mWorld, mwObstacle, images, audio, singlePlayer, renderBot) {

	const start = () => {
		game.onePlayerGame = setInterval(go, 100);
	}

	const go = () => {
		if(game.newGame) {
			if(game.explosion) {
				game.context.drawImage(images.explosion, (game.x)-10, (game.y)-10);
				game.explosion = false;
			}
			game.newGame = false;
			clearInterval(game.onePlayerGame);
			clearInterval(game.bots);
			clearInterval(game.loadBots);
			require(['setup'], function(setup) {
				setup.loadOnePlayer();

			})
		}
		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		let speed = game.playerOneSpeed;
		mWorld.draw(game.worldData);

		game.context.drawImage(images.eagle, 274, 566);
		if(bullets.renderExplosion){
			game.context.drawImage(images.explosion, bullets.renderExplosion_x-10, bullets.renderExplosion_y-10);
			bullets.renderExplosion = false;
		}

		game.context.fillStyle = 'green';
		if(game.tankDirection == 'up') {
			if(game.moving) {
				if(!mwObstacle.detect(game.x, game.y-10, game.tankDirection, game.worldData)){
					game.y -= speed; 
				}
			}
			tank.moving_up(game.x, game.y);
		} else if(game.tankDirection == 'down') {
			if(game.moving) {
				if(!mwObstacle.detect(game.x, game.y+10, game.tankDirection, game.worldData)) {
					game.y += speed;
				}  
			}
			tank.moving_down(game.x, game.y);
		} else if(game.tankDirection == 'right') {
			if(game.moving) {
				if (!mwObstacle.detect(game.x+15, game.y, game.tankDirection, game.worldData)) {
					game.x += speed; 
				}
			} 
			tank.moving_right(game.x, game.y);
		} else if(game.tankDirection == 'left') {
			if(game.moving) {
				if (!mwObstacle.detect(game.x-15, game.y, game.tankDirection, game.worldData)) {
					game.x -= speed;
				}
			}
			tank.moving_left(game.x, game.y);
		}

		game.bullets.forEach(function(item, index) {
			bullets.render_bullet(item, index);
		});

		let bots = singlePlayer.ai.bots;
		bots.forEach(function(bot, bot_index){
			if(bot.moving) {
				renderBot.render(bot);
			}
			bot.bullets.forEach((bullet, bullet_index) => {
				renderBot.render_bullet(bullet, bullet_index, bot_index);
			});
		})
	}


	return {
		start: start,
		go: go
	};
});
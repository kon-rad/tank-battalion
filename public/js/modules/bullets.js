'use strict';

define(['game', 'mWorld', 'audio', 'images', 'singlePlayer'], function (game, mWorld, audio, images, singlePlayer) {

	var display_bots = document.getElementsByClassName('score__enemy_tank');
	var bullets = {};
	bullets.fired = false;
	bullets.renderExplosion = false;
	bullets.renderExplosion_x;
	bullets.renderExplosion_y;
	bullets.render_bullet = function (bullet, b_i) {
		switch (bullet.dir) {
			case 'up':
				bullet.y -= 8;
				break;
			case 'down':
				bullet.y += 8;
				break;
			case 'right':
				bullet.x += 8;
				break;
			case 'left':
				bullet.x -= 8;
				break;
		}
		if (checkBulletCollision(bullet.x, bullet.y, b_i, bullet.dir)) {
			bullets.fired = false;
			audio.explode.load();
			audio.explode.play();
		}
		game.context.beginPath();
		game.context.fillStyle = 'red';
		game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
		game.context.fill();
		game.context.closePath();
	};

	bullets.fire_bullet = function (x, y, tankDirection) {
		if (tankDirection == 'up') y -= 20;else if (tankDirection == 'down') y += 20;else if (tankDirection == 'right') x += 20;else if (tankDirection == 'left') x -= 20;
		var bullet = {
			'x': x,
			'y': y,
			'dir': tankDirection
		};

		game.bullets.push(bullet);
	};

	var checkBulletCollision = function checkBulletCollision(x, y, b_i, dir) {
		y = Math.floor(y / 10);
		x = Math.floor(x / 10);
		if (x <= 0 || x >= 60 || y <= 0 || y >= 60) {
			game.bullets.splice(b_i, 1);
			return true;
		}
		var row = mWorld.data[y];
		row = row.split('');
		var pos = Number(row[x]);
		if (pos) {
			game.bullets.splice(b_i, 1);
			row[x] = '0';
			if (dir == 'up' || dir == 'down') {
				row[x - 1] = '0';
				row[x + 1] = '0';
			} else if (dir == 'left' || dir == 'right') {
				eraseBlock(x, y - 1);
				eraseBlock(x, y + 1);
			}
			row = row.join('');
			mWorld.data[y] = row;
			bullets.renderExplosion = true;
			bullets.renderExplosion_x = x * 10;
			bullets.renderExplosion_y = y * 10;
			return true;
		}
		var len = singlePlayer.ai.bots.length;
		for (var k = 0; k < len; k++) {
			var b = singlePlayer.ai.bots[k];
			var b_x = Math.floor(b.x / 10);
			var b_y = Math.floor(b.y / 10);
			if (b.moving && (x == b_x || x == b_x + 1 || x == b_x - 1) && (y == b_y || y == b_y + 1 || y == b_y - 1)) {
				game.bullets.splice(b_i, 1);
				game.context.drawImage(images.bigRedExplosion, x * 10 - 10, y * 10 - 10);
				game.playerOnePoints++;
				game.bots_destroyed++;
				singlePlayer.ai.bots[k].moving = false;
				console.log('game.bots_destroyed-1', game.bots_destroyed - 1);
				game.display_bots[game.bots_destroyed - 1].style.visibility = 'hidden';
				game.score_num.innerHTML = game.playerOnePoints * 10;
				if (game.bots_destroyed >= 20) {
					game.newRound = true;
					game.round++;
					game.newGame = true;
				}
				return true;
			}
		}

		return false;
	};
	var eraseBlock = function eraseBlock(x, y) {
		var row = mWorld.data[y];
		row = row.split('');
		row[x] = '0';
		row = row.join('');
		mWorld.data[y] = row;
	};

	return bullets;
});
'use strict';

define(['game', 'audio', 'images'], function (game, audio, images) {

	var mpBullet = {};
	game.bullets_fired = false;
	mpBullet.renderExplosion = false;
	mpBullet.renderExplosion_x;
	mpBullet.renderExplosion_y;
	mpBullet.render_bullet = function (bullet) {
		var speed = 14;
		switch (bullet.dir) {
			case 'up':
				bullet.y -= speed;
				break;
			case 'down':
				bullet.y += speed;
				break;
			case 'right':
				bullet.x += speed;
				break;
			case 'left':
				bullet.x -= speed;
				break;
		}
		if (checkBulletCollision(bullet.x, bullet.y, bullet.dir)) {
			game.currentPlayer.bulletFired = false;
			audio.explode.load();
			audio.explode.play();
		}
		game.context.beginPath();
		game.context.fillStyle = 'red';
		game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
		game.context.fill();
		game.context.closePath();
	};

	mpBullet.render_mpBullet = function (bullet) {
		// let speed = 14;
		// switch(bullet.dir) {
		// 	case 'up':
		// 		bullet.y-=speed;
		// 		break;
		// 	case 'down':
		// 		bullet.y+=speed;
		// 		break;
		// 	case 'right':
		// 		bullet.x+=speed;
		// 		break;
		// 	case 'left':
		// 		bullet.x-=speed;
		// 		break;
		// }
		game.context.beginPath();
		game.context.fillStyle = 'red';
		game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
		game.context.fill();
		game.context.closePath();
	};

	mpBullet.fire_bullet = function (x, y, tankDirection) {
		if (tankDirection == 'up') y -= 20;else if (tankDirection == 'down') y += 20;else if (tankDirection == 'right') x += 20;else if (tankDirection == 'left') x -= 20;
		var bullet = {
			'x': x,
			'y': y,
			'dir': tankDirection
		};
		game.currentPlayer.bullet = bullet;
		game.socket.emit('game-state', { player: game.currentPlayer, world: game.mpWorld });
	};

	var checkBulletCollision = function checkBulletCollision(x, y, dir) {
		y = Math.floor(y / 10);
		x = Math.floor(x / 10);
		if (x <= 0 || x >= 60 || y <= 0 || y >= 60) {
			game.currentPlayer.bullet = {};
			return true;
		}
		var row = game.mpWorld[y];
		row = row.split('');
		var pos = Number(row[x]);
		if (pos) {
			game.currentPlayer.bullet = {};
			row[x] = '0';
			if (dir == 'up' || dir == 'down') {
				row[x - 1] = '0';
				row[x + 1] = '0';
			} else if (dir == 'left' || dir == 'right') {
				eraseBlock(x, y - 1);
				eraseBlock(x, y + 1);
			}
			row = row.join('');
			game.mpWorld[y] = row;
			mpBullet.renderExplosion = true;
			mpBullet.renderExplosion_x = x * 10;
			mpBullet.renderExplosion_y = y * 10;
			return true;
		}

		return false;
	};
	var eraseBlock = function eraseBlock(x, y) {
		var row = game.mpWorld[y];
		row = row.split('');
		row[x] = '0';
		row = row.join('');
		game.mpWorld[y] = row;
	};

	return mpBullet;
});
'use strict';

define(['game', 'audio', 'images'], function(game, audio, images) {

	const mpBullet = {};
	game.bullets_fired = false;
	mpBullet.renderExplosion = false;
	mpBullet.renderExplosion_x;
	mpBullet.renderExplosion_y;
	mpBullet.render_bullet = function(bullet) {
		let speed = 14;
		switch(bullet.dir) {
			case 'up':
				bullet.y-=speed;
				break;
			case 'down':
				bullet.y+=speed;
				break;
			case 'right':
				bullet.x+=speed;
				break;
			case 'left':
				bullet.x-=speed;
				break;
		}
		if (checkBulletCollision(bullet.x, bullet.y, bullet.dir)){
			game.currentPlayer.bulletFired = false;
			audio.explode.load();
			audio.explode.play();
		}
		game.context.beginPath();
		game.context.fillStyle = 'red';
		game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI*2);
		game.context.fill();
		game.context.closePath(); 
	}

	mpBullet.render_mpBullet = function(bullet) {
		game.context.beginPath();
		game.context.fillStyle = 'red';
		game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI*2);
		game.context.fill();
		game.context.closePath(); 
	}

	mpBullet.fireBullet = function() {
		if (game.currentPlayer.tankDirection === 'up') game.currentPlayer.y-=2;
		else if(game.currentPlayer.tankDirection ==='down') game.currentPlayer.y+=2;
		else if(game.currentPlayer.tankDirection ==='right') game.currentPlayer.x+=2;
		else if(game.currentPlayer.tankDirection ==='left') game.currentPlayer.x-=2;

		game.currentPlayer.bullet = {
      'x': game.currentPlayer.x,
      'y': game.currentPlayer.y,
      'dir': game.currentPlayer.tankDirection
    };
    game.currentPlayer.bulletFired = true;

		game.socket.emit('game-state', { player: game.currentPlayer, world: game.mpWorld });
	};

	const checkBulletCollision = (x, y, dir) => {
		y = Math.floor(y/10);
		x = Math.floor(x/10);
		if (x <= 0 || x >= 60 || y<=0 || y>= 60) {
			game.currentPlayer.bullet = {};
			return true;
		}
		let row = (game.mpWorld[y]);
		row = row.split('');
		let pos = Number(row[x]);
		if (pos) {
			game.currentPlayer.bullet = {};
			row[x] = '0';
			if(dir ==='up' || dir === 'down') {
				row[x-1] = '0';
				row[x+1] = '0';
			} else if (dir === 'left' || dir === 'right') {
				eraseBlock(x, y-1);
				eraseBlock(x, y+1);
			}
			row = row.join('');
			game.mpWorld[y] = row;
			mpBullet.renderExplosion = true;
			mpBullet.renderExplosion_x = (x*10);
			mpBullet.renderExplosion_y = (y*10);
			return true;
		}

		return false; 
	}
	const eraseBlock = (x, y) => {
		let row = game.mpWorld[y];
		row = row.split('');
		row[x] = '0';
		row = row.join('');
		game.mpWorld[y] = row;
	}

	return mpBullet;
});
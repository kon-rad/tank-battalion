'use strict';

define(['game', 'mWorld', 'audio', 'images'], function(game, mWorld, audio, images) {

	const bullets = {};
	bullets.fired = false;
	bullets.renderExplosion = false;
	bullets.renderExplosion_x;
	bullets.renderExplosion_y;
	bullets.render_bullet = function(bullet, b_i) {
		switch(bullet.dir) {
			case 'up':
				bullet.y-=8;
				break;
			case 'down':
				bullet.y+=8;
				break;
			case 'right':
				bullet.x+=8;
				break;
			case 'left':
				bullet.x-=8;
				break;
		}
		if(checkBulletCollision(bullet.x, bullet.y, b_i, bullet.dir)){
			bullets.fired = false;
			audio.explode.load();
			audio.explode.play();
		}
		game.context.beginPath();
		game.context.fillStyle = 'red';
		game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI*2);
		game.context.fill();
		game.context.closePath(); 
	}

	bullets.fire_bullet = function(x, y, tankDirection) {
		if (tankDirection == 'up') y-=20;
		else if(tankDirection =='down') y+=20;
		else if(tankDirection =='right') x+=20;
		else if(tankDirection =='left') x-=20;
		var bullet = {
			'x':x,
			'y':y,
			'dir':tankDirection
		}

		game.bullets.push(bullet);
	}

	const checkBulletCollision = (x, y, b_i, dir) => {
		y = Math.floor(y/10);
		x = Math.floor(x/10);
		if (x <= 0 || x >= 60 || y<=0 || y>= 60) {
			game.bullets.splice(b_i, 1);
			return true;
		}
		let row = (mWorld.data[y]);
		row = row.split('');
		let pos = Number(row[x]);
		if (pos) {
			game.bullets.splice(b_i, 1);
			row[x] = '0';
			if(dir =='up' || dir == 'down') {
				row[x-1] = '0';
				row[x+1] = '0';
			} else if (dir == 'left' || dir == 'right') {
				eraseBlock(x, y-1);
				eraseBlock(x, y+1);
			}
			row = row.join('');
			mWorld.data[y] = row;
			bullets.renderExplosion = true;
			bullets.renderExplosion_x = (x*10);
			bullets.renderExplosion_y = (y*10);
			return true;
		} 
		return false; 
	}
	const eraseBlock = (x, y) => {
		let row = mWorld.data[y];
		row = row.split('');
		row[x] = '0';
		row = row.join('');
		mWorld.data[y] = row;
	}

	return bullets;

});
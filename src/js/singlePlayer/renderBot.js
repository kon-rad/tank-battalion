'use strict';

define(['game', 'tank', 'bullets', 'mWorld', 'mwObstacle', 'images', 'audio', 'singlePlayer', 'renderBot' ], 
	function(game, tank, bullets, mWorld, mwObstacle, images, audio, singlePlayer, renderBot ) {



		const bot = {};

		bot.drawBot = (x, y) => {
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-10, game.y-10, 20, 20);
			game.context.fillStyle = 'blue';
			game.context.fillRect(x, y, 14, 14);
			game.context.fillRect(x, y, 4, 10);
			game.context.fillRect(x, y, 6, 24);
			game.context.fillRect(x, y, 6, 24);
		}

		bot.moving_up = (x, y) => {
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-10, y-10, 20, 20);
			game.context.fillStyle = 'blue';
			game.context.fillRect(x-10, y-10, 14, 14);
			game.context.fillRect(x-2, y-18, 4, 10);
			game.context.fillRect(x-3, y-20, 6, 3);
			game.context.fillRect(x-12, y-12, 6, 24);
			game.context.fillRect(x+6, y-12, 6, 24);
		}
		bot.moving_down = (x, y) => {
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-10, y-10, 20, 20);
			game.context.fillStyle = 'blue';
			game.context.fillRect(x-10, y-10, 14, 14);
			game.context.fillRect(x-2, y+10, 4, 10);
			game.context.fillRect(x-3, y+20, 6, 3);
			game.context.fillRect(x-12, y-12, 6, 24);
			game.context.fillRect(x+6, y-12, 6, 24);
		}
		bot.moving_right = (x, y) => {
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-10, y-10, 20, 20);
			game.context.fillStyle = 'blue';
			game.context.fillRect(x-10, y-10, 14, 14);
			game.context.fillRect(x+8, y-2, 12, 4);
			game.context.fillRect(x+20, y-4, 3, 8);
			game.context.fillRect(x-12, y-12, 24, 6);
			game.context.fillRect(x-12, y+8, 24, 6);
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-12, y+14, 24, 2);
		}
		bot.moving_left = (x, y) => {
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-10, y-10, 20, 20);
			game.context.fillStyle = 'blue';
			game.context.fillRect(x-4, y-10, 14, 14);
			game.context.fillRect(x-20, y-2, 12, 4);
			game.context.fillRect(x-22, y-4, 3, 8);
			game.context.fillRect(x-12, y-12, 24, 6);
			game.context.fillRect(x-12, y+8, 24, 6);
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-12, y+14, 24, 2);
		}


		const render_bullet = (bullet, bullet_index, bot_index) => {
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
			if(checkBulletCollision(bullet.x, bullet.y, bullet_index, bullet.dir, bot_index)){
				singlePlayer.ai.bots[bot_index].bullets.splice(bullet_index, 1);
				audio.explode.load();
				audio.explode.play();
			}
			game.context.beginPath();
			game.context.fillStyle = 'orange';
			game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI*2);
			game.context.fill();
			game.context.closePath(); 
		}


		const checkBulletCollision = (x, y, bullet_index, dir, bot_index) => {
			y = Math.floor(y/10);
			x = Math.floor(x/10);
			if (x <= 0 || x >= 60 || y<=0 || y>= 60) {
				singlePlayer.ai.bots[bot_index].bullets.splice(bullet_index, 1);
				audio.dud.load();
				audio.dud.play();
				return false;
			}
			let row = (mWorld.data[y]);
			row = row.split('');
			let pos = Number(row[x]);
			if (pos) {
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
			let player1_x = Math.floor(game.x/10);
			let player1_y = Math.floor(game.y/10);
			if((player1_x == x || player1_x-1 == x || player1_x+1 == x) 
				&& (player1_y == y || player1_y-1 == y || player1_y+1 == y)) {
				game.context.drawImage(images.bigRedExplosion, (x*10)-10, (y*10)-10);
				game.newGame = true;
				return true;
			}
			if((game.eagle1_x == x || game.eagle1_x-1 == x || game.eagle1_x+1 == x) 
				&& (game.eagle1_y == y || game.eagle1_y-1 == y || game.eagle1_y+1 == y)) {
				game.context.drawImage(images.bigRedExplosion, (x*10)-10, (y*10)-10);
				game.newGame = true;
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

		const render = (bot_i) => {
			if (bot_i.dir == 'up') {
				return bot.moving_up(bot_i.x, bot_i.y);
			} else if (bot_i.dir == 'down') {
				return bot.moving_down(bot_i.x, bot_i.y);
			} else if (bot_i.dir == 'right') {
				return bot.moving_right(bot_i.x, bot_i.y);
			} else if (bot_i.dir == 'left') {
				return bot.moving_left(bot_i.x, bot_i.y);
			}
		}

		return  {
			render: render,
			render_bullet: render_bullet
		}
});
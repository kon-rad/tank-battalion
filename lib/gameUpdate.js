'use strict';

 const gameUpdate = (gameState) => {

 	let len = gameState.players.length;

 	for(let i = 0; i < len; i++) {
		const checkBulletCollision = (x, y, dir) => {
			y = Math.floor(y/10);
			x = Math.floor(x/10);
			if (x <= 0 || x >= 60 || y<=0 || y>= 60) {
				gameState.players[i].bullet = {};
				return true;
			}
			let row = (gameState.world[y]);
			row = row.split('');
			let pos = Number(row[x]);
			if (pos) {
				gameState.players[i].bullet = {};
				row[x] = '0';
				if(dir =='up' || dir == 'down') {
					row[x-1] = '0';
					row[x+1] = '0';
				} else if (dir == 'left' || dir == 'right') {
					eraseBlock(x, y-1);
					eraseBlock(x, y+1);
				}
				row = row.join('');
				gameState.world[y] = row;
				let renderExplosion = {
					exe: true,
					x: (x*10),
					y: (y*10)
				}
				gameState.players[i].explosion = renderExplosion;
				return true;
			}

			let newLen = gameState.players.length;
			for(let k = 0; k<newLen; k++) {
				let p = gameState.players[k];
				if(p.id == gameState.players[i].id) {
					continue;
				}
				let p_x = Math.floor(p.x/10);
				let p_y = Math.floor(p.y/10);
				if((x == p_x || x == p_x+1 || x==p_x-1) && (y==p_y || y==p_y+1 || y==p_y-1)) {
					gameState.players[k].moving = false;
					gameState.players[k].hit = true;
					gameState.players[k].hits += 1;
					let renderExplosion = {
						exe: true,
						x: (x*10),
						y: (y*10)
					}
					gameState.players[i].explosion = renderExplosion;
					gameState.players[i].points += 1;
					return true;
				}
			}
			return false; 
		}
		const eraseBlock = (x, y) => {
			let row = gameState.world[y];
			row = row.split('');
			row[x] = '0';
			row = row.join('');
			gameState.world[y] = row;
		}	
 		if(gameState.players[i].bulletFired) {
			let speed = 5;
			switch(gameState.players[i].bullet.dir) {
				case 'up':
					gameState.players[i].bullet.y-=speed;
					break;
				case 'down':
					gameState.players[i].bullet.y+=speed;
					break;
				case 'right':
					gameState.players[i].bullet.x+=speed;
					break;
				case 'left':
					gameState.players[i].bullet.x-=speed;
					break;
			} 	
			if(checkBulletCollision(gameState.players[i].bullet.x, gameState.players[i].bullet.y, gameState.players[i].bullet.dir)) {
				gameState.players[i].bulletFired = false;
			}	
 		}
 	}
	return gameState;
 }

 module.exports = gameUpdate;
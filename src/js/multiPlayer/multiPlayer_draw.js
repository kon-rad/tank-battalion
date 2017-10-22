'use strict';

define(['game', 'tank', 'mWorld', 'mwObstacle', 'images', 'audio', 'multiPlayer_bullet'], 
	function(game, tank, mWorld, mwObstacle, images, audio, mpBullet) {

	const start = () => {
		game.multiPlayerGame = setInterval(go, 100);
		game.socket.on('send-game-state', (gameState) => {
			game.mpPlayers = gameState.players;
			game.mpWorld = gameState.world;
		})
	};

	const go = () => {

		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		mWorld.draw(game.mpWorld);
		game.context.drawImage(images.eagle, 274, 566);

		/**
		 * Render Current Player
		 */

		game.context.fillStyle = game.currentPlayer.color;
		if(game.currentPlayer.tankDirection == 'up') {
			if(game.currentPlayer.moving) {
				if(!mwObstacle.detect(game.currentPlayer.x, game.currentPlayer.y-10, game.currentPlayer.tankDir, game.mpWorld)){
					game.currentPlayer.y -= game.currentPlayer.speed; 
				}
			}
			tank.moving_up(game.currentPlayer.x, game.currentPlayer.y);
		} else if(game.currentPlayer.tankDirection == 'down') {
			if(game.currentPlayer.moving) {
				if(!mwObstacle.detect(game.currentPlayer.x, game.currentPlayer.y+10, game.currentPlayer.tankDir, game.mpWorld)) {
					game.currentPlayer.y += game.currentPlayer.speed;
				}  
			}
			tank.moving_down(game.currentPlayer.x, game.currentPlayer.y);
		} else if(game.currentPlayer.tankDirection == 'right') {
			if(game.currentPlayer.moving) {
				if (!mwObstacle.detect(game.currentPlayer.x+15, game.currentPlayer.y, game.currentPlayer.tankDir, game.mpWorld)) {
					game.currentPlayer.x += game.currentPlayer.speed; 
				}
			} 
			tank.moving_right(game.currentPlayer.x, game.currentPlayer.y);
		} else if(game.currentPlayer.tankDirection == 'left') {
			if(game.currentPlayer.moving) {
				if (!mwObstacle.detect(game.currentPlayer.x-15, game.currentPlayer.y, game.currentPlayer.tankDir, game.mpWorld)) {
					game.currentPlayer.x -= game.currentPlayer.speed;
				}
			}
			tank.moving_left(game.currentPlayer.x, game.currentPlayer.y);
		}

		if (game.currentPlayer.bulletFired) {
			mpBullet.render_bullet(game.currentPlayer.bullet);
		}

		let len = game.mpPlayers.length;

		for(let i = 0; i < len; i++) {
			if(game.mpPlayers[i].id === game.mpCurrentId)
				continue;

			game.context.fillStyle = game.mpPlayers[i].color;
			if(game.mpPlayers[i].tankDirection == 'up') {
				tank.moving_up(game.mpPlayers[i].x, game.mpPlayers[i].y);
			} else if(game.mpPlayers[i].tankDirection == 'down') {
				tank.moving_down(game.mpPlayers[i].x, game.mpPlayers[i].y);
			} else if(game.mpPlayers[i].tankDirection == 'right') {
				tank.moving_right(game.mpPlayers[i].x, game.mpPlayers[i].y);
			} else if(game.mpPlayers[i].tankDirection == 'left') {
				tank.moving_left(game.mpPlayers[i].x, game.mpPlayers[i].y);
			}
			if(game.mpPlayers[i].bulletFired) {
				mpBullet.render_mpBullet(game.mpPlayers[i].bullet);
			}
		}

		/*
		 * Send multiplayer data
		 */

		game.socket.emit('game-state', {player:game.currentPlayer, world:game.mpWorld});
		// game.socket.emit('player data', game.mpPlayers);
	};


	return {
		start: start,
		go: go
	};
});
'use strict';

define(['game', 'tank', 'bullets', 'mWorld', 'mwObstacle', 'images', 'audio'], 
	function(game, tank, bullets, mWorld, mwObstacle, images, audio) {

	const start = () => {
		game.multiPlayerGame = setInterval(go, 100);
		game.socket.on('send-game-state', (gameState) => {
			game.mpPlayers = gameState.players;
		})
	};

	const go = () => {

		game.context.fillStyle = '#000';
		game.context.fillRect(0, 0, game.cw, game.ch);
		mWorld.draw();
		game.context.drawImage(images.eagle, 274, 566);

		/**
		 * Render Current Player
		 */

		game.context.fillStyle = game.currentPlayer.color;
		if(game.currentPlayer.tankDirection == 'up') {
			if(game.currentPlayer.moving) {
				if(!mwObstacle.detect(game.currentPlayer.x, game.currentPlayer.y-10, game.currentPlayer.tankDir)){
					game.currentPlayer.y -= game.currentPlayer.speed; 
				}
			}
			tank.moving_up(game.currentPlayer.x, game.currentPlayer.y);
		} else if(game.currentPlayer.tankDirection == 'down') {
			if(game.currentPlayer.moving) {
				if(!mwObstacle.detect(game.currentPlayer.x, game.currentPlayer.y+10, game.currentPlayer.tankDir)) {
					game.currentPlayer.y += game.currentPlayer.speed;
				}  
			}
			tank.moving_down(game.currentPlayer.x, game.currentPlayer.y);
		} else if(game.currentPlayer.tankDirection == 'right') {
			if(game.currentPlayer.moving) {
				if (!mwObstacle.detect(game.currentPlayer.x+15, game.currentPlayer.y, game.currentPlayer.tankDir)) {
					game.currentPlayer.x += game.currentPlayer.speed; 
				}
			} 
			tank.moving_right(game.currentPlayer.x, game.currentPlayer.y);
		} else if(game.currentPlayer.tankDirection == 'left') {
			if(game.currentPlayer.moving) {
				if (!mwObstacle.detect(game.currentPlayer.x-15, game.currentPlayer.y, game.currentPlayer.tankDir)) {
					game.currentPlayer.x -= game.currentPlayer.speed;
					// game.socket.emit('player-state', game.currentPlayer);
				}
			}
			tank.moving_left(game.currentPlayer.x, game.currentPlayer.y);
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
		}

		/*
		 * Send multiplayer data
		 */

		// game.socket.emit('player data', game.mpPlayers);
	};


	return {
		start: start,
		go: go
	};
});
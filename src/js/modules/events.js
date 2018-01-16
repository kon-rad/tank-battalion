'use strict';

define(['game', 'bullets', 'audio', 'multiPlayer_bullet'], function(game, bullets, audio, mpBullet) {

	window.addEventListener('keydown', function(e) {
		if(e.keyCode == 32 || e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 40 || e.keyCode === 39) {
 			e.preventDefault();
		}
	});
	  
	const events = {};

	events.handleKeyUp = (e) => {
		if(e.target.id !== 'tank')
			return;
		if(
			e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68 
			|| e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 40 || e.keyCode === 39
		) {
			if (game.multiplayer) {
				game.currentPlayer.moving = false;
				game.socket.emit('game-state', {player:game.currentPlayer, world:game.mpWorld});
			} else {
				game.moving = false;
			}
			audio.move.pause();
		}
	}


	events.handleKeydown = (e) => {
		if(e.target.id !== 'tank')
			return;
		switch (e.keyCode){
			case 38:
			case 87: 
				if (game.multiplayer) {
					game.currentPlayer.moving = true;
					game.currentPlayer.tankDirection = 'up';
					game.socket.emit('game-state', {player:game.currentPlayer, world:game.mpWorld});
				} else {
					game.moving = true;
					game.tankDirection = 'up';
				}
				audio.move.play();
				break;
			case 37:
			case 65: 
				if (game.multiplayer) {
					game.currentPlayer.moving = true;
					game.currentPlayer.tankDirection = 'left';
					game.socket.emit('game-state', {player:game.currentPlayer, world:game.mpWorld});
				} else {
					game.moving = true;
					game.tankDirection = 'left';
				}
				audio.move.play();
				break;
			case 40:
			case 83: 
				if (game.multiplayer) {
					game.currentPlayer.moving = true;
					game.currentPlayer.tankDirection = 'down';
					game.socket.emit('game-state', {player:game.currentPlayer, world:game.mpWorld});
				} else {
					game.moving = true;
					game.tankDirection = 'down';
				}
				audio.move.play();
				break;
			case 39:
			case 68: 
				if (game.multiplayer) {
					game.currentPlayer.moving = true;
					game.currentPlayer.tankDirection = 'right';
					game.socket.emit('game-state', {player:game.currentPlayer, world:game.mpWorld});
				} else {
					game.moving = true;
					game.tankDirection = 'right';
				}
				audio.move.play();
				break;
			case 32:
				bullet_check();
				break;
		}
	}

	const bullet_check = () => {
		if(game.multiplayer && !game.currentPlayer.bulletFired) {
			game.currentPlayer.bulletFired = true;
			mpBullet.fire_bullet(game.currentPlayer.x, game.currentPlayer.y, game.currentPlayer.tankDirection);
			audio.shoot.play();
		} else if(!game.multiplayer && !game.bullets_fired) {
			bullets.fire_bullet(game.x, game.y, game.tankDirection);
			game.bullets_fired = true;
			audio.shoot.play();
		} 
	}

	return events;
});
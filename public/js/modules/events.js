'use strict';

define(['game', 'bullets', 'audio', 'multiPlayer_bullet'], function (game, bullets, audio, mpBullet) {

	var events = {};

	events.handleKeyUp = function (e) {
		if (e.target.id !== 'tank') return;
		if (e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 32) {
			if (game.multiplayer) {
				game.currentPlayer.moving = false;
			} else {
				game.moving = false;
			}
			audio.move.pause();
		}
	};

	events.handleKeydown = function (e) {
		if (e.target.id !== 'tank') return;
		switch (e.keyCode) {
			case 87:
				if (game.multiplayer) {
					game.currentPlayer.moving = true;
					game.currentPlayer.tankDirection = 'up';
				} else {
					game.moving = true;
					game.tankDirection = 'up';
				}
				audio.move.play();
				break;
			case 65:
				if (game.multiplayer) {
					game.currentPlayer.moving = true;
					game.currentPlayer.tankDirection = 'left';
				} else {
					game.moving = true;
					game.tankDirection = 'left';
				}
				audio.move.play();
				break;
			case 83:
				if (game.multiplayer) {
					game.currentPlayer.moving = true;
					game.currentPlayer.tankDirection = 'down';
				} else {
					game.moving = true;
					game.tankDirection = 'down';
				}
				audio.move.play();
				break;
			case 68:
				if (game.multiplayer) {
					game.currentPlayer.moving = true;
					game.currentPlayer.tankDirection = 'right';
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
	};

	var bullet_check = function bullet_check() {
		if (game.multiplayer && !game.currentPlayer.bulletFired) {
			mpBullet.fire_bullet(game.currentPlayer.x, game.currentPlayer.y, game.currentPlayer.tankDirection);
			game.currentPlayer.bulletFired = true;
			audio.shoot.play();
		} else if (!game.multiplayer && !game.bullets_fired) {
			bullets.fire_bullet(game.x, game.y, game.tankDirection);
			game.bullets_fired = true;
			audio.shoot.play();
		}
	};

	return events;
});
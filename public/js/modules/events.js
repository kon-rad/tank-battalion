'use strict';

define(['game', 'bullets'], function (game, bullets) {

	var events = {};

	events.handleKeyUp = function (e) {
		if (e.target.id !== 'tank') return;
		if (e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 32) {
			game.moving = false;
		}
	};

	events.handleKeydown = function (e) {
		if (e.target.id !== 'tank') return;
		switch (e.keyCode) {
			case 87:
				game.tankDirection = 'up';
				game.moving = true;
				break;
			case 65:
				game.tankDirection = 'left';
				game.moving = true;
				break;
			case 83:
				game.tankDirection = 'down';
				game.moving = true;
				break;
			case 68:
				game.tankDirection = 'right';
				game.moving = true;
				break;
			case 32:
				bullets.fire_bullet(game.x, game.y, game.tankDirection);
				break;
		}
	};

	return events;
});
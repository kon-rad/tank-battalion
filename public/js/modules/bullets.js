'use strict';

define(['game'], function (game) {

	var bullets = {};

	bullets.render_bullet = function (bullet) {
		switch (bullet.dir) {
			case 'up':
				bullet.y -= 2;
				break;
			case 'down':
				bullet.y += 2;
				break;
			case 'right':
				bullet.x += 2;
				break;
			case 'left':
				bullet.x -= 2;
				break;
		}
		game.context.beginPath();
		game.context.fillStyle = 'red';
		game.context.arc(bullet.x, bullet.y, 6, 0, Math.PI * 2);
		game.context.fill();
		game.context.closePath();
	};

	bullets.fire_bullet = function (x, y, tankDirection) {
		if (tankDirection == 'up') y -= 20;else if (tankDirection == 'down') y += 20;else if (tankDirection == 'right') x += 20;else if (tankDirection == 'left') x -= 20;
		var bullet = {
			'x': x,
			'y': y,
			'dir': tankDirection
		};
		game.bullets.push(bullet);
	};

	return bullets;
});
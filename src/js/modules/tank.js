'use strict';

define(['game'], function(game) {

		const tank = {};

		tank.drawTank = () => {
			game.context.fillStyle = '#004a00';
			game.context.fillRect(game.x-10, game.y-10, 20, 20);
			game.context.fillStyle = 'green';
			game.context.fillRect(game.x, game.y, 14, 14);
			game.context.fillRect(game.x, game.y, 4, 10);
			game.context.fillRect(game.x, game.y, 6, 24);
			game.context.fillRect(game.x, game.y, 6, 24);
		}

		tank.moving_up = () => {
			game.context.fillStyle = '#004a00';
			game.context.fillRect(game.x-10, game.y-10, 20, 20);
			game.context.fillStyle = 'green';
			game.context.fillRect(game.x-10, game.y-10, 14, 14);
			game.context.fillRect(game.x-2, game.y-14, 4, 10);
			game.context.fillRect(game.x-12, game.y-12, 6, 24);
			game.context.fillRect(game.x+6, game.y-12, 6, 24);
		}
		tank.moving_down = () => {
			game.context.fillStyle = '#004a00';
			game.context.fillRect(game.x-10, game.y-10, 20, 20);
			game.context.fillStyle = 'green';
			game.context.fillRect(game.x-10, game.y-10, 14, 14);
			game.context.fillRect(game.x-2, game.y+10, 4, 10);
			game.context.fillRect(game.x-12, game.y-12, 6, 24);
			game.context.fillRect(game.x+6, game.y-12, 6, 24);
		}
		tank.moving_right = () => {
			game.context.fillStyle = '#004a00';
			game.context.fillRect(game.x-10, game.y-10, 20, 20);
			game.context.fillStyle = 'green';
			game.context.fillRect(game.x-10, game.y-10, 14, 14);
			game.context.fillRect(game.x+10, game.y-2, 10, 4);
			game.context.fillRect(game.x-12, game.y-12, 24, 6);
			game.context.fillRect(game.x-12, game.y+8, 24, 6);
		}
		tank.moving_left = () => {
			game.context.fillStyle = '#004a00';
			game.context.fillRect(game.x-10, game.y-10, 20, 20);
			game.context.fillStyle = 'green';
			game.context.fillRect(game.x-10, game.y-10, 14, 14);
			game.context.fillRect(game.x-20, game.y-2, 10, 4);
			game.context.fillRect(game.x-12, game.y-12, 24, 6);
			game.context.fillRect(game.x-12, game.y+8, 24, 6);
		}

		return tank;
})
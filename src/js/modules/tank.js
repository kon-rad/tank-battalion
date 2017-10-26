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

		tank.moving_up = (x, y, color) => {
			if (color == undefined) {
				color = 'green';
			}
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-10, y-10, 20, 20);
			game.context.fillStyle = color;
			game.context.fillRect(x-10, y-10, 14, 14);
			game.context.fillRect(x-2, y-18, 4, 10);
			game.context.fillRect(x-3, y-20, 6, 3);
			game.context.fillRect(x-12, y-12, 6, 24);
			game.context.fillRect(x+6, y-12, 6, 24);
		}
		tank.moving_down = (x, y, color) => {
			if (color == undefined) {
				color = 'green';
			}
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-10, y-10, 20, 20);
			game.context.fillStyle = color;
			game.context.fillRect(x-10, y-10, 14, 14);
			game.context.fillRect(x-2, y+10, 4, 10);
			game.context.fillRect(x-3, y+20, 6, 3);
			game.context.fillRect(x-12, y-12, 6, 24);
			game.context.fillRect(x+6, y-12, 6, 24);
		}
		tank.moving_right = (x, y, color) => {
			if (color == undefined) {
				color = 'green';
			}
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-10, y-10, 20, 20);
			game.context.fillStyle = color;
			game.context.fillRect(x-10, y-10, 14, 14);
			game.context.fillRect(x+8, y-2, 12, 4);
			game.context.fillRect(x+20, y-4, 3, 8);
			game.context.fillRect(x-12, y-12, 24, 6);
			game.context.fillRect(x-12, y+8, 24, 6);
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-12, y+14, 24, 2);
		}
		tank.moving_left = (x, y, color) => {
			if (color == undefined) {
				color = 'green';
			}
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-10, y-10, 20, 20);
			game.context.fillStyle = color;
			game.context.fillRect(x-4, y-10, 14, 14);
			game.context.fillRect(x-20, y-2, 12, 4);
			game.context.fillRect(x-22, y-4, 3, 8);
			game.context.fillRect(x-12, y-12, 24, 6);
			game.context.fillRect(x-12, y+8, 24, 6);
			game.context.fillStyle = '#004a00';
			game.context.fillRect(x-12, y+14, 24, 2);
		}

		return tank;
})
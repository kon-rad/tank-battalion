'use strict';

(function () {
	requirejs.config({
		paths: {
			'async': 'vendors/async'
		}
	});

	requirejs(['modules/game', 'modules/tank'], function (game, tank) {

		var canvas = document.getElementById('tank');
		var context = canvas.getContext('2d');
		var cw = canvas.width;
		var ch = canvas.height;
		var tankDirection = false;
		var moving = false;
		var bullets = [];

		// const game = {};
		// game.canvas = document.getElementById('tank');
		// game.context = canvas.getContext('2d');
		// game.cw = game.canvas.width;
		// game.ch = game.canvas.height;
		// game.tankDirection = false;
		// game.moving = false;
		// game.bullets = [];


		var drawTank = function drawTank() {
			context.fillRect(x, y, 20, 20);
			context.fillRect(x, y, 4, 10);
			context.fillRect(x, y, 6, 24);
			context.fillRect(x, y, 6, 24);
		};

		var moving_up = function moving_up() {
			context.fillRect(x - 10, y - 10, 20, 20);
			context.fillRect(x - 2, y - 20, 4, 10);
			context.fillRect(x - 12, y - 12, 6, 24);
			context.fillRect(x + 6, y - 12, 6, 24);
		};
		var moving_down = function moving_down() {
			context.fillRect(x - 10, y - 10, 20, 20);
			context.fillRect(x - 2, y + 10, 4, 10);
			context.fillRect(x - 12, y - 12, 6, 24);
			context.fillRect(x + 6, y - 12, 6, 24);
		};
		var moving_right = function moving_right() {
			context.fillRect(x - 10, y - 10, 20, 20);
			context.fillRect(x + 10, y - 2, 10, 4);
			context.fillRect(x - 12, y - 12, 24, 6);
			context.fillRect(x - 12, y + 8, 24, 6);
		};
		var moving_left = function moving_left() {
			context.fillRect(x - 10, y - 10, 20, 20);
			context.fillRect(x - 20, y - 2, 10, 4);
			context.fillRect(x - 12, y - 12, 24, 6);
			context.fillRect(x - 12, y + 8, 24, 6);
		};
		// set canvas to be a tab stop (necessary to give it focus)
		canvas.setAttribute('tabindex', '0');
		// set focus to the canvas
		canvas.focus();
		var x = 400;
		var y = 200;
		var bf = 0;
		var draw = function draw(action) {
			context.clearRect(0, 0, cw, ch);
			context.fillStyle = 'green';

			if (action === 'up') {
				moving_up();
			} else if (action === 'left') {
				moving_left();
			} else if (action === 'right') {
				moving_right();
			} else if (action === 'down') {
				moving_down();
			} else if (action === 'fire') {
				drawBullet();
			}
			if (tankDirection == 'up') {
				if (moving) y -= 2;
				moving_up();
			} else if (tankDirection == 'down') {
				if (moving) y += 2;
				moving_down();
			} else if (tankDirection == 'right') {
				if (moving) x += 2;
				moving_right();
			} else if (tankDirection == 'left') {
				if (moving) x -= 2;
				moving_left();
			}
			bullets.forEach(function (item) {
				render_bullet(item);
			});
		};

		var handleKeydown = function handleKeydown(e) {
			if (e.target.id !== 'tank') return;
			switch (e.keyCode) {
				case 87:
					tankDirection = 'up';
					moving = true;
					break;
				case 65:
					tankDirection = 'left';
					moving = true;
					break;
				case 83:
					tankDirection = 'down';
					moving = true;
					break;
				case 68:
					tankDirection = 'right';
					moving = true;
					break;
				case 32:
					fire_bullet(x, y, tankDirection);
					break;
			}
		};
		function render_bullet(bullet) {
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
			context.beginPath();
			context.fillStyle = 'red';
			context.arc(bullet.x, bullet.y, 6, 0, Math.PI * 2);
			context.fill();
			context.closePath();
		}

		var draw_bullet = function draw_bullet() {
			var b_x = 0;
			var b_y = 0;
			context.beginPath();
			context.fillStyle = 'red';
			context.arc(x + b_x, y + b_y, 6, 0, Math.PI * 2);
			context.fill();
			context.closePath();
			b_x += 1;
			b_y += 1;
			if (b_x > canvas.width || b_y > canvas.height) {
				clearInterval(bf);
			}
		};
		function fire_bullet(x, y, tankDirection) {
			if (tankDirection == 'up') y -= 20;else if (tankDirection == 'down') y += 20;else if (tankDirection == 'right') x += 20;else if (tankDirection == 'left') x -= 20;
			var bullet = {
				'x': x,
				'y': y,
				'dir': tankDirection
			};
			bullets.push(bullet);
		}
		var handleKeyUp = function handleKeyUp(e) {
			if (e.target.id !== 'tank') return;
			if (e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 32) {
				moving = false;
			}
		};

		function createWallSegment(x, y) {
			context.fillStyle = 'orange';
			context.fillRect(x, y, 100, 20);
			// context.fillRect(x, y, 4, 10);
			// context.fillRect(x, y, 6, 24);
			// context.fillRect(x, y, 6, 24);
		}

		draw();
		setInterval(draw, 10);
		createWallSegment(200, 600);
		document.addEventListener("keydown", handleKeydown, false);
		document.addEventListener("keyup", handleKeyUp, false);
	});
})();
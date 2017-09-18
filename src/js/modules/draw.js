'use strict';

define(['game', 'tank', 'bullets', 'mWorld'], 
	function(game, tank, bullets, mWorld) {

	const start = (action) => {
		game.context.clearRect(0, 0, game.cw, game.ch);
		mWorld.draw();
		game.context.fillStyle = 'green';

		if(game.tankDirection == 'up') {
			if(game.moving) game.y -= 2; 
			tank.moving_up();
		} else if(game.tankDirection == 'down') {
			if(game.moving) game.y += 2; 
			tank.moving_down();
		} else if(game.tankDirection == 'right') {
			if(game.moving) game.x += 2; 
			tank.moving_right();
		} else if(game.tankDirection == 'left') {
			if(game.moving) game.x -= 2; 
			tank.moving_left();
		}
		game.bullets.forEach(function(item) {
			bullets.render_bullet(item);
		});
	}

	return {
		start: start
	};
});
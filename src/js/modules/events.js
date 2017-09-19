'use strict';

define(['game', 'bullets', 'audio'], function(game, bullets, audio) {

	const events = {};

	events.handleKeyUp = (e) => {
		if(e.target.id !== 'tank')
			return;
		if(e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 32) {
			game.moving = false;
			audio.move.pause();
		}
	}


	events.handleKeydown = (e) => {
		if(e.target.id !== 'tank')
			return;
		switch (e.keyCode){
			case 87: 
				game.tankDirection = 'up';
				game.moving = true;
				audio.move.play();
				break;
			case 65: 
				game.tankDirection = 'left';
				game.moving = true;
				audio.move.play();
				break;
			case 83: 
				game.tankDirection = 'down';
				game.moving = true;
				audio.move.play();
				break;
			case 68: 
				game.tankDirection = 'right';
				game.moving = true;
				audio.move.play();
				break;
			case 32:
				bullet_check();
				break;
		}
	}

	const bullet_check = () => {
		if(!bullets.fired) {
			bullets.fire_bullet(game.x, game.y, game.tankDirection);
			bullets.fired = true;
			audio.shoot.play();
		} 
	}

	return events;
});
'use strict';

define(['game', 'audio', 'images'], function(game, audio, images) {

	const mpBullet = {};

	mpBullet.render_mpBullet = function(bullet) {
		game.context.beginPath();
		game.context.fillStyle = 'red';
		game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI*2);
		game.context.fill();
		game.context.closePath();
	};

	mpBullet.fireBullet = function() {
		if (game.currentPlayer.tankDirection === 'up') game.currentPlayer.y-=2;
		else if(game.currentPlayer.tankDirection ==='down') game.currentPlayer.y+=2;
		else if(game.currentPlayer.tankDirection ==='right') game.currentPlayer.x+=2;
		else if(game.currentPlayer.tankDirection ==='left') game.currentPlayer.x-=2;

		const bullet = {
      'x': game.currentPlayer.x,
      'y': game.currentPlayer.y,
      'dir': game.currentPlayer.tankDirection,
			'id': game.currentPlayer.id
    };
    game.currentUser.bulletFired = true;

		game.socket.emit('bullet-fired', bullet);
	};

	return mpBullet;
});
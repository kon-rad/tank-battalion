'use strict';

define(['game', 'mWorld'], function (game, mWorld) {

	var move = new Audio('/assets/audio/move.wav');
	var shoot = new Audio('/assets/audio/shoot2.wav');
	var explode = new Audio('/assets/audio/explosion.wav');
	var start = new Audio('/assets/audio/up.wav');
	move.volume = 0.3;
	shoot.volume = 0.3;
	explode.volume = 0.2;
	start.volume = 0.4;

	return {
		move: move,
		shoot: shoot,
		explode: explode,
		start: start
	};
});
'use strict';

define(['game', 'mWorld'], function(game, mWorld) {

	const move = new Audio('/assets/audio/move.wav');
	const shoot = new Audio('/assets/audio/shoot2.wav');
	const explode = new Audio('/assets/audio/explosion.wav');
	const start = new Audio('/assets/audio/up.wav');
	const point = new Audio('/assets/audio/point.wav');
	const dud = new Audio('/assets/audio/dud.wav');
	move.volume = 0.3;
	shoot.volume = 0.3;
	explode.volume = 0.2;
	start.volume = 0.4;

	return {
		move: move,
		shoot: shoot,
		explode: explode,
		start: start,
		dud: dud,
		point: point
	};
});
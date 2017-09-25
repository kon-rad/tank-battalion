'use strict';

define(function () {

	var eagle = new Image();
	eagle.src = 'assets/images/eagle.png';
	var explosion = new Image();
	explosion.src = 'assets/images/explosion.png';
	var bigRedExplosion = new Image();
	bigRedExplosion.src = 'assets/images/big_red_explosion.png';
	var bigWhiteExplosion = new Image();
	bigWhiteExplosion.src = 'assets/images/big_white_explosion.png';

	return {
		eagle: eagle,
		explosion: explosion,
		bigRedExplosion: bigRedExplosion,
		bigWhiteExplosion: bigWhiteExplosion
	};
});
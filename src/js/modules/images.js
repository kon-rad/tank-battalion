'use strict';

define(function() {

	const eagle = new Image();
	eagle.src = 'assets/images/eagle.png';
	const explosion = new Image();
	explosion.src = 'assets/images/explosion.png';
	const bigRedExplosion = new Image();
	bigRedExplosion.src = 'assets/images/big_red_explosion.png';
	const bigWhiteExplosion = new Image();
	bigWhiteExplosion.src = 'assets/images/big_white_explosion.png';

	return {
		eagle: eagle,
		explosion: explosion,
		bigRedExplosion: bigRedExplosion,
		bigWhiteExplosion: bigWhiteExplosion
	};
});
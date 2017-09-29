'use strict';

define(['game', 'tank', 'mWorld', 'singlePlayer'], function(game, tank, mWorld, singlePlayer) {

	const detect = (x, y) => {

		singlePlayer.ai.bots.forEach(function(b) {
			console.log(x, y, b.x, b.y);
		})
	}
	return {
		detect: detect
	}

});
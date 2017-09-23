'use strict';

define(['game', 'tank', 'mWorld', 'singlePlayer'], function (game, tank, mWorld, singlePlayer) {

	var detect = function detect(x, y) {

		singlePlayer.botsArr.forEach(function (b) {
			console.log(x, y, b.x, b.y);
		});
	};
	return {
		detect: detect
	};
});
'use strict';

(function () {
	requirejs.config({
		paths: {
			'async': 'vendors/async',
			'game': 'modules/game',
			'tank': 'modules/tank',
			'events': 'modules/events',
			'bullets': 'modules/bullets',
			'draw': 'modules/draw',
			'audio': 'modules/audio',
			'images': 'modules/images',
			'mWorld': 'worlds/mainWorld',
			'mwObstacle': 'worlds/mwObstacle',
			'setup': 'setup/setup',
			'singlePlayer': 'singlePlayer/singlePlayer',
			'renderBot': 'singlePlayer/renderBot',
			'util': 'modules/util',
			'multiPlayer': 'multiPlayer/multiPlayer',
			'multiPlayer_draw': 'multiPlayer/multiPlayer_draw',
			'multiPlayer_bullet': 'multiPlayer/multiPlayer_bullet',
			'mobile_controller': 'modules/mobile_controller'
		}
	});

	requirejs(['util', 'draw', 'game', 'events', 'audio', 'setup', 'mobile_controller'], function (util, draw, game, events, audio, setup, mobile_controller) {
		setup.control();
	});
})();
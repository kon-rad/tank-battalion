'use strict';

(function() { 
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
			'multiPlayer': 'multiPlayer/multiPlayer',
			'multiPlayer_draw': 'multiPlayer/multiPlayer_draw',
			'multiPlayer_bullet': 'multiPlayer/multiPlayer_bullet',
			'mobile_controller': 'modules/mobile_controller'
		}
	});

  document.app = {};

	requirejs(['draw', 'game', 'events', 'setup', 'mobile_controller'],
	   function(draw, game, events, setup) {
	   	setup.control();
	});
})();


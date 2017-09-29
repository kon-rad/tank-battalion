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
			'botMap': 'singlePlayer/botMap'
		}
	})
	requirejs(['draw', 'game', 'events', 'audio', 'setup'],
	   function(draw, game, events, audio, setup) {
	   	setup.control();
	})

})()


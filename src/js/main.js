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
			'setup': 'setup/setup'
		}
	})

	requirejs(['game', 'tank', 'events', 'bullets', 'draw', 'mWorld', 'setup'],
	   function(game,   tank,   events,   bullets,   draw,   mWorld, setup) {

	   	//game starts
	   	setup.control();
	})

})()


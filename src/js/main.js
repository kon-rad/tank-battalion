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
			'mWorld': 'worlds/mainWorld'
		}
	})

	requirejs(['game', 'tank', 'events', 'bullets', 'draw', 'mWorld'],
	   function(game,   tank,   events,   bullets,   draw,   mWorld) {


		draw.start();
		setInterval(draw.start, 10);
		document.addEventListener("keydown", events.handleKeydown, false);
		document.addEventListener("keyup", events.handleKeyUp, false);

	})

})()


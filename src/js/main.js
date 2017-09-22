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
			'startOnePlayer': 'setup/startOnePlayer',
			'setup': 'setup/setup'
		}
	})

	requirejs(['draw', 'game', 'events', 'audio', 'setup'],
	   function(draw, game, events, audio, setup) {



	   	//game starts
	   	setup.control();


	   	// draw.start();
		// console.log(draw);

		// console.log('inside sop return');
		// document.addEventListener("keydown", events.handleKeydown, false);
		// document.addEventListener("keyup", events.handleKeyUp, false);
		// game.onePlayerBegin = false;
		// audio.start.play();
		// game.canvas.setAttribute('tabindex','0');
		// game.canvas.focus();
		// draw.start();
		// setInterval(draw.start, 100);

	})

})()


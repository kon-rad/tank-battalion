'use strict';

define([ 'game', 'events', 'audio', 'mWorld', 'tank', 'multiPlayer_draw'], 
	function ( game, events, audio, mWorld, tank, multiPlayer_draw) {

	const init = () => {

	   	console.log('init here, tank emit done');
	   	multiPlayer_draw.start();

	   	game.socket.on('player-disconnected', () => {
	   		console.log('player disconnected');
	   	});
	    game.socket.on('send-game-state', (gameState) => {
			game.mpPlayers = gameState.players;
			console.log('game state recieved: ', gameState.players);
	   	})
	}

	const draw = {
		start: () => {
			console.log('draw start executed');
		}
	}

	return {
		init: init,
		draw: draw
	};
});
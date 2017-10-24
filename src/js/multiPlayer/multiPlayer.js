'use strict';

define([ 'game', 'events', 'audio', 'mWorld', 'tank', 'multiPlayer_draw'], 
	function ( game, events, audio, mWorld, tank, multiPlayer_draw) {

	const init = () => {

	   	multiPlayer_draw.start();

	   	game.socket.on('player-disconnected', () => {
	   		console.log('player disconnected');
	   	});
	    game.socket.on('send-game-state', (gameState) => {
			game.mpPlayers = gameState.players;
			game.mpWorld = gameState.world;
			for(let i = 0; i < game.mpPlayers.length; i++) {
				if(game.mpPlayers[i].id == game.mpCurrentId) {
					game.currentPlayer.bulletFired = game.mpPlayers[i].bulletFired;
					game.currentPlayer.bullet = game.mpPlayers[i].bullet;
					break;
				}
			}
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
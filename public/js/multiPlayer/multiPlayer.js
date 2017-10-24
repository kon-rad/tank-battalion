'use strict';

define(['game', 'events', 'audio', 'mWorld', 'tank', 'multiPlayer_draw'], function (game, events, audio, mWorld, tank, multiPlayer_draw) {

	var init = function init() {

		multiPlayer_draw.start();

		game.socket.on('player-disconnected', function () {
			console.log('player disconnected');
		});
		game.socket.on('send-game-state', function (gameState) {
			game.mpPlayers = gameState.players;
			game.mpWorld = gameState.world;
			for (var i = 0; i < game.mpPlayers.length; i++) {
				if (game.mpPlayers[i].id == game.mpCurrentId) {
					game.currentPlayer.bulletFired = game.mpPlayers[i].bulletFired;
					game.currentPlayer.bullet = game.mpPlayers[i].bullet;
					break;
				}
			}
		});
	};

	var draw = {
		start: function start() {
			console.log('draw start executed');
		}
	};

	return {
		init: init,
		draw: draw
	};
});
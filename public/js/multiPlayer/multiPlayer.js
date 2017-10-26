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
			game.mpGame = gameState.game;
			for (var i = 0; i < game.mpPlayers.length; i++) {
				if (game.mpPlayers[i].id == game.mpCurrentId) {
					game.currentPlayer.bulletFired = game.mpPlayers[i].bulletFired;
					game.currentPlayer.bullet = game.mpPlayers[i].bullet;
					break;
				}
			}
			displayMultiplayer();
			game.multiplayer = true;
		});
	};

	var displayMultiplayer = function displayMultiplayer() {
		console.log('displayMultiplayer');
		var displayScore = document.getElementsByClassName('score')[0];
		displayScore.innerHTML = '';
		displayScore.innerHTML += '<div id="mpS"></div>';
		for (var user in game.mpGame.users) {
			var obj = game.mpGame.users;
			var mpDisplay = document.getElementById('mpS');
			mpDisplay.innerHTML += '<div class="mpS__user"><span>user:</span>' + obj[user].name + '<div class="mpS__display"><div id="mpS_' + obj[user].id + '"class="mpS__score"><span>score</span>' + obj[user].points + '</div>' + '<div class="mpS__lives"><span>lives</span>' + obj[user].lives + '</div></div></div>';
		}
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
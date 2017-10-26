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
			game.mpGame = gameState.game;
			for(let i = 0; i < game.mpPlayers.length; i++) {
				if(game.mpPlayers[i].id == game.mpCurrentId) {
					game.currentPlayer.bulletFired = game.mpPlayers[i].bulletFired;
					game.currentPlayer.bullet = game.mpPlayers[i].bullet;
					break;
				}
			}
			displayMultiplayer();
			game.multiplayer = true;
	   	})
	}

	const displayMultiplayer = () => {
		console.log('displayMultiplayer');
		let displayScore = document.getElementsByClassName('score')[0];
		console.log(displayScore);
		displayScore.innerHTML = '';
		displayScore.innerHTML += '<div id="mpS"></div>';
		for(let user in game.mpGame.users) {
			console.log(user);
			let obj = game.mpGame.users;
			const mpDisplay = document.getElementById('mpS');
			mpDisplay.innerHTML += '<div class="mpS__user"><span>user:</span>'
			+ obj[user].name + '<div id="mpS_'+ obj[user].id + '"class="mpS__score"><span>score</span>'+ obj[user].points + '</div>'
			+ '<div class="mpS__lives"><span>lives</span>'+obj[user].lives+'</div></div>';
		}
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
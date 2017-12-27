'use strict';

define([ 'game', 'events', 'audio', 'mWorld', 'tank', 'multiPlayer_draw'], 
	function ( game, events, audio, mWorld, tank, multiPlayer_draw) {

	const init = () => {
	   	multiPlayer_draw.start();
	   	game.socket.on('player-disconnected', () => {
			const mpDisplay = document.getElementById('mpS');
			mpDisplay.innerHTML = '';
	   	});
	    game.socket.on('send-game-state', (gameState) => {
			game.mpPlayers = gameState.players;
			game.mpWorld = gameState.world;
			game.mpGame = gameState.game;
			for(let i = 0; i < game.mpPlayers.length; i++) {
				if(game.mpPlayers[i].id == game.mpCurrentId) {
					game.currentPlayer.bulletFired = game.mpPlayers[i].bulletFired;
					game.currentPlayer.bullet = game.mpPlayers[i].bullet;
					game.currentPlayer.lives =game.mpPlayers[i].lives;
					game.currentPlayer.points =game.mpPlayers[i].points;
					break;
				}
			}
			displayMultiplayer();
			game.multiplayer = true;
	   	})
	}

	const displayMultiplayer = () => {
			const mpDisplay = document.getElementById('mpS');
		for (let user in game.mpGame.users) {
			let obj = game.mpGame.users;
			let userId = 'mpS_'+ obj[user].id;
			let userIdScore = 'mpS_'+ obj[user].id + '_score';
			let userIdLives = 'mpS_'+ obj[user].id + '_lives';
			let userDisplay = '';
			if (document.getElementById(userId)) {
				if (parseInt(document.getElementById(userIdScore).innerHTML) != obj[user].points) {
					document.getElementById(userIdScore).innerHTML = obj[user].points;
				}
				if (parseInt(document.getElementById(userIdLives).innerHTML) != obj[user].lives) {
					if (obj[user].lives < 0) {
						mpDisplay.innerHTML = '';
					} else {
						document.getElementById(userIdLives).innerHTML = obj[user].lives;
					}
				}

				if (obj[user].lives < 0) {
					mpDisplay.innerHTML = '';
				} 
			} else {
				userDisplay = '<div id="'+ userId + '"class="mpS__user"><span>user:</span>'
				+ obj[user].name + '<div class="mpS__display"><div class="mpS__score"><span>score</span><span id="'+userIdScore+'"> '+ obj[user].points + '</span></div>'
				+ '<div class="mpS__lives"><span>lives</span><span id="'+userIdLives+'"> '+obj[user].lives+'</span></div></div></div>';
				mpDisplay.innerHTML += userDisplay;
			}
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
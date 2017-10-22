'use strict';

define(function() {

	const game = {};
	game.canvas = document.getElementById('tank');
	game.context = game.canvas.getContext('2d');
	game.cw = game.canvas.width;
	game.ch = game.canvas.height;
	game.tankDirection = false;
	game.moving = false;
	game.bots_loaded = 0;
	game.bullets = [];
	game.stop = true;
	game.onePlayerBegin = false;
	game.bool = true;
	game.time = 0;
	game.playerOnePoints = 0;
	game.playerOneLives = 0;
	game.newGame = false;
	game.bots;
	game.eagle1_y = 57;
	game.eagle1_x = 28;
	game.bots_destroyed;
	game.bots_on_screen = -1;
	game.newRound = false;
	game.round = 1;
	game.difficulty = 0;
	game.bullets_fired = false;
	game.round_display = document.getElementById('score__round_num');
	game.display_bots = document.getElementsByClassName('score__enemy_tank');
	game.score_num = document.getElementById('score__current_num');
	game.high_num = document.getElementById('score__high_num');
	game.timer = setInterval(function(){
		game.time += 100;
	}, 100);
	game.worldData;

	/*
	 * Speed Settings
	 */

	game.enemy_bullet_speed = 14;
	game.enemy_speed = 10;
	game.bullet_speed = 14;
	game.playerOneSpeed = 10;

	/*
	 * Set focus to canvas
	 */

	game.canvas.setAttribute('tabindex','0');
	game.canvas.focus();

	/*
	 * Multiplayer game state
	 */

	game.multiplayer = false;
	game.mpPlayers;
	game.currentPlayer;
	game.mpCurrentId;
	game.mpWorld;
	game.id = () => {
	  return '_' + Math.random().toString(36).substr(2, 9);
	};
	game.find_mpCurrentIndex = () => {
		let len = game.mpPlayers.length;
		for(let i = 0; i < len; i++) {
			if(game.mpPlayers[i].id === game.mpCurrentId) {
				return i;
			}
		}
	}

	return game;

})


'use strict';

define(['game', 'bullets', 'mwObstacle', 'audio'], 
	function(game, bullets, mwObstacle, audio) {

		var ai = {};
		ai.elapsedTime = game.time;
		ai.bots = [];
		ai.dir = ['up', 'down', 'right', 'left'];

		const loadBot = () => {
			let dir = (game.time%2==0)?'right':'left';
			let bot = {
				id: game.time+'',
				dir: 'right',
				moving: true,
				x: 520,
				y:20
			};
			ai.bots.push(bot);
		}
		const render = () => {
			return ai.bots;
		}

		const init = () => {
			console.log('ai here');
			setTimeout(loadBot, 500);
			let loading = setInterval(function() {
				loadBot();
				if(ai.bots.length >= 10) {
					clearInterval(loading);
				}
			}, 7000);
			let botEngine = setInterval(function() {
				ai.bots.forEach(function(bot) {
					if(bot.dir=='up') {
						if(mwObstacle.detect(bot.x, bot.y-16, bot.dir)) {
							bot.y+=6;
							bot.dir = ai.dir[Math.floor(Math.random()*4)];
						} else {
							bot.y-=6;
						}
					} else if (bot.dir=='down') {
						if(mwObstacle.detect(bot.x, bot.y+16, bot.dir)) {
							bot.y-=6;
							bot.dir = ai.dir[Math.floor(Math.random()*4)];
						} else {
							bot.y+=6;
						}
					} else if (bot.dir=='right') {
						if(mwObstacle.detect(bot.x+16, bot.y, bot.dir)) {
							bot.x-=6;
							bot.dir = ai.dir[Math.floor(Math.random()*4)];
						} else {
							bot.x+=6;
						}
					} else if (bot.dir=='left') {
						if(mwObstacle.detect(bot.x-16, bot.y, bot.dir)) {
							bot.x+=6;
							bot.dir = ai.dir[Math.floor(Math.random()*4)];
						} else {
							bot.x-=6;
						}
					}
				})
			}, 100);
		}

		return {
			init: init,
			render: render
		}

});

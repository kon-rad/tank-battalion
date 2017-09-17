'use strict';


(function() { 
	  requirejs.config({
	    paths: {
	      'async': 'vendors/async'
	    }
	  })

	requirejs(['modules/game', 'modules/tank'], function(game, tank) {

		const canvas = document.getElementById('tank');
		let context = canvas.getContext('2d');
		let cw = canvas.width;
		let ch = canvas.height;
		let tankDirection = false;
		let  moving = false;
		let bullets = [];


		// const game = {};
		// game.canvas = document.getElementById('tank');
		// game.context = canvas.getContext('2d');
		// game.cw = game.canvas.width;
		// game.ch = game.canvas.height;
		// game.tankDirection = false;
		// game.moving = false;
		// game.bullets = [];














		const drawTank = () => {
			context.fillRect(x, y, 20, 20);
			context.fillRect(x, y, 4, 10);
			context.fillRect(x, y, 6, 24);
			context.fillRect(x, y, 6, 24);
		}

		const moving_up = () => {
			context.fillRect(x-10, y-10, 20, 20);
			context.fillRect(x-2, y-20, 4, 10);
			context.fillRect(x-12, y-12, 6, 24);
			context.fillRect(x+6, y-12, 6, 24);
		}
		const moving_down = () => {
			context.fillRect(x-10, y-10, 20, 20);
			context.fillRect(x-2, y+10, 4, 10);
			context.fillRect(x-12, y-12, 6, 24);
			context.fillRect(x+6, y-12, 6, 24);
		}
		const moving_right = () => {
			context.fillRect(x-10, y-10, 20, 20);
			context.fillRect(x+10, y-2, 10, 4);
			context.fillRect(x-12, y-12, 24, 6);
			context.fillRect(x-12, y+8, 24, 6);
		}
		const moving_left = () => {
			context.fillRect(x-10, y-10, 20, 20);
			context.fillRect(x-20, y-2, 10, 4);
			context.fillRect(x-12, y-12, 24, 6);
			context.fillRect(x-12, y+8, 24, 6);
		}
		// set canvas to be a tab stop (necessary to give it focus)
		canvas.setAttribute('tabindex','0');
		// set focus to the canvas
		canvas.focus();
		let x = 400;
		let y = 200;
		let bf = 0;
		let draw = (action) => {
			context.clearRect(0, 0, cw, ch);
			context.fillStyle = 'green';

			if (action === 'up') {
				moving_up();
			} else if (action === 'left') {
				moving_left();
			} else if (action === 'right') {
				moving_right();
			} else if (action === 'down') {
				moving_down();
			} else if (action === 'fire') {
				drawBullet();
			}
		  if(tankDirection == 'up') {
				if(moving) y -= 2; 
		    moving_up();
		  } else if(tankDirection == 'down') {
				if(moving) y += 2; 
		    moving_down();
		  } else if(tankDirection == 'right') {
				if(moving) x += 2; 
		    moving_right();
		  } else if(tankDirection == 'left') {
				if(moving) x -= 2; 
		    moving_left();
		  }
		  bullets.forEach(function(item) {
		    render_bullet(item);
		  });
		}

		let handleKeydown = (e) => {
			if(e.target.id !== 'tank')
				return;
			switch (e.keyCode){
				case 87: 
		      tankDirection = 'up';
		      moving = true;
					break;
				case 65: 
		      tankDirection = 'left';
		      moving = true;
					break;
				case 83: 
		      tankDirection = 'down';
		      moving = true;
					break;
				case 68: 
		      tankDirection = 'right';
		      moving = true;
					break;
				case 32:
					fire_bullet(x, y, tankDirection);
					break;
			}
		}
		function render_bullet(bullet) {
		  switch(bullet.dir) {
		    case 'up':
		      bullet.y-=2;
		      break;
		    case 'down':
		      bullet.y+=2;
		      break;
		    case 'right':
		      bullet.x+=2;
		      break;
		    case 'left':
		      bullet.x-=2;
		      break;
		  }
			context.beginPath();
			context.fillStyle = 'red';
		 	context.arc(bullet.x, bullet.y, 6, 0, Math.PI*2);
			context.fill();
			context.closePath(); 
		}

		const draw_bullet = () => {
		  let	b_x = 0;
		  let	b_y = 0;
			context.beginPath();
			context.fillStyle = 'red';
			context.arc(x + b_x, y + b_y, 6, 0, Math.PI*2);
			context.fill();
			context.closePath();
			b_x += 1;
			b_y += 1;
			if(b_x > canvas.width || b_y > canvas.height) {
				clearInterval(bf);
			}
		}
		function fire_bullet(x, y, tankDirection) {
		  if (tankDirection == 'up') y-=20;
		  else if(tankDirection =='down') y+=20;
		  else if(tankDirection =='right') x+=20;
		  else if(tankDirection =='left') x-=20;
		  var bullet = {
		    'x':x,
		    'y':y,
		    'dir':tankDirection
		  }
		  bullets.push(bullet);
		}
		let handleKeyUp = (e) => {
		  	if(e.target.id !== 'tank')
				return;
		  if(e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 32) {
		    moving = false;
		  }
		}

		function createWallSegment(x, y) {
			context.fillStyle = 'orange';
		  context.fillRect(x, y, 100, 20);
			// context.fillRect(x, y, 4, 10);
			// context.fillRect(x, y, 6, 24);
			// context.fillRect(x, y, 6, 24);
		}

		draw();
		setInterval(draw, 10);
		createWallSegment(200, 600);
		document.addEventListener("keydown", handleKeydown, false);
		document.addEventListener("keyup", handleKeyUp, false);



	})

})()


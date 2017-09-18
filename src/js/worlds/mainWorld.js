'use strict';

define(['game', 'tank', 'bullets'], function(game, tank, bullets) {

	const mWorld = [
		[60, 60, 40, 60],
		[60, 160, 40, 200],
		[20, 400, 100, 40],
		[60, 480, 40, 80],
		[]
	];

	let img = document.getElementById('brick'),
		brick = game.context.createPattern(img,"repeat"),
		img2 = document.getElementById('border'),
		border = game.context.createPattern(img2,"repeat");

	function createWallSegment(x, y, w, h, ptrn) {
		game.context.fillStyle = ptrn;
		game.context.fillRect(x, y, w, h);
	}

	const drawBorders = () => {
		createWallSegment(0, 0, 600, 20, border);
		createWallSegment(0, 580, 600, 20, border);
		createWallSegment(0, 20, 20, 560, border);
		createWallSegment(580, 20, 20, 560, border);
	}

	const drawMWorld = () => {
		drawBorders();
		createWallSegment(500, 40, 40, 100, brick);
		mWorld.forEach((i) => {
			createWallSegment(i[0], i[1], i[2], i[3], brick);
		});
	}


	return { 
		draw: drawMWorld
	};

});
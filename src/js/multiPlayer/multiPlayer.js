'use strict';

define([ 'game', 'events', 'audio', 'mWorld', 'tank', 'multiPlayer_draw'], 
	function ( game, events, audio, mWorld, tank, multiPlayer_draw) {

	const init = () => {
		var socket = io();
	   	socket.emit('tank', 'hello client here');
	   	console.log('init here, tank emit done');
	   	multiPlayer_draw.start();
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
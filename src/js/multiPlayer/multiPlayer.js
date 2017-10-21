'use strict';

define([ 'game', 'events', 'audio', 'mWorld', 'tank'], 
	function ( game, events, audio, mWorld, tank) {

	const init = () => {
		var socket = io();
	   	socket.emit('tank', 'hello client here');
	   	console.log('init here, tank emit done');
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
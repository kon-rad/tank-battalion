'use strict';

define(['game', 'events', 'audio', 'mWorld', 'tank'], function (game, events, audio, mWorld, tank) {

	var init = function init() {
		var socket = io();
		socket.emit('tank', 'hello client here');
		console.log('init here, tank emit done');
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
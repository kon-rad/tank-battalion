'use strict';

define(['game', 'events', 'audio', 'mWorld', 'tank', 'multiPlayer_draw'], function (game, events, audio, mWorld, tank, multiPlayer_draw) {

	var init = function init() {
		var socket = io();
		socket.emit('tank', 'hello client here');
		console.log('init here, tank emit done');
		multiPlayer_draw.start();
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
'use strict';

define(['game', 'mWorld'], function() {

  document.app.audio = {};
  document.app.audio.muted = false;

	document.app.audio.move = new Audio('/assets/audio/move.wav');
	document.app.audio.shoot = new Audio('/assets/audio/shoot2.wav');
	document.app.audio.explode = new Audio('/assets/audio/explosion.wav');
	document.app.audio.start = new Audio('/assets/audio/up.wav');
	document.app.audio.point = new Audio('/assets/audio/point.wav');
	document.app.audio.dud = new Audio('/assets/audio/dud.wav');

  document.app.audio.move.volume = 0.3;
  document.app.audio.shoot.volume = 0.3;
  document.app.audio.explode.volume = 0.2;
  document.app.audio.start.volume = 0.4;
});
'use strict';

define(['game', 'mWorld'], function() {

    const AUDIO_ROOT = '/assets/audio';
    document.app.audio = {};
    document.app.audio.muted = false;

    document.app.audio.move = new Audio(AUDIO_ROOT + '/move.wav');
    document.app.audio.shoot = new Audio(AUDIO_ROOT + '/shoot2.wav');
    document.app.audio.explode = new Audio(AUDIO_ROOT + '/explosion.wav');
    document.app.audio.start = new Audio(AUDIO_ROOT + '/up.wav');
    document.app.audio.point = new Audio(AUDIO_ROOT + '/point.wav');
    document.app.audio.dud = new Audio(AUDIO_ROOT + '/dud.wav');

    document.app.audio.move.volume = 0.3;
    document.app.audio.shoot.volume = 0.3;
    document.app.audio.explode.volume = 0.2;
    document.app.audio.start.volume = 0.4;
});

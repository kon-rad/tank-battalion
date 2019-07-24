'use strict';

window.app = {};
const AUDIO_ROOT = '/assets/audio';

window.app.audio = {};
window.app.audio.muted = false;

window.app.audio.move = new Audio(AUDIO_ROOT + '/move.wav');
window.app.audio.shoot = new Audio(AUDIO_ROOT + '/shoot2.wav');
window.app.audio.explode = new Audio(AUDIO_ROOT + '/explosion.wav');
window.app.audio.start = new Audio(AUDIO_ROOT + '/up.wav');
window.app.audio.point = new Audio(AUDIO_ROOT + '/point.wav');
window.app.audio.dud = new Audio(AUDIO_ROOT + '/dud.wav');

window.app.audio.move.volume = 0.3;
window.app.audio.shoot.volume = 0.3;
window.app.audio.explode.volume = 0.2;
window.app.audio.start.volume = 0.4;

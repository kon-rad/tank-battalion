window.app = {};
const AUDIO_ROOT = '/assets/audio';

window.app.audio = {};
window.app.audio.muted = false;
const AUDIO_FILES = [
  { name: 'move', file: '/move.wav' },
  { name: 'shoot', file: '/shoot2.wav' },
  { name: 'explode', file: '/explosion.wav' },
  { name: 'start', file: '/up.wav' },
  { name: 'point', file: '/point.wav' },
  { name: 'dud', file: '/dud.wav' },
];

AUDIO_FILES.forEach(({ name, file }) => {
  window.app.audio[name] = new Audio(AUDIO_ROOT + file);
});

window.app.audio.move.volume = 0.3;
window.app.audio.shoot.volume = 0.3;
window.app.audio.explode.volume = 0.2;
window.app.audio.start.volume = 0.4;

'use strict';

// Mute Button
const toggleAudio = () => muteAudio(document.app.audio.muted);

/**
 * Audio control, mute/unmute and set button logo
 * @param {boolean} b 
 */
function muteAudio(b) {
  b = b ? false : true;
  const ad = document.app.audio;
  ad.muted = b;
  ad.shoot.muted = b;
  ad.move.muted = b;
  ad.explode.muted = b;
  ad.start.muted = b;
  ad.point.muted = b;
  ad.start.muted = b;
  document.getElementsByClassName('mute')[0].innerText = b ? ' 🔊' : ' 🔇';
}

// Pause Button
const pauseButton = document.getElementsByClassName('pause_button')[0];
pauseButton.addEventListener('click', (() => { document.game.pause = !document.game.pause; }), false);
// Exit Button
const exitButton = document.getElementsByClassName('exit_button')[0];
exitButton.addEventListener('click', (() => { document.game.exit = true; }), false);

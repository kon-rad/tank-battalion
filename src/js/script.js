'use strict';

// Mute Button
const toggleAudio = () => {
  if (document.app.audio.muted) {
    document.app.audio.muted = false;
    document.app.audio.shoot.muted = false;
    document.app.audio.move.muted = false;
    document.app.audio.explode.muted = false;
    document.app.audio.start.muted = false;
    document.app.audio.point.muted = false;
    document.app.audio.dud.muted = false;
    document.getElementsByClassName('mute')[0].innerText =' 🔇';
  } else {
    document.app.audio.muted = true;
    document.app.audio.shoot.muted = true;
    document.app.audio.move.muted = true;
    document.app.audio.explode.muted = true;
    document.app.audio.start.muted = true;
    document.app.audio.point.muted = true;
    document.app.audio.start.muted = true;
    document.getElementsByClassName('mute')[0].innerText =' 🔊';
  }
};

// Pause Button
const pauseButton = document.getElementByClassName('pause_button')[0];

function pauseGame() {

}
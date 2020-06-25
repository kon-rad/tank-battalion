'use strict';

// Mute Button - called from html
const toggleAudio = () => muteAudio(window.app.audio.muted);

/**
 * Audio control, mute/unmute and set button logo
 * @param {boolean} b
 */
function muteAudio(b) {
    b = !b;
    const ad = window.app.audio;
    ad.muted = b;
    ad.shoot.muted = b;
    ad.move.muted = b;
    ad.explode.muted = b;
    ad.start.muted = b;
    ad.point.muted = b;
    ad.start.muted = b;
    document.getElementsByClassName('mute')[0].innerText = b ? ' 🔊' : ' 🔇';
}

const pauseButton = document.getElementsByClassName('pause_button')[0];
pauseButton.addEventListener(
    'click',
    () => {
        window.game.pause = !window.game.pause;
    },
    false
);
// Exit Button
const exitButton = document.getElementsByClassName('exit_button')[0];
exitButton.addEventListener(
    'click',
    () => {
        window.game.exit = true;
    },
    false
);

'use strict';


const toggleAudio = () => {
  if (document.app.shoot.muted) {
    document.app.shoot.muted = false;
  } else {
      document.app.shoot.muted = true;
  }
};
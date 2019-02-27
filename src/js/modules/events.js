'use strict';

define(['game', 'bullets', 'audio', 'multiPlayer_bullet'], function (game, bullets, audio, mpBullet) {

  window.addEventListener('keydown', function (e) {
    if (e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 40 || e.keyCode === 39) {
      e.preventDefault();
    }
  });

  const events = {};

  events.handleKeyUp = (e) => {
    if (
      e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68
      || e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 40 || e.keyCode === 39
    ) {
      if (game.multiplayer) {
        game.currentPlayer.moving = false;
        game.socket.emit('game-state', { player: game.currentPlayer });
      } else {
        game.moving = false;
      }
      document.app.audio.move.pause();
    }
  };

  events.handleKeydown = (e) => {
    if (game.multiplayer) {
      handleKeydownMultiplayer(e);
      return;
    }
    handleKeydownSingle(e);
  };

  events.initListeners = () => {
    document.addEventListener("keydown", events.handleKeydown, false);
    document.addEventListener("keyup", events.handleKeyUp, false);
  };

  events.clearListeners = () => {
    document.removeEventListener("keydown", events.handleKeydown, false);
    document.removeEventListener("keyup", events.handleKeyUp, false);
  };

  const handleFireBullet = () => {
    if (game.multiplayer && !game.currentUser.bulletFired) {
      mpBullet.fireBullet();
      document.app.audio.shoot.play();
    } else if (!game.multiplayer) {
      bullets.fireBullet(game.x, game.y, game.tankDirection);
      game.bullets_fired = true;
      document.app.audio.shoot.play();
    }
  };



  function handleKeydownMultiplayer(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        game.currentPlayer.moving = true;
        game.currentPlayer.tankDirection = 'up';
        game.socket.emit('game-state', { player: game.currentPlayer });
        document.app.audio.move.play();
        break;
      case 37:
      case 65:
        game.currentPlayer.moving = true;
        game.currentPlayer.tankDirection = 'left';
        game.socket.emit('game-state', { player: game.currentPlayer });
        document.app.audio.move.play();
        break;
      case 40:
      case 83:
        game.currentPlayer.moving = true;
        game.currentPlayer.tankDirection = 'down';
        game.socket.emit('game-state', { player: game.currentPlayer });
        document.app.audio.move.play();
        break;
      case 39:
      case 68:
        game.currentPlayer.moving = true;
        game.currentPlayer.tankDirection = 'right';
        game.socket.emit('game-state', { player: game.currentPlayer });
        document.app.audio.move.play();
        break;
      case 32:
        handleFireBullet();
        break;
    }
  }

  function handleKeydownSingle(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        game.moving = true;
        game.tankDirection = 'up';
        document.app.audio.move.play();
        break;
      case 37:
      case 65:
        game.moving = true;
        game.tankDirection = 'left';
        document.app.audio.move.play();
        break;
      case 40:
      case 83:
        game.moving = true;
        game.tankDirection = 'down';
        document.app.audio.move.play();
        break;
      case 39:
      case 68:
        game.moving = true;
        game.tankDirection = 'right';
        document.app.audio.move.play();
        break;
      case 32:
        handleFireBullet();
        break;
    }
  }

  return events;
});
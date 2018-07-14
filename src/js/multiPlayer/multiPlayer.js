'use strict';


define(['game', 'events', 'audio', 'mWorld', 'tank', 'multiPlayer_draw'],
  function (game, events, audio, mWorld, tank, multiPlayer_draw) {

    const init = () => {
      multiPlayer_draw.start();
      game.socket.on('player-disconnected', () => {
        const mpDisplay = document.getElementById('mpS');
        mpDisplay.innerHTML = '';
      });
      game.socket.on('send-game-state', (gameState) => {
        game.mpPlayers = gameState.players;
        game.mpWorld = gameState.world;
        game.users = gameState.users;
        game.mpBullets = gameState.bullets;
        game.currentPlayer = gameState.players[game.mpCurrentId];
        game.currentUser = gameState.users[game.mpCurrentId];
        displayMultiplayer();
      });
      game.multiplayer = true;
    };

    const displayMultiplayer = () => {
      const mpDisplay = document.getElementById('mpS');
      for (let key in game.users) {
        let user = game.users[key];
        let userId = 'mpS_' + user.id;
        let userIdScore = 'mpS_' + user.id + '_score';
        let userIdLives = 'mpS_' + user.id + '_lives';
        let userDisplay = '';
        if (document.getElementById(userId)) {
          if (parseInt(document.getElementById(userIdScore).innerHTML) !== user.points) {
            document.getElementById(userIdScore).innerHTML = user.points;
          }
          if (parseInt(document.getElementById(userIdLives).innerHTML) !== user.lives) {
            if (user.lives < 0) {
              mpDisplay.innerHTML = '';
            } else {
              document.getElementById(userIdLives).innerHTML = user.lives;
            }
          }

          if (user.lives < 0) {
            mpDisplay.innerHTML = '';
          }
        } else {
          userDisplay = '<div id="' + userId + '"class="mpS__user"><span>user:</span>'
            + user.name + '<div class="mpS__display"><div class="mpS__score"><span>score</span><span id="' + userIdScore + '"> ' + user.points + '</span></div>'
            + '<div class="mpS__lives"><span>lives</span><span id="' + userIdLives + '"> ' + user.lives + '</span></div></div></div>';
          mpDisplay.innerHTML += userDisplay;
        }
      }
    };

    const draw = {
      start: () => {
        console.log('draw start executed');
      }
    };

    return {
      init: init,
      draw: draw
    };
  });
'use strict';

const checkBulletCollision = (x, y, dir, gameState, i) => {
  y = Math.floor(y / 10);
  x = Math.floor(x / 10);

  // check if bullet went out of bounds
  if (x <= 0 || x >= 60 || y <= 0 || y >= 60) {
    gameState.bullets.splice(i, 1);
    return true;
  }
  let row = (gameState.world[y]);
  row = row.split('');
  let pos = Number(row[x]);

  // check if bullet hit wall
  if (pos) {
    gameState.bullets.splice(i, 1);
    row[x] = '0';
    if (dir === 'up' || dir === 'down') {
      row[x - 1] = '0';
      row[x + 1] = '0';
    } else if (dir === 'left' || dir === 'right') {
      eraseBlock(x, y - 1, gameState);
      eraseBlock(x, y + 1, gameState);
    }
    row = row.join('');
    gameState.world[y] = row;
    return true;
  }

  // check if bullet hit other player
  let playersLen = gameState.players.length;
  let k = 0;
  for (k; k < playersLen; k++) {
    let p = gameState.players[k];
    if (p.id === gameState.bullets[i].id) {
      continue;
    }
    let p_x = Math.floor(p.x / 10);
    let p_y = Math.floor(p.y / 10);
    if ((x === p_x || x === p_x + 1 || x === p_x - 1) && (y === p_y || y === p_y + 1 || y === p_y - 1)) {
      gameState.players[k].moving = false;
      gameState.game.users[gameState.players[k].id].lives -= 1;

      gameState.game.explosion.exe = true;
      gameState.game.explosion.x = (x * 10);
      gameState.game.explosion.y = (y * 10);

      gameState.game.users[gameState.bullets[i].id].points += 1;
      gameState.bullets.splice(i, 1);
      return true;
    }
  }
  return false;
};

const eraseBlock = (x, y, gameState) => {
  let row = gameState.world[y];
  row = row.split('');
  row[x] = '0';
  row = row.join('');
  gameState.world[y] = row;
};

const gameUpdate = (gameState) => {
  const speed = 5;

  // update bullet speed and check for collisions
  for (let i = 0; i < gameState.bullets.length; i++) {
    const bulletId = gameState.bullets[i].id;
    switch (gameState.bullets[i].dir) {
      case 'up':
        gameState.bullets[i].y -= speed;
        break;
      case 'down':
        gameState.bullets[i].y += speed;
        break;
      case 'right':
        gameState.bullets[i].x += speed;
        break;
      case 'left':
        gameState.bullets[i].x -= speed;
        break;
    }
    let x = gameState.bullets[i].x, y = gameState.bullets[i].y;

    if (checkBulletCollision(x, y, gameState.bullets[i].dir, gameState, i)) {
      for(let n = 0; n < gameState.players.length; n++) {
        if (gameState.players[n].id === bulletId) {
          gameState.players[n].bulletFired = false;
          gameState.players[n].explosion = {
            exe: true,
            x: x,
            y: y
          };
          break;
        }
      }
    }
  }

  return gameState;
};

module.exports = gameUpdate;
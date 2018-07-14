const worldData = require('./worldData');

class GameState {
  constructor() {
    this.players = {};
    this.bullets = {};
    this.world = worldData.slice();
    this.users = {};
  }

  addPlayer(player) {
    this.players[player.id] = player;
  }

  updatePlayerPosition(playerState) {
    this.players[playerState.id] = playerState;
  }

  updateBullets(bullet) {
    this.bullets[bullet.id] = bullet;
    this.users[bullet.id].bulletFired = true;
  }

  updateExplosion(newExplosionState) {
    this.users[newExplosionState.id].explosion = newExplosionState.explosion;
  }
}

module.exports = GameState;
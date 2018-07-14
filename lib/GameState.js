const worldData = require('./worldData');

class GameState {
  constructor() {
    this.players = [];
    this.bullets = [];
    this.world = worldData.slice();
    this.game = {
      users: {},
      explosion: {
        exe: false,
        x: 0,
        y: 0
      }
    };
  }

  addPlayer(player) {
    this.players = this.players.concat(player);
  }

  getPlayers() {
    return this.players
  }

  getPlayer(id) {
    return this.players.find((person) => {
      return person.id === id
    })
  }

  updatePlayer(id, playerState) {
    this.game.users[playerState.id] = playerState;
    let len = this.players.length;
    for(let i = 0; i < len; i++) {
      if(this.players[i].id == id) {
        this.players[i] = playerState;
      }
    }
  }

  updateBullets(bullet) {
    this.bullets = this.bullets.concat(bullet);
  }
}

module.exports = GameState;
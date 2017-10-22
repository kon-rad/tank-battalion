const worldData = require('./worldData');

class GameState {
  constructor() {
    this.players = []
    this.world = worldData;
  }

  addPlayer(player) {
    this.players.push(player)
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
    let len = this.players.length;
    for(let i = 0; i < len; i++) {
      if(this.players[i].id == id) {
        this.players[i] = playerState;
      }
    }
  }

  updateWorld(wUpdate) {
    this.world = wUpdate;
  }
}

module.exports = GameState;
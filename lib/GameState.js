module.exports = class GameState {
  constructor() {
    this.players = []
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
}
const mapData = require('./mapData');

class GameState {
    constructor() {
        this.players = {};
        this.bullets = {};
        this.map = mapData.slice();
        this.users = {};
    }

    addPlayer(player) {
        this.players[player.id] = player;
    }

    addUser(user) {
        this.users[user.id] = user;
    }

    updatePlayerPosition(playerState) {
        this.players[playerState.id] = playerState;
    }

    updateBullets(bullet) {
        this.bullets[bullet.id] = bullet;
        this.users[bullet.id].bulletFired = true;
    }

    updateExplosion(newExplosionState) {
        this.users[newExplosionState.id].explosion =
            newExplosionState.explosion;
    }
}

module.exports = GameState;

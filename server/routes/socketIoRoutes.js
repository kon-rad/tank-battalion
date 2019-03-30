const Player = require('../lib/Player');
const User = require('../lib/User');
const GameState = require('../lib/GameState');
const gameUpdate = require('../lib/gameUpdate');

let playerSockets = [];
let gameState = new GameState();
const spawnPosition = [
    { x: 100, y: 580 },
    { x: 580, y: 300 },
    { x: 20, y: 350 },
    { x: 300, y: 20 }
];
let xy = Math.floor(Math.random() * 4);

let render = 0;
const renderFn = io => {
    render = setInterval(() => {
        gameState = gameUpdate(gameState);
        io.emit('send-game-state', gameState);
    }, 100);
};

module.exports = io => {
    io.on('connection', function(socket) {
        io.emit('msg', 'user connected');

        /**
         * User disconnected.
         */
        socket.on('disconnect', () => {
            let player = playerSockets.find(function(player) {
                return player.socket === socket;
            });
            if (player === undefined) return new Error();
            delete gameState.players[player.id];
            delete gameState.users[player.id];
            io.emit('player-disconnected', { id: socket.id });
        });

        /**
         *  User Created.
         */
        socket.on('create-player', function(data) {
            let id = socket.id;
            playerSockets.push({ id: id, socket: socket });
            xy = xy + 1 >= 4 ? 0 : xy + 1;
            let posX = spawnPosition[xy].x,
                posY = spawnPosition[xy].y;
            gameState.addPlayer(new Player(id, posX, posY, data.color));
            gameState.addUser(new User(id, data.name, data.color));
            socket.emit('player-created', {
                gameState: gameState,
                id: id
            });
        });

        /**
         *  Update Player and Game States.
         */
        socket.on('game-state', function(newGameState) {
            gameState.updatePlayerPosition(newGameState.player);
        });

        /**
         *  Update Bullet State.
         */
        socket.on('bullet-fired', function(newBullet) {
            gameState.updateBullets(newBullet);
        });

        /**
         *  Update Player and Game States.
         */
        socket.on('explosion-update', function(newExplosionState) {
            gameState.updateExplosion(newExplosionState);
        });
    });

    renderFn(io);
};

// This module contains various game settings and commonly used functions

// General game settings
const game = {};
window.game = game;
game.canvas = document.getElementById('tank');
game.context = game.canvas.getContext('2d');
game.cw = game.canvas.width;
game.ch = game.canvas.height;
game.tankDirection = false;
game.moving = false;
game.bullets = [];
game.bool = true;
game.time = 0;
game.bullets_fired = false;
game.paused = false;
game.exit = false;
game.timer = setInterval(function() {
    game.time += 100;
}, 100);

// Speed Settings
game.enemy_bullet_speed = 10;
game.enemy_speed = 8;
game.bullet_speed = 10;
game.playerOneSpeed = 14;

// Single player game state
game.randomBotPosition = () => {
    let num = Math.floor(Math.random() * 6);
    const positions = [
        { x: 200, y: 20 },
        { x: 400, y: 20 },
        { x: 180, y: 200 },
        { x: 20, y: 240 },
        { x: 300, y: 70 },
        { x: 580, y: 200 }
    ];
    return positions[num];
};
game.display_bots = document.getElementsByClassName('score__enemy_tank');
game.numberOfBotsLoaded = 20;
game.bots_on_screen = -1;
game.playerOnePoints = 0;
game.playerOneLives = 0;
game.newGame = false;
game.eagle1_y = 57;
game.eagle1_x = 28;
game.newRound = false;
game.round = 1;
game.difficulty = 0;
game.bots_loaded = 0;
game.onePlayerBegin = false;
game.round_display = document.getElementById('score__round_num');
game.score_num = document.getElementById('score__current_num');
game.high_num = document.getElementById('score__high_num');
game.timeBetweenBotSpawn = 1000;

// Set focus to canvas
game.canvas.setAttribute('tabindex', '0');
game.canvas.focus();

// Multiplayer game state
game.multiplayer = false;
game.mpBullets = [];

export default game;

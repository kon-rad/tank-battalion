import game from 'modules/game';
import events from 'modules/events';
import map from 'maps/map';
import tank from 'modules/tank';
import draw from 'modules/draw';
import singlePlayer from 'singlePlayer';
import multiPlayer from 'multiPlayer';

const display = document.getElementById('display_text');
const display_lives = document.getElementsByClassName('score__lives_tank');
let startGame;

const control = () => {
    // instructions modal open/close listeners
    const inst_modal_button = document.getElementById(
        'instructions_button'
    );
    const inst_modal_close = document.getElementById(
        'instructions_modal__close'
    );
    inst_modal_button.addEventListener('click', showInstructions);
    inst_modal_close.addEventListener('click', hideInstructions);

    display.innerHTML =
        '<div class="display_text__1player">' +
        'SINGLE PLAYER</div></br></br>' +
        '<div class="display_text__2player">MULTIPLAYER</div>';

    const onePlayer = document.getElementsByClassName(
        'display_text__1player'
    )[0];
    const multiPlayer = document.getElementsByClassName(
        'display_text__2player'
    )[0];
    onePlayer.addEventListener('click', startOnePlayer);
    multiPlayer.addEventListener('click', startMultiPlayer);
    startScreen();
};

const showInstructions = () => {
    const instructions_modal = document.getElementById(
        'instructions_modal'
    );
    instructions_modal.style.display = 'block';
};

const hideInstructions = () => {
    const instructions_modal = document.getElementById(
        'instructions_modal'
    );
    instructions_modal.style.display = 'none';
};

const startScreen = () => {
    game.context.fillStyle = '#000';
    game.context.fillRect(0, 0, game.cw, game.ch);
    game.mapData = map.parent.slice();
    // delay to fix bug where bricks are not appearing
    setTimeout(() => map.draw(game.mapData), 100);
};

const loading = () => {
    game.context.fillStyle = '#000';
    game.context.fillRect(0, 0, game.cw, game.ch);
    map.draw(game.mapData);
    if (game.bool) {
        game.bool = false;
        tank.moving_up(game.x, game.y);
    } else {
        game.bool = true;
    }
};

const startOnePlayer = () => {
    window.game.pause = false;
    window.game.exit = false;
    game.playerOneLives = 3;
    game.bullets = [];
    game.bots_destroyed = 0;
    game.bots_on_screen = 0;
    game.round = 1;
    game.round_display.innerHTML = game.round;
    game.difficulty = 0;
    if (parseInt(game.high_num.innerHTML) <= game.playerOnePoints * 10) {
        game.high_num.innerHTML = game.playerOnePoints * 10;
    }
    game.playerOnePoints = 0;
    game.score_num.innerHTML = game.playerOnePoints * 10;
    restorePlayerOneLives();
    restoreOnScreenBots();
    restoreDestroyedBots();
    loadOnePlayer();
};

const startMultiPlayer = () => {
    game.difficulty = 0;
    loadMultiplayerMenu();

    if (parseInt(game.high_num.innerHTML) <= game.playerOnePoints * 10) {
        game.high_num.innerHTML = game.playerOnePoints * 10;
    }
};

const loadMultiplayer = (name, color) => {
    let plr = {};
    plr.color = color;
    plr.name = name;

    game.socket = io();
    game.socket.emit('create-player', plr);

    window.app.audio.start.play();
    game.canvas.setAttribute('tabindex', '0');
    game.canvas.focus();
    game.socket.on('player-created', function(data) {
        game.currentPlayer = data.gameState.players[data.id];
        game.mpCurrentId = data.id;
        game.mpPlayers = data.gameState.players;
        game.mpmap = data.gameState.map;
        game.users = data.gameState.users;
        game.mpBullets = data.gameState.bullets;
        map.draw(game.mpmap);
    });
    let displayScore = document.getElementById('singlePlayerScore');
    displayScore.style.display = 'none';
    multiPlayer.init();
};

const reset = () => {
    game.socket.disconnect();
    location.reload();
};

const loadOnePlayer = () => {
    if (game.playerOneLives <= 0 && !game.newRound) {
        singlePlayer.ai.bots = [];
        return gameOver();
    }
    if (game.newRound) {
        game.newRound = false;
        game.round_display.innerHTML = game.round;
        game.difficulty += 0.2;
        game.playerOneLives = 3;
        game.bots_destroyed = 0;
        game.bots_loaded = 0;
        game.bots_on_screen = 0;
        restorePlayerOneLives();
        restoreOnScreenBots();
        restoreDestroyedBots();
        events.initListeners();
        game.mapData = map.parent.slice();
        map.draw(game.mapData);
        game.bots_loaded = 0;

        if (game.round >= 5) {
            return youWin();
        }
    }
    game.bots_on_screen = game.bots_destroyed;
    game.bots_loaded = game.bots_on_screen;
    game.playerOneLives--;
    display_lives[game.playerOneLives].style.display = 'none';
    restoreOnScreenBots();
    let posX = [100, 200, 440, 560];
    game.x = posX[Math.floor(Math.random() * 4)];
    game.y = 580;
    game.bullets = [];
    game.bullets_fired = false;
    display.innerHTML = '';
    startGame = setInterval(loading, 100);
    setTimeout(clearLoading, 1400);
};


const clearLoading = () => {
    clearInterval(startGame);
    events.initListeners();
    singlePlayer.ai.bots = [];
    singlePlayer.init();
    window.app.audio.start.play();
    game.canvas.setAttribute('tabindex', '0');
    game.canvas.focus();
    tank.moving_up(game.x, game.y);
    game.tankDirection = 'up';
    draw.start();
}

const restoreOnScreenBots = () => {
    [...game.display_bots].forEach(bot => {
        if (bot.classList.contains('on_screen')) {
            bot.classList.remove('on_screen');
        }
    });
};
const restoreDestroyedBots = () => {
    [...game.display_bots].forEach(bot => {
        if (bot.style.visibility === 'hidden') {
            bot.style.visibility = 'visible';
        }
    });
};

const restorePlayerOneLives = () => {
    [...display_lives].forEach(life => {
        life.style.display = 'block';
    });
};

const youWin = () => {
    display.innerHTML =
        '<div id="win" class="display_text__1player_win">' +
        'You Won the Game!</div>';
    const win = document.getElementById('win');
    win.addEventListener('click', control);
};

const gameOver = () => {
    display.innerHTML =
        '<div id="win" class="display_text__1player_win">' +
        'Game Over!</div>';
    const win = document.getElementById('win');
    win.addEventListener('click', control);
    game.bullets = [];
    game.bots_destroyed = 0;
    game.bots_on_screen = 0;
    game.playerOnePoints = 0;
    game.score_num.innerHTML = game.playerOnePoints * 10;
    restorePlayerOneLives();
    restoreOnScreenBots();
    restoreDestroyedBots();
};

const restoreGame = () => {
    if (game.socket) {
        game.socket.disconnect();
    }
    restorePlayerOneLives();
    restoreOnScreenBots();
    restoreDestroyedBots();
    control();
};

const gameOverMultiplayer = () => {
    //Todo: create this
};

const loadMultiplayerMenu = () => {
    //Todo: remove this and activate exit button
    document.getElementsByClassName('pause_button')[0].style.display =
        'none';
    display.innerHTML =
        '<div class="display_text__multiplayerMenu"><input id="mpName"' +
        ' type="text" placeholder="Username"><select id="mpColor" name="mpColor">' +
        '<option value="#76ff03">neon green</option>' +
        '<option value="#7b1fa2">purple</option>' +
        '<option value="#03a9f4">blue</option>' +
        '<option value="#e91e63">pink</option>' +
        '</select><button id="mpSubmit">Enter</button></div>';
    let mpForm = document.getElementById('mpSubmit');
    mpForm.addEventListener('click', mpFormSubmit);
};

const mpFormSubmit = () => {
    loadMultiplayer(
        document.getElementById('mpName').value,
        document.getElementById('mpColor').value
    );
    events.initListeners();
    display.innerHTML = '';
};

const setup = {
    control,
    loadOnePlayer,
    reset,
    restoreGame,
};

export default setup;
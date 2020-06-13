import game from 'modules/game';
import multiPlayerDraw from './multiPlayerDraw';

const MULTIPLAYER_DISPLAY = document.getElementById('mpS');

const init = () => {
    multiPlayerDraw.start();

    game.socket.on('player-disconnected', () => {
        MULTIPLAYER_DISPLAY.innerHTML = '';
    });

    game.socket.on('send-game-state', gameState => {
        game.mpPlayers = gameState.players;
        game.mpmap = gameState.map;
        game.users = gameState.users;
        game.mpBullets = gameState.bullets;
        game.currentUser = gameState.users[game.mpCurrentId];
        displayMultiplayer();
    });

    game.multiplayer = true;
};

const displayMultiplayer = () => {
    for (let key in game.users) {
        let user = game.users[key];
        let userId = 'mpS_' + user.id;
        let userIdScore = 'mpS_' + user.id + '_score';
        let userIdLives = 'mpS_' + user.id + '_lives';
        let userDisplay = '';
        const USER_SCORE_ELEMENT = document.getElementById(userIdScore);
        const USER_LIVES_ELEMENT = document.getElementById(userIdLives);
        if (document.getElementById(userId)) {
            const USER_SCORE = parseInt(USER_SCORE_ELEMENT.innerHTML);
            const USER_LIVES = parseInt(USER_LIVES_ELEMENT.innerHTML);
            if (USER_SCORE !== user.points) {
                USER_SCORE_ELEMENT.innerHTML = user.points;
            }

            if (USER_LIVES !== user.lives && user.lives >= 0) {
                USER_LIVES_ELEMENT.innerHTML = user.lives;
            }

            if (user.lives < 0) {
                MULTIPLAYER_DISPLAY.innerHTML = '';
            }
        } else {
            userDisplay =
                '<div id="' +
                userId +
                '"class="mpS__user"><span>user:</span>' +
                user.name +
                '<div class="mpS__display"><div class="mpS__score"><span>score</span><span id="' +
                userIdScore +
                '"> ' +
                user.points +
                '</span></div>' +
                '<div class="mpS__lives"><span>lives</span><span id="' +
                userIdLives +
                '"> ' +
                user.lives +
                '</span></div></div></div>';
            MULTIPLAYER_DISPLAY.innerHTML += userDisplay;
        }
    }
};

const multiPlayer = {
    init: init
};

export default multiPlayer;

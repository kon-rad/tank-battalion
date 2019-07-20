'use strict';

const BULLET_SPEED = 15;

const checkBulletCollision = (x, y, dir, gameState, key) => {
    y = Math.floor(y / 10);
    x = Math.floor(x / 10);

    // check if bullet went out of bounds
    if (x <= 0 || x >= 60 || y <= 0 || y >= 60) {
        delete gameState.bullets[key];
        return true;
    }
    let row = gameState.map[y];
    row = row.split('');
    let pos = Number(row[x]);

    // check if bullet hit wall
    if (pos) {
        row[x] = '0';
        if (dir === 'up' || dir === 'down') {
            row[x - 1] = '0';
            row[x + 1] = '0';
        } else if (dir === 'left' || dir === 'right') {
            eraseBlock(x, y - 1, gameState);
            eraseBlock(x, y + 1, gameState);
        }
        row = row.join('');
        gameState.map[y] = row;
        delete gameState.bullets[key];
        return true;
    }

    // check if bullet hit other player
    for (let playKey in gameState.players) {
        if (playKey === key) {
            continue;
        }
        let otherPlayer = gameState.players[playKey];
        let p_x = Math.floor(otherPlayer.x / 10);
        let p_y = Math.floor(otherPlayer.y / 10);
        if (
            (x === p_x || x === p_x + 1 || x === p_x - 1) &&
            (y === p_y || y === p_y + 1 || y === p_y - 1)
        ) {
            gameState.players[playKey].moving = false;
            gameState.users[playKey].lives -= 1;

            gameState.users[key].points += 1;
            delete gameState.bullets[key];
            return true;
        }
    }
    return false;
};

const eraseBlock = (x, y, gameState) => {
    let row = gameState.map[y];
    row = row.split('');
    row[x] = '0';
    row = row.join('');
    gameState.map[y] = row;
};

const gameUpdate = gameState => {
    // update bullet speed and check for collisions
    for (let key in gameState.bullets) {
        let bullet = gameState.bullets[key];
        switch (bullet.dir) {
            case 'up':
                bullet.y -= BULLET_SPEED;
                break;
            case 'down':
                bullet.y += BULLET_SPEED;
                break;
            case 'right':
                bullet.x += BULLET_SPEED;
                break;
            case 'left':
                bullet.x -= BULLET_SPEED;
                break;
        }
        let x = bullet.x,
            y = bullet.y;

        if (checkBulletCollision(x, y, bullet.dir, gameState, key)) {
            gameState.users[key].bulletFired = false;
            gameState.users[key].explosion = {
                exe: true,
                x: x,
                y: y
            };
        }
    }

    return gameState;
};

module.exports = gameUpdate;

import game from 'modules/game';
import images from 'modules/images';
import singlePlayer from 'singlePlayer';

const bullets = {};
game.bullets_fired = false;
bullets.renderExplosion = false;

bullets.render_bullet = (bullet, b_i) => {
    let speed = game.bullet_speed;
    switch (bullet.dir) {
        case 'up':
            bullet.y -= speed;
            break;
        case 'down':
            bullet.y += speed;
            break;
        case 'right':
            bullet.x += speed;
            break;
        case 'left':
            bullet.x -= speed;
            break;
    }

    if (checkBulletCollision(bullet.x, bullet.y, b_i, bullet.dir)) {
        game.bullets_fired = false;
        // todo: make sure that these solve the errors in the console
        try {
            window.app.audio.explode.load();
            window.app.audio.explode.play();
        } catch (e) {
            console.error('error: ', e);
        }
    }

    game.context.beginPath();
    game.context.fillStyle = 'red';
    game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
    game.context.fill();
    game.context.closePath();
};

bullets.fireBullet = function(x, y, tankDirection) {
    if (tankDirection === 'up') y -= 2;
    else if (tankDirection === 'down') y += 2;
    else if (tankDirection === 'right') x += 2;
    else if (tankDirection === 'left') x -= 2;

    let bullet = {
        x: x,
        y: y,
        dir: tankDirection
    };

    game.bullets.push(bullet);
};

const checkBulletCollision = (x, y, b_i, dir) => {
    y = Math.floor(y / 10);
    x = Math.floor(x / 10);

    if (x <= 0 || x >= 60 || y <= 0 || y >= 60) {
        game.bullets.splice(b_i, 1);
        return true;
    }
    let row = game.mapData[y].split('');
    let pos = Number(row[x]);

    if (pos) {
        game.bullets.splice(b_i, 1);
        row[x] = '0';
        if (dir === 'up' || dir === 'down') {
            row[x - 1] = '0';
            row[x + 1] = '0';
        } else if (dir === 'left' || dir === 'right') {
            eraseBlock(x, y - 1);
            eraseBlock(x, y + 1);
        }
        row = row.join('');
        game.mapData[y] = row;
        bullets.renderExplosion = true;
        bullets.renderExplosion_x = x * 10;
        bullets.renderExplosion_y = y * 10;

        return true;
    }

    for (let k = 0, len = singlePlayer.ai.bots.length; k < len; k++) {
        const b = singlePlayer.ai.bots[k];
        const b_x = Math.floor(b.x / 10);
        const b_y = Math.floor(b.y / 10);
        if (b.moving
            && (x === b_x || x === b_x + 1 || x === b_x - 1)
            && (y === b_y || y === b_y + 1 || y === b_y - 1)
        ) {
            game.bullets.splice(b_i, 1);
            game.context.drawImage(
                images.bigRedExplosion,
                x * 10 - 10,
                y * 10 - 10
            );
            game.playerOnePoints++;
            game.bots_destroyed++;
            singlePlayer.ai.bots[k].moving = false;
            game.display_bots[game.bots_destroyed - 1].style.visibility =
                'hidden';
            game.score_num.innerHTML = game.playerOnePoints * 10;

            if (game.bots_destroyed >= game.numberOfBotsLoaded) {
                game.newRound = game.newGame = true;
                game.round++;
            }

            return true;
        }
    }

    return false;
};

const eraseBlock = (x, y) => {
    let row = game.mapData[y].split('');
    row[x] = '0';
    row = row.join('');
    game.mapData[y] = row;
};

export default bullets;

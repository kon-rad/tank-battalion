import game from 'modules/game';
import bullets from 'modules/bullets';
import images from 'modules/images';
import singlePlayer from 'singlePlayer';

const bot = {};

bot.moving_up = (x, y) => {
    game.context.fillStyle = 'blue';
    game.context.fillRect(x - 8, y - 8, 14, 14);
    game.context.fillRect(x - 2, y - 18, 4, 12);
    game.context.fillRect(x - 3, y - 20, 6, 3);
    game.context.fillRect(x - 12, y - 12, 6, 24);
    game.context.fillRect(x + 6, y - 12, 6, 24);
};

bot.moving_down = (x, y) => {
    game.context.fillStyle = 'blue';
    game.context.fillRect(x - 8, y - 7, 14, 14);
    game.context.fillRect(x - 2, y + 6, 4, 12);
    game.context.fillRect(x - 3, y + 18, 6, 3);
    game.context.fillRect(x - 12, y - 12, 6, 24);
    game.context.fillRect(x + 6, y - 12, 6, 24);
};

bot.moving_right = (x, y) => {
    game.context.fillStyle = 'blue';
    game.context.fillRect(x - 7, y - 6, 14, 14);
    game.context.fillRect(x + 7, y - 2, 13, 4);
    game.context.fillRect(x + 20, y - 4, 3, 8);
    game.context.fillRect(x - 12, y - 12, 24, 6);
    game.context.fillRect(x - 12, y + 8, 24, 6);
};

bot.moving_left = (x, y) => {
    game.context.fillStyle = 'blue';
    game.context.fillRect(x - 8, y - 6, 14, 14);
    game.context.fillRect(x - 20, y - 2, 12, 4);
    game.context.fillRect(x - 22, y - 4, 3, 8);
    game.context.fillRect(x - 12, y - 12, 24, 6);
    game.context.fillRect(x - 12, y + 8, 24, 6);
};


const render_bullet = (
    bullet,
    bullet_index,
    bot_index
) => {
    const speed = (game.difficulty + 1) * game.enemy_bullet_speed;
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
    if (
        checkBulletCollision(
            bullet.x,
            bullet.y,
            bullet_index,
            bullet.dir,
            bot_index
        )
    ) {
        singlePlayer.ai.bots[bot_index].bullets.splice(bullet_index, 1);

        try {
            window.app.audio.explode.load();
            window.app.audio.explode.play();
        } catch (e) {
            console.error('error: ', e);
        }
    }
    game.context.beginPath();
    game.context.fillStyle = 'orange';
    game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
    game.context.fill();
    game.context.closePath();
};

const checkBulletCollision = (
    x,
    y,
    bullet_index,
    dir,
    bot_index
) => {
    y = Math.floor(y / 10);
    x = Math.floor(x / 10);
    if (x <= 0 || x >= 60 || y <= 0 || y >= 60) {
        singlePlayer.ai.bots[bot_index].bullets.splice(bullet_index, 1);

        return false;
    }
    let row = game.mapData[y];
    row = row.split('');
    let pos = Number(row[x]);
    if (pos) {
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
    let player1_x = Math.floor(game.x / 10);
    let player1_y = Math.floor(game.y / 10);
    if (
        (player1_x === x || player1_x - 1 === x || player1_x + 1 === x) &&
        (player1_y === y || player1_y - 1 === y || player1_y + 1 === y)
    ) {
        game.context.drawImage(
            images.bigRedExplosion,
            x * 10 - 10,
            y * 10 - 10
        );
        game.newGame = true;
        return true;
    }
    if (
        (game.eagle1_x === x ||
            game.eagle1_x - 1 === x ||
            game.eagle1_x + 1 === x) &&
        (game.eagle1_y === y ||
            game.eagle1_y - 1 === y ||
            game.eagle1_y + 1 === y)
    ) {
        game.context.drawImage(
            images.bigRedExplosion,
            x * 10 - 10,
            y * 10 - 10
        );
        game.newGame = true;
        return true;
    }
    return false;
};

const eraseBlock = (x, y) => {
    let row = game.mapData[y];
    row = row.split('');
    row[x] = '0';
    row = row.join('');
    game.mapData[y] = row;
};

const render = (bot_i) => {
    switch (bot_i.dir) {
        case 'up':
            bot.moving_up(bot_i.x, bot_i.y);
            break;
        case 'down':
            bot.moving_down(bot_i.x, bot_i.y);
            break;
        case 'right':
            bot.moving_right(bot_i.x, bot_i.y);
            break;
        case 'left':
            bot.moving_left(bot_i.x, bot_i.y);
            break;
    }
};

const renderBot = {
    render: render,
    render_bullet: render_bullet
};

export default renderBot;

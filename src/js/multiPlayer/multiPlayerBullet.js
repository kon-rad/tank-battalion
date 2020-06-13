import game from 'modules/game';

const multiPlayerBullet = {};

multiPlayerBullet.renderMultiPlayerBullet = bullet => {
    game.context.beginPath();
    game.context.fillStyle = 'red';
    game.context.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
    game.context.fill();
    game.context.closePath();
};

multiPlayerBullet.fireBullet = () => {
    switch (game.currentPlayer.tankDirection) {
        case('up'):
            game.currentPlayer.y -= 2;
            break;
        case('down'):
            game.currentPlayer.y += 2;
            break;
        case('right'):
            game.currentPlayer.x += 2;
            break;
        case('left'):
            game.currentPlayer.x -= 2;
            break;
    }

    const bullet = {
        x: game.currentPlayer.x,
        y: game.currentPlayer.y,
        dir: game.currentPlayer.tankDirection,
        id: game.currentPlayer.id
    };
    game.currentUser.bulletFired = true;

    game.socket.emit('bullet-fired', bullet);
};

export default multiPlayerBullet;

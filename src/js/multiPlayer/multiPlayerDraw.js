import game from 'modules/game';
import tank from 'modules/tank';
import map from 'maps/map';
import mapBoundary from 'maps/mapBoundary';
import images from 'modules/images';
import setup from 'setup';
import multiPlayerBullet from './multiPlayerBullet';

const start = () => {
    game.multiPlayerGame = setInterval(go, 100);
};

const go = () => {
    game.context.fillStyle = '#000';
    game.context.fillRect(0, 0, game.cw, game.ch);
    map.draw(game.mpmap);

    /**
     * Render Current Player
     */
    if (game.users[game.mpCurrentId].lives < 0 || game.exit) {
        game.currentPlayer.moving = false;
        setup.reset();
    }

    if (game.currentPlayer.tankDirection === 'up') {
        if (game.currentPlayer.moving) {
            if (
                !mapBoundary.detect(
                    game.currentPlayer.x,
                    game.currentPlayer.y - 10,
                    game.currentPlayer.tankDir,
                    game.mpmap
                )
            ) {
                game.currentPlayer.y -= game.currentPlayer.speed;
                game.socket.emit('game-state', {
                    player: game.currentPlayer
                });
            }
        }
        tank.moving_up(
            game.currentPlayer.x,
            game.currentPlayer.y,
            game.currentPlayer.color
        );
    } else if (game.currentPlayer.tankDirection === 'down') {
        if (game.currentPlayer.moving) {
            if (
                !mapBoundary.detect(
                    game.currentPlayer.x,
                    game.currentPlayer.y + 10,
                    game.currentPlayer.tankDir,
                    game.mpmap
                )
            ) {
                game.currentPlayer.y += game.currentPlayer.speed;
                game.socket.emit('game-state', {
                    player: game.currentPlayer
                });
            }
        }
        tank.moving_down(
            game.currentPlayer.x,
            game.currentPlayer.y,
            game.currentPlayer.color
        );
    } else if (game.currentPlayer.tankDirection === 'right') {
        if (game.currentPlayer.moving) {
            if (
                !mapBoundary.detect(
                    game.currentPlayer.x + 15,
                    game.currentPlayer.y,
                    game.currentPlayer.tankDir,
                    game.mpmap
                )
            ) {
                game.currentPlayer.x += game.currentPlayer.speed;
                game.socket.emit('game-state', {
                    player: game.currentPlayer
                });
            }
        }
        tank.moving_right(
            game.currentPlayer.x,
            game.currentPlayer.y,
            game.currentPlayer.color
        );
    } else if (game.currentPlayer.tankDirection === 'left') {
        if (game.currentPlayer.moving) {
            if (
                !mapBoundary.detect(
                    game.currentPlayer.x - 15,
                    game.currentPlayer.y,
                    game.currentPlayer.tankDir,
                    game.mpmap
                )
            ) {
                game.currentPlayer.x -= game.currentPlayer.speed;
                game.socket.emit('game-state', {
                    player: game.currentPlayer
                });
            }
        }
        tank.moving_left(
            game.currentPlayer.x,
            game.currentPlayer.y,
            game.currentPlayer.color
        );
    }

    // draw bullets
    for (let bulKey in game.mpBullets) {
        multiPlayerBullet.renderMultiPlayerBullet(game.mpBullets[bulKey]);
    }

    // draw explosions and other tanks
    for (let key in game.users) {
        let user = game.users[key];
        if ('explosion' in user && user.explosion.exe) {
            try {
                window.app.audio.explode.load();
                window.app.audio.explode.play();
            } catch (e) {
                console.log('error: ', e);
            }
            game.context.drawImage(
                images.explosion,
                user.explosion.x - 10,
                user.explosion.y - 10
            );
            let newExplosionState = {
                id: key,
                explosion: { exe: false, x: -100, y: -100 }
            };

            game.socket.emit('explosion-update', newExplosionState);
        }
    }

    for (let key in game.mpPlayers) {
        let player = game.mpPlayers[key];
        if (key === game.mpCurrentId) continue;

        game.context.fillStyle = player.color;
        if (player.tankDirection === 'up') {
            tank.moving_up(player.x, player.y, player.color);
        } else if (player.tankDirection === 'down') {
            tank.moving_down(player.x, player.y, player.color);
        } else if (player.tankDirection === 'right') {
            tank.moving_right(player.x, player.y, player.color);
        } else if (player.tankDirection === 'left') {
            tank.moving_left(player.x, player.y, player.color);
        }
    }
};

const multiPlayerDraw = {
    start: start,
    go: go
};

export default multiPlayerDraw;

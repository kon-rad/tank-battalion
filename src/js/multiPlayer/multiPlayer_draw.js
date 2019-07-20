'use strict';

/**
 * This file renders the game for multi player mode, the function go runs every 100 ms
 */
define([
    'game',
    'tank',
    'mWorld',
    'mwObstacle',
    'images',
    'audio',
    'src/js/multiPlayer/multiPlayerBullet'
], function(game, tank, mWorld, mwObstacle, images, audio, mpBullet) {
    const start = () => {
        game.multiPlayerGame = setInterval(go, 100);
    };

    const go = () => {
        game.context.fillStyle = '#000';
        game.context.fillRect(0, 0, game.cw, game.ch);
        mWorld.draw(game.mpWorld);

        /**
         * Render Current Player
         */
        if (game.users[game.mpCurrentId].lives < 0 || game.exit) {
            game.currentPlayer.moving = false;
            require(['setup'], function(setup) {
                setup.reset();
            });
        }
        if (game.currentPlayer.tankDirection === 'up') {
            if (game.currentPlayer.moving) {
                if (
                    !mwObstacle.detect(
                        game.currentPlayer.x,
                        game.currentPlayer.y - 10,
                        game.currentPlayer.tankDir,
                        game.mpWorld
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
                    !mwObstacle.detect(
                        game.currentPlayer.x,
                        game.currentPlayer.y + 10,
                        game.currentPlayer.tankDir,
                        game.mpWorld
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
                    !mwObstacle.detect(
                        game.currentPlayer.x + 15,
                        game.currentPlayer.y,
                        game.currentPlayer.tankDir,
                        game.mpWorld
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
                    !mwObstacle.detect(
                        game.currentPlayer.x - 15,
                        game.currentPlayer.y,
                        game.currentPlayer.tankDir,
                        game.mpWorld
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

        /**
         *
         * render all other player bullets and tanks
         */

        // draw bullets
        for (let bulKey in game.mpBullets) {
            mpBullet.render_mpBullet(game.mpBullets[bulKey]);
        }

        // draw explosions and other tanks
        for (let key in game.users) {
            let user = game.users[key];
            if ('explosion' in user && user.explosion.exe) {
                document.app.audio.explode.load();
                document.app.audio.explode.play();
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
                console.log('player.color', player.color);
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

    return {
        start: start,
        go: go
    };
});

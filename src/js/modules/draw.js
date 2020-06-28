import game from 'modules/game';
import tank from 'modules/tank';
import bullets from 'modules/bullets';
import map from 'maps/map';
import mapBoundary from 'maps/mapBoundary';
import images from 'modules/images';
import events from 'modules/events';
import singlePlayer from 'singlePlayer';
import renderBot from 'singlePlayer/renderBot';
import setup from 'setup';

const start = () => {
    game.onePlayerGame = setInterval(go, 100);
};

const go = () => {
    // Handles game ending, starts new game
    if (game.newGame) {
        // game.explosion decides if to render an explosion
        if (game.explosion) {
            game.context.drawImage(
                images.explosion,
                game.x - 10,
                game.y - 10
            );
            game.explosion = false;
        }

        // clear repeating interval functions; reset game
        game.newGame = false;
        clearInterval(game.onePlayerGame);
        clearInterval(game.bots);
        clearInterval(game.loadBots);
        events.clearListeners();

        setup.loadOnePlayer();
    }
    if (game.pause) {
        clearInterval(game.onePlayerGame);
        clearInterval(game.bots);
        clearInterval(game.loadBots);
        events.clearListeners();
        game.checkGameUnpaused = setInterval(() => {
            if (game.pause) return;
            singlePlayer.init();
            start();
            events.initListeners();
            clearInterval(game.checkGameUnpaused);
        }, 1000);
    }
    if (game.exit) {
        game.exit = false;
        clearInterval(game.onePlayerGame);
        clearInterval(game.bots);
        clearInterval(game.loadBots);
        events.clearListeners();
        setup.restoreGame();
    }
    game.context.fillStyle = '#000';
    game.context.fillRect(0, 0, game.cw, game.ch);

    // renders map in current state
    map.draw(game.mapData);

    game.context.drawImage(images.eagle, 274, 566);
    if (bullets.renderExplosion) {
        game.context.drawImage(
            images.explosion,
            bullets.renderExplosion_x - 10,
            bullets.renderExplosion_y - 10
        );
        bullets.renderExplosion = false;
    }

    game.context.fillStyle = 'green';
    // renders tank and moves if game.moving is true
    moveTank();

    game.bullets.forEach((item, index) => {
        bullets.render_bullet(item, index);
    });

    const bots = singlePlayer.ai.bots;
    bots.forEach((bot, bot_index) => {
        if (bot.moving) {
            renderBot.render(bot);
        }

        bot.bullets.forEach((bullet, bullet_index) => {
            renderBot.render_bullet(bullet, bullet_index, bot_index);
        });
    });
};

/**
 * Move tank by one 'speed' increment if no obstacle is detected
 */
const moveTank = () => {
    let speed = game.playerOneSpeed;

    switch (game.tankDirection) {
        case 'up':
            if (game.moving
                && !mapBoundary.detect(
                    game.x,
                    game.y - 15,
                    game.tankDirection,
                    game.mapData
                )
            ) {
                game.y -= speed;
            }

            tank.moving_up(game.x, game.y);
            break;
        case 'down':
            if (game.moving
                && !mapBoundary.detect(
                    game.x,
                    game.y + 15,
                    game.tankDirection,
                    game.mapData
                )
            ) {
                game.y += speed;
            }
            tank.moving_down(game.x, game.y);
            break;
        case 'right':
            if (game.moving
                && !mapBoundary.detect(
                    game.x + 15,
                    game.y,
                    game.tankDirection,
                    game.mapData
                )
            ) {
                game.x += speed;
            }
            tank.moving_right(game.x, game.y);
            break;
        case 'left':
            if (game.moving
                && !mapBoundary.detect(
                    game.x - 15,
                    game.y,
                    game.tankDirection,
                    game.mapData
                )
            ) {
                game.x -= speed;
            }
            tank.moving_left(game.x, game.y);
            break;
    }
};

const draw = {
    start: start,
    go: go
};

export default draw;
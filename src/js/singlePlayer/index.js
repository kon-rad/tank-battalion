import game from 'modules/game';
import mapBoundary from 'maps/mapBoundary';

const ai = {};
ai.bots = [];

ai.elapsedTime = game.time;
ai.dir = ['up', 'down', 'right', 'left'];

const loadBot = () => {
    let dir = game.time % 2 === 0 ? 'right' : 'left';
    let loc = game.randomBotPosition();

    let bot = {
        id: game.time + '',
        index: ai.bots.length,
        dir: dir,
        moving: true,
        x: loc.x,
        y: loc.y,
        bullets: []
    };

    ai.bots.push(bot);
    game.bots_on_screen++;
    game.bots_loaded++;
    game.display_bots[game.bots_on_screen - 1].classList.add('on_screen');
};

const init = () => {
    const speed = (game.difficulty + 1) * game.enemy_speed;
    const detect_dist = 1 * 16;

    setTimeout(loadBot, 500);

    game.loadBots = setInterval(function() {
        loadBot();
        if (game.bots_loaded >= game.numberOfBotsLoaded) {
            clearInterval(game.loadBots);
        }
    }, game.timeBetweenBotSpawn);

    game.bots = setInterval(() => {
        ai.bots.forEach(bot => {
            if (!bot.moving) {
                return;
            }
            if (bot.dir === 'up') {
                // detect collision with player or eagle
                detectCollision(bot.x, bot.y - detect_dist);
                // detect collision with other enemy tanks
                if (detect(bot.x, bot.y - detect_dist, bot.index)) {
                    bot.y += 8;
                    bot.dir = 'down';
                    // detect collision with walls
                } else if (
                    mapBoundary.detect(
                        bot.x,
                        bot.y - detect_dist,
                        bot.dir,
                        game.mapData
                    )
                ) {
                    bot.y += speed;
                    bot.dir = getRandomDirection();
                } else {
                    bot.y -= speed;
                    if (shootRandomly()) {
                        shootBullet(bot.x, bot.y, bot.index, bot.dir);
                    }
                }
            } else if (bot.dir === 'down') {
                detectCollision(bot.x, bot.y + detect_dist);
                if (detect(bot.x, bot.y + detect_dist, bot.index)) {
                    bot.y -= 8;
                    bot.dir = 'up';
                } else if (
                    mapBoundary.detect(
                        bot.x,
                        bot.y + detect_dist,
                        bot.dir,
                        game.mapData
                    )
                ) {
                    bot.y -= speed;
                    bot.dir = getRandomDirection();
                } else {
                    bot.y += speed;
                    if (shootRandomly()) {
                        shootBullet(bot.x, bot.y, bot.index, bot.dir);
                    }
                }
            } else if (bot.dir === 'right') {
                detectCollision(bot.x + detect_dist, bot.y);
                if (detect(bot.x + detect_dist, bot.y, bot.index)) {
                    bot.x -= 8;
                    bot.dir = 'left';
                } else if (
                    mapBoundary.detect(
                        bot.x + detect_dist,
                        bot.y,
                        bot.dir,
                        game.mapData
                    )
                ) {
                    bot.x -= speed;
                    bot.dir = getRandomDirection();
                } else {
                    bot.x += speed;
                    if (shootRandomly()) {
                        shootBullet(bot.x, bot.y, bot.index, bot.dir);
                    }
                }
            } else if (bot.dir === 'left') {
                detectCollision(bot.x - detect_dist, bot.y);
                if (detect(bot.x - detect_dist, bot.y, bot.index)) {
                    bot.x += 8;
                    bot.dir = 'right';
                } else if (
                    mapBoundary.detect(
                        bot.x - detect_dist,
                        bot.y,
                        bot.dir,
                        game.mapData
                    )
                ) {
                    bot.x += speed;
                    bot.dir = getRandomDirection();
                } else {
                    bot.x -= speed;
                    if (shootRandomly()) {
                        shootBullet(bot.x, bot.y, bot.index, bot.dir);
                    }
                }
            }
        });
    }, 100);
};

const detect = (x, y, index) => {
    let len = ai.bots.length;
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    for (let k = 0; k < len; k++) {
        let b = ai.bots[k];
        let b_x = Math.floor(b.x / 10);
        let b_y = Math.floor(b.y / 10);
        if (
            b.moving &&
            (x === b_x || x === b_x + 1 || x === b_x - 1) &&
            (y === b_y || y === b_y + 1 || y === b_y - 1) &&
            k !== index
        ) {
            return true;
        }
    }

    return false;
};

const shootRandomly = () => {
    const random = Math.floor(Math.random() * (30 * (1 - game.difficulty)));
    return random === 7;
};

const shootBullet = (b_x, b_y, i, b_dir) => {
    if (b_dir === 'up') b_y -= 20;
    else if (b_dir === 'down') b_y += 20;
    else if (b_dir === 'right') b_x += 20;
    else if (b_dir === 'left') b_x -= 20;

    let bullet = {
        x: b_x,
        y: b_y,
        dir: b_dir
    };

    ai.bots[i].bullets.push(bullet);
};

const detectCollision = (x, y) => {
    const g_x = Math.floor(game.x / 10);
    const g_y = Math.floor(game.y / 10);
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    if (
        detectXandYCollision(g_x, g_y, x, y)
        || detectEagleCollision(game, x, y)
    ) {
        // Player is hit, life deducted and game restarts
        try {
            window.app.audio.explode.load();
            window.app.audio.explode.play();
        } catch (e) {
            console.log('error: ', e);
        }
        game.explosion = true;
        game.newGame = true;

        return true;
    }
};

const detectXandYCollision = (g_x, g_y, x, y) => {
    return (
        g_x === x ||
        g_x - 1 === x ||
        g_x + 1 === x ||
        g_x + 2 === x ||
        g_x - 2 === x)
        &&
        (g_y === y ||
        g_y - 1 === y ||
        g_y + 1 === y ||
        g_y + 2 === y ||
        g_y - 2 === y);
};

const detectEagleCollision = (game, x, y) => {
    return (
        game.eagle1_x === x ||
        game.eagle1_x - 1 === x ||
        game.eagle1_x + 1 === x ||
        game.eagle1_x + 2 === x ||
        game.eagle1_x - 2 === x)
        && (game.eagle1_y === y ||
        game.eagle1_y - 1 === y ||
        game.eagle1_y + 1 === y ||
        game.eagle1_y + 2 === y ||
        game.eagle1_y - 2 === y);
};

const getRandomDirection = () => {
    return ai.dir[Math.floor(Math.random() * 4)];
}

const singlePlayer = {
    init: init,
    ai: ai
};

export default singlePlayer;

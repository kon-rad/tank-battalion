/**
 * Images used in game play are stored here
 */
const EAGLE_FILE_PATH = 'assets/images/eagle.png';
const EXPLOSION_FILE_PATH = 'assets/images/explosion.png';
const RED_EXPLOSION_FILE_PATH = 'assets/images/big_red_explosion.png';
const WHITE_EXPLOSION_FILE_PATH = 'assets/images/big_white_explosion.png';

const eagle = new Image();
eagle.src = EAGLE_FILE_PATH;

const explosion = new Image();
explosion.src = EXPLOSION_FILE_PATH;

const bigRedExplosion = new Image();
bigRedExplosion.src = RED_EXPLOSION_FILE_PATH;

const bigWhiteExplosion = new Image();
bigWhiteExplosion.src = WHITE_EXPLOSION_FILE_PATH;

const images = {
    eagle,
    explosion,
    bigRedExplosion,
    bigWhiteExplosion,
};

export default images;
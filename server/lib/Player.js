module.exports = class Player {
    constructor(id, x, y, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.tankDirection = 'up';
        this.speed = 10;
        this.moving = false;
    }
};

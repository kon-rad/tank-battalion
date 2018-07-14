module.exports = class Player {

  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.tankDirection = 'up';
    this.speed = 10;
    this.moving = false;
  }
};

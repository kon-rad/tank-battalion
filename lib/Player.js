module.exports = class Player {
  constructor(id, x, y, tankDirection, speed, moving, color, bullet, bulletFired) {
    this.id = id
    this.x = x
    this.y = y
    this.color = color
    this.tankDirection = tankDirection
    this.speed = speed
    this.moving = moving
    this.bullet = bullet
    this.bulletFired = bulletFired
    this.explosion = null;
    this.hit = false;
    this.points = 0;
    this.hits = 0;
  }
}

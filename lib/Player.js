module.exports = class Player {
  constructor(id, x, y, tankDirection, speed, moving, color) {
    this.id = id
    this.x = x
    this.y = y
    this.color = color
    this.tankDirection = tankDirection
    this.speed = speed
    this.moving = moving
  }
}

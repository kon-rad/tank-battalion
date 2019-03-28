module.exports = class User {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.points = 0;
        this.lives = 3;
        this.explosion = { exe: false };
        this.bulletFired = false;
    }
};

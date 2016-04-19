var SHURIKEN_DAMAGE = 60;
var SHURIKEN_SPEED = 30;
var SHURIKEN_IMAGE = "kunay.gif";
var SHURIKEN_WIDTH = 15;
var SHURIKEN_HEIGHT = 15;

function Shuriken(x, y, FPS, direction) {

    Weapon.call(x, y, KUNAI_DAMAGE, KUNAI_SPEED, KUNAI_WIDTH, KUNAI_HEIGHT, direction);

    this.x = x;
    this.y = y;
    this.width = KUNAI_WIDTH;
    this.height = SHURIKEN_DAMAGE;
    this.damage = SHURIKEN_DAMAGE;
    this.speed = SHURIKEN_SPEED;
    this.image = new Image();
    this.direction = direction
    this.image.src = "shuriken.png";
    this.width = SHURIKEN_WIDTH;
    this.height = SHURIKEN_HEIGHT;
    this.FPS = FPS;
    this.direction = direction;
    this.selfshu = this;

}

Shuriken.prototype.traceLine = function () {

    setInterval(this.LinearMove.bind(this), 1000 / this.FPS);
}

Shuriken.prototype.LinearMove = function () {

    selfshu = this;

    switch (selfshu.direction) {

        case DIRECTION_RIGHT:
            selfshu.x += selfshu.speed;
            break;

        case DIRECTION_LEFT:
            selfshu.x -= selfshu.speed;
            break;
    }
}
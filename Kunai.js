var KUNAI_DAMAGE = 100;
var KUNAI_SPEED = 10;
var KUNAI_IMAGE = "kunay.gif";
var KUNAI_WIDTH = 25;
var KUNAI_HEIGHT = 20;

function Kunai(x, y, FPS, direction) {

    Weapon.call(x, y, KUNAI_DAMAGE, KUNAI_SPEED, KUNAI_WIDTH, KUNAI_HEIGHT, direction);

    this.x = x;
    this.y = y;
    this.width = KUNAI_WIDTH;
    this.height = KUNAI_HEIGHT;
    this.damage = KUNAI_DAMAGE;
    this.speed = KUNAI_SPEED;
    this.image = new Image();
    this.direction = direction

    switch (this.direction) {

        case DIRECTION_RIGHT:
            this.image.src = "kunayR.png";
            break;

        case DIRECTION_LEFT:
            this.image.src = "kunayL.png";
            break;
    }

    this.width = KUNAI_WIDTH;
    this.height = KUNAI_HEIGHT;
    this.FPS = FPS;
    this.direction = direction;
    this.selfkun = this;

}

Kunai.prototype.traceLine = function () {

    setInterval(this.LinearMove.bind(this), 1000 / this.FPS);
}

Kunai.prototype.LinearMove = function () {

    selfkun = this;

    switch (selfkun.direction) {

        case DIRECTION_RIGHT:
            selfkun.x += selfkun.speed;
            break;

        case DIRECTION_LEFT:
            selfkun.x -= selfkun.speed;
            break;
    }
}



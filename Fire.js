var FIRE_BALL_SPEED = 2;
var FLAME_SPEED = 10;

var FIRE_BALL_DAMAGE = 100;
var FLAME_DAMAGE = 55;
var VOLCANO_DAMAGE = 50;

var FIRE_BALL_IMAGE_R = "fireball-R.png";
var FIRE_BALL_IMAGE_L = "fireball-L.png";
var FLAME_IMAGE_R = "flame-R.png";
var FLAME_IMAGE_L = "flame-R.png";
var VOLCANO_IMAGE = "lava.png";
var VOLCANO_IMAGE_HEAD = "lavaHead.png"
var VOLCANO_IMAGE_VERTICAL_HEAD = "lavaHeadVertical.png"

var FIRE_BALL_IMAGE_WIDTH = 130;
var FIRE_BALL_IMAGE_HEIGHT = 160;
var FLAME_IMAGE_WIDTH = 87;
var FLAME_IMAGE_HEIGHT = 180;
var VOLCANO_IMAGE_HEIGHT = 40;
var VOLCANO_IMAGE_WIDTH = 85;
var VOLCANO_COLUMN_SEPARATE = 150;

var FLAME_DURATION_SECONDS = 1200;
var EXPLODE_DURATION_SECONDS = 200;

var FIRE_BALL_CONSUMPTION = 60;
var FLAME_CONSUMPTION = 80;
var VOLCANO_CONSUMPTION = 100;

var IMAGE_EYES_RIGHT_FIRE = "ojosFire.png";
var IMAGE_EYES_LEFT_FIRE = "ojosFire.png";

var IMAGE_MOUTH_RIGHT_FIRE = "bocaFireR.png";
var IMAGE_MOUTH_LEFT_FIRE = "bocaFireL.png";

function Fire(xi,yi,powerDirection,FPS) {

    this.xi = xi;
    this.yi = yi;
    this.powerDirection = powerDirection;
    this.FPS = FPS;
    this.damage = 0;
    this.image = new Image();
    this.multiplePowerObjects = [];
    this.isPowering;
    this.isPoweringFace;
    this.elementDescription;
    this.indexPower = 0;
    //Power timers
    this.flameTimer;
    this.fireBallTimer;
    this.volcanoTimer;
    //Count fireball
    this.fireBallCount;
    //initial coordenates of ths third element 
    this.xthird = 0;
    this.ythird = 0;
    //eyes
    this.imageOjosR = new Image();
    this.imageOjosR.src = IMAGE_EYES_RIGHT_FIRE;
    this.imageOjosL = new Image();
    this.imageOjosL.src = IMAGE_EYES_LEFT_FIRE;
    //Mouth
    this.imageBocaR = new Image();
    this.imageBocaR.src = IMAGE_MOUTH_RIGHT_FIRE
    this.imageBocaL = new Image();
    this.imageBocaL.src = IMAGE_MOUTH_LEFT_FIRE;
    this.xEyes = 0;
    this.yEyes = 0;
    this.colision;
    this.selfPower = this;
}

Fire.prototype.fireBall = function () {

    if (!this.isPowering) {

        
        this.damage = FIRE_BALL_DAMAGE;
        this.image.width = FIRE_BALL_IMAGE_WIDTH;
        this.image.height = FIRE_BALL_IMAGE_HEIGHT;
        this.isPowering = true
        this.isPoweringFace = true;
        this.fireBallCount = 0;

        switch (this.powerDirection) {

            case DIRECTION_RIGHT:
                this.image.src = FIRE_BALL_IMAGE_R;
                break;
            case DIRECTION_LEFT:
                this.image.src = FIRE_BALL_IMAGE_L;
                break;
        }

        this.multiplePowerObjects.push(new PowerObject(this.xi, this.yi, FIRE_BALL_IMAGE_WIDTH, FIRE_BALL_IMAGE_HEIGHT, this.damage, this.image));
        this.fireBallTimer = setInterval(this.handlerFireBall.bind(this), 1000 / this.FPS);

    }

}

Fire.prototype.unlockSquaresAffected = function () {

    selfPower = this;

    for (i = 0; i < selfPower.multiplePowerObjects.length; i++) {

        for (j = 0; j < selfPower.multiplePowerObjects[i].squaresAffected.length; j++) {

            selfPower.multiplePowerObjects[i].squaresAffected[j].canMove = true;
            selfPower.multiplePowerObjects[i].squaresAffected[j].isColisionFace = false;
        }

        selfPower.multiplePowerObjects[i].squaresAffected = [];

    }

}

Fire.prototype.flame = function () {

    if (!this.isPowering) {

        this.flameTimer = setInterval(this.handlerFlame.bind(this), 50);
        this.damage = FLAME_DAMAGE;
        this.image.width = FLAME_IMAGE_WIDTH;
        this.image.height = FLAME_IMAGE_HEIGHT;
        this.isPowering = true;
        this.isPoweringFace = true;

        switch (this.powerDirection) {

            case DIRECTION_RIGHT:
                this.image.src = FLAME_IMAGE_R;
                break;
            case DIRECTION_LEFT:
                this.image.src = FLAME_IMAGE_L;
                break;
        }
    }
}

Fire.prototype.volcano = function (xthird,ythird) {

    if (!this.isPowering) {

        this.damage = VOLCANO_DAMAGE;
        this.image.width = VOLCANO_IMAGE_WIDTH;
        this.image.height = VOLCANO_IMAGE_HEIGHT;
        this.isPowering = true;
        this.isPoweringFace = true;
        this.image.src = VOLCANO_IMAGE_HEAD;
        this.xthird = xthird;
        this.ythird = ythird;
        
        switch (this.powerDirection) {

            case DIRECTION_LEFT:
                this.xi += 325 - this.image.width * 1.5;
                break;

        }

        this.volcanoTimer = setInterval(this.handlerVolcano.bind(this), 100);
    }
}

Fire.prototype.handlerFireBall = function () {

    selfPower = this;

    if (selfPower.colision) {

        clearInterval(selfPower.fireBallTimer);
        selfPower.explodeFireBall();

    }

    else {

        if (selfPower.fireBallCount < 80) {

            switch (selfPower.powerDirection) {

                case DIRECTION_RIGHT:
                    selfPower.multiplePowerObjects[0].xi += FIRE_BALL_SPEED;
                    break;
                case DIRECTION_LEFT:
                    selfPower.multiplePowerObjects[0].xi -= FIRE_BALL_SPEED;
                    break;
            }

        } else {

            clearInterval(selfPower.fireBallTimer);
            selfPower.explodeFireBall();

        }

        selfPower.fireBallCount++;

    }

}

Fire.prototype.handlerFlame = function () {
    
    selfPower = this;


    if (selfPower.multiplePowerObjects.length < 3) {


        if (selfPower.multiplePowerObjects.length == 0) {

            switch(selfPower.powerDirection) {

                case DIRECTION_RIGHT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.xi, selfPower.yi, FLAME_IMAGE_WIDTH, FLAME_IMAGE_HEIGHT, FLAME_DAMAGE, selfPower.image));
                    break;

                case DIRECTION_LEFT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.xi, selfPower.yi, FLAME_IMAGE_WIDTH, FLAME_IMAGE_HEIGHT, FLAME_DAMAGE, selfPower.image));
                    break;

            }   

        }

        else {

            switch(selfPower.powerDirection) {

                case DIRECTION_RIGHT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi + FLAME_IMAGE_WIDTH, selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].yi, FLAME_IMAGE_WIDTH, FLAME_IMAGE_HEIGHT, FLAME_DAMAGE, selfPower.image));
                    break;

                case DIRECTION_LEFT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi - FLAME_IMAGE_WIDTH, selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].yi, FLAME_IMAGE_WIDTH, FLAME_IMAGE_HEIGHT, FLAME_DAMAGE, selfPower.image));
                    break;
            }
        }

    }

    else {
        
        clearInterval(selfPower.flameTimer);
        setTimeout(this.stopFlame.bind(this),FLAME_DURATION_SECONDS);
    }
}

Fire.prototype.handlerVolcano = function () {

    selfPower = this;

    //if 15 elements stop
    if (selfPower.multiplePowerObjects.length < 42) {

        //if 5 or 10 elements, the next volcano column will be generated in (x + VOLCANO WIDTH) HORIZONTAL POSITION
        if (selfPower.multiplePowerObjects.length == 0) {

            
            selfPower.multiplePowerObjects.push(new PowerObject(selfPower.xi, selfPower.yi, FLAME_IMAGE_WIDTH, VOLCANO_IMAGE_HEIGHT, FLAME_DAMAGE, new Image()));
            selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].image.src = VOLCANO_IMAGE_HEAD;

        //First object to locate in the scene
        } else if (selfPower.multiplePowerObjects.length % 7 == 0) {

            switch (selfPower.powerDirection) {

                case DIRECTION_LEFT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi - VOLCANO_COLUMN_SEPARATE, selfPower.ythird, FLAME_IMAGE_WIDTH, VOLCANO_IMAGE_HEIGHT, FLAME_DAMAGE, selfPower.image));
                    break;

                case DIRECTION_RIGHT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi + VOLCANO_COLUMN_SEPARATE, selfPower.ythird, FLAME_IMAGE_WIDTH, VOLCANO_IMAGE_HEIGHT, FLAME_DAMAGE, selfPower.image));
                    break;

            }


        //not 5s, 10s or first element to locate in the scene
        } else {
            selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi, selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].yi + VOLCANO_IMAGE_HEIGHT, FLAME_IMAGE_WIDTH, VOLCANO_IMAGE_HEIGHT, FLAME_DAMAGE, selfPower.image));

        }

/*    } else if (selfPower.multiplePowerObjects.length >= 28 && selfPower.multiplePowerObjects.length < 40) {

        selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi + VOLCANO_IMAGE_HEIGHT, selfPower.ythird * 3, FLAME_IMAGE_WIDTH, VOLCANO_IMAGE_HEIGHT, FLAME_DAMAGE, new Image()));
        selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].image.src = VOLCANO_IMAGE_VERTICAL_HEAD;

    */} else {

        clearInterval(selfPower.volcanoTimer);
        setTimeout(this.stopFlame.bind(this), FLAME_DURATION_SECONDS);

    }
}

Fire.prototype.stopFlame = function () {

    selfPower = this;
    selfPower.isPoweringFace = false;
    selfPower.isPowering = false;
    selfPower.image = new Image();
    selfPower.unlockSquaresAffected();
    selfPower.multiplePowerObjects = [];
}

Fire.prototype.stopFireBall = function () {

         selfPower = this;
         selfPower.isPowering = false;
         selfPower.colision = false;
         selfPower.image = new Image();
         selfPower.unlockSquaresAffected();
         selfPower.multiplePowerObjects = [];
}

Fire.prototype.stopVolcano = function () {

    selfPower = this;
    selfPower.isPoweringFace = false;
    selfPower.isPowering = false;
    selfPower.image = new Image();
    selfPower.unlockSquaresAffected();
    selfPower.multiplePowerObjects = [];

}

Fire.prototype.explodeFireBall = function () {

    selfPower.multiplePowerObjects[0].image.src = "explode.png";
    selfPower.isPoweringFace = false;
    setTimeout(this.stopFireBall.bind(this), EXPLODE_DURATION_SECONDS);
}
var WATER_BALL_SPEED = 10;
var WATER_BALL_DAMAGE = 60;
var WATER_BALL_IMAGE_WIDTH = 156;
var WATER_BALL_IMAGE_HEIGHT = 88;

var WATER_BEAM_IMAGE_WIDTH = 220;
var WATER_BEAM_IMAGE_HEIGHT = 157;

var CASCADE_IMAGE_WIDTH = 100;
var CASCADE_IMAGE_HEIGHT = 100;

var CASCADE_DAMAGE = 150;
var CASCADE_SPEED = 10;

var CASCADE_DURATION = 50;

var IMAGE_EYES_RIGHT_WATER = "ojosWater.png";
var IMAGE_EYES_LEFT_WATER = "ojosWater.png";

var WATER_BALL_IMAGE_R = "waterBallR.png";
var WATER_BALL_IMAGE_L = "waterBallL.png";
var WATER_BEAM_IMAGE_R = "waterBeamR.png";
var WATER_BEAM_IMAGE_L = "waterBeamL.png";
var CASCADE_IMAGE_R = "cascadeR.png";
var CASCADE_IMAGE_L = "cascadeL.png";

var IMAGE_MOUTH_RIGHT = "bocaWaterR.png";
var IMAGE_MOUTH_LEFT = "bocaWaterL.png";

var WATER_EXPLODE_DURATION_SECONDS = 500;

var WATER_BALL_CONSUMPTION = 20;
var WATER_BEAM_CONSUMPTION = 40;
var WATER_CASCADE_CONSUMPTION = 60;


function Water(xi, yi, powerDirection, FPS) {

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
    this.selfPower = this;
    this.indexPower = 0;
    //Power timers
    this.waterBallTimer;
    this.waterBeamTimer;
    this.cascadeTimer;
    //Count waterball
    this.waterBallCount;
    //initial coordenates of ths third element 
    this.xthird = 0;
    this.ythird = 0;
    //eyes
    this.imageOjosR = new Image();
    this.imageOjosR.src = IMAGE_EYES_RIGHT_WATER;
    this.imageOjosL = new Image();
    this.imageOjosL.src = IMAGE_EYES_LEFT_WATER;
    //Mouth
    this.imageBocaR = new Image();
    this.imageBocaR.src = IMAGE_MOUTH_RIGHT
    this.imageBocaL = new Image();
    this.imageBocaL.src = IMAGE_MOUTH_LEFT;
    this.xEyes = 0;
    this.yEyes = 0;
    this.cascadeDuration = 0;
    this.colision;
    this.consumption;
    this.selfPower = this;
}

Water.prototype.waterBall = function () {

    if (!this.isPowering) {

        
        this.waterBallTimer;
        this.damage = WATER_BALL_DAMAGE;
        this.consumption = WATER_BALL_CONSUMPTION;
        this.width = WATER_BALL_IMAGE_WIDTH;
        this.height = WATER_BALL_IMAGE_HEIGHT;
        this.isPowering = true;
        this.isPoweringFace = true;
        this.waterBallCount = 0;

        switch(this.powerDirection) {

            case DIRECTION_RIGHT:
                this.image.src = WATER_BALL_IMAGE_R;
                this.xi -= 50;
                this.yi += 120;
                break;
            case DIRECTION_LEFT:
                this.image.src = WATER_BALL_IMAGE_L;
                this.yi += 120;
                this.xi += 200;
                break;
        }
        this.multiplePowerObjects.push(new PowerObject(this.xi, this.yi, WATER_BALL_IMAGE_WIDTH, WATER_BALL_IMAGE_HEIGHT, this.damage, this.image, this.consumption));
        this.waterBallTimer = setInterval(this.handlerWaterBall.bind(this), 1000 / this.FPS);
    }

}

Water.prototype.handlerWaterBall = function () {

    selfPower = this;

    if (selfPower.colision) {

        clearInterval(selfPower.waterBallTimer);
        selfPower.explodeWaterBall();

    } else {

        if (selfPower.waterBallCount < 60) {

            switch (selfPower.powerDirection) {

                case DIRECTION_RIGHT:
                    selfPower.multiplePowerObjects[0].xi += WATER_BALL_SPEED;
                    break;
                case DIRECTION_LEFT:
                    selfPower.multiplePowerObjects[0].xi -= WATER_BALL_SPEED;
                    break;
            }

        } else {

            clearInterval(selfPower.waterBallTimer);
            selfPower.explodeWaterBall();

        }

        selfPower.waterBallCount++;

    }

}

Water.prototype.explodeWaterBall = function () {

    selfPower.multiplePowerObjects[0].image.src = "explodeWater.png";
    selfPower.isPoweringFace = false;
    setTimeout(this.stopWaterBall.bind(this), WATER_EXPLODE_DURATION_SECONDS);
}

Water.prototype.stopWaterBall = function () {

    selfPower = this;
    selfPower.isPowering = false;
    selfPower.image = new Image();
    selfPower.unlockSquaresAffected();
    selfPower.multiplePowerObjects = [];
    selfPower.colision = false;
}

Water.prototype.unlockSquaresAffected = function () {

    selfPower = this;

    for (i = 0; i < selfPower.multiplePowerObjects.length; i++) {

        for (j = 0; j < selfPower.multiplePowerObjects[i].squaresAffected.length; j++) {

            selfPower.multiplePowerObjects[i].squaresAffected[j].canMove = true;
            selfPower.multiplePowerObjects[i].squaresAffected[j].isColisionFace = false;
        }

        selfPower.multiplePowerObjects[i].squaresAffected = [];

    }

}

Water.prototype.waterBeam = function () {

    if (!this.isPowering) {

        this.waterBeamTimer = setInterval(this.handlerWaterBeam.bind(this), 50);
        this.damage = WATER_BALL_DAMAGE;
        this.consumption = WATER_BALL_CONSUMPTION;
        this.image.width = WATER_BALL_IMAGE_WIDTH;
        this.image.height = WATER_BALL_IMAGE_HEIGHT;
        this.isPowering = true;
        this.isPoweringFace = true;
        this.yi -= 20;

        switch (this.powerDirection) {

            case DIRECTION_RIGHT:
                this.image.src = WATER_BEAM_IMAGE_R
                this.xi += 15;
                break;
            case DIRECTION_LEFT:
                this.image.src = WATER_BEAM_IMAGE_L;
                this.xi -= 105;
                break;
        }
    }

}

Water.prototype.handlerWaterBeam = function () {

    selfPower = this;

    if (selfPower.multiplePowerObjects.length < 3) {


        if (selfPower.multiplePowerObjects.length == 0) {

            switch (selfPower.powerDirection) {

                case DIRECTION_RIGHT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.xi + 10, selfPower.yi + 125, WATER_BEAM_IMAGE_WIDTH, WATER_BEAM_IMAGE_HEIGHT, WATER_BALL_DAMAGE, selfPower.image));
                    break;

                case DIRECTION_LEFT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.xi + 180, selfPower.yi + 125, WATER_BEAM_IMAGE_WIDTH, WATER_BEAM_IMAGE_HEIGHT, WATER_BALL_DAMAGE, selfPower.image));
                    break;

            }

        }

        else {

            switch (selfPower.powerDirection) {

                case DIRECTION_RIGHT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi + WATER_BEAM_IMAGE_WIDTH, selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].yi, WATER_BEAM_IMAGE_WIDTH, WATER_BEAM_IMAGE_HEIGHT, WATER_BALL_DAMAGE, selfPower.image));
                    break;

                case DIRECTION_LEFT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi - WATER_BEAM_IMAGE_WIDTH, selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].yi, WATER_BEAM_IMAGE_WIDTH, WATER_BEAM_IMAGE_HEIGHT, WATER_BALL_DAMAGE, selfPower.image));
                    break;
            }
        }

    }

    else {

        clearInterval(selfPower.waterBeamTimer);
        setTimeout(this.stopWaterBeam.bind(this), WATER_EXPLODE_DURATION_SECONDS);
    }

}

Water.prototype.stopWaterBeam = function () {

    selfPower = this;
    selfPower.isPoweringFace = false;
    selfPower.isPowering = false;
    selfPower.image = new Image();
    selfPower.unlockSquaresAffected();
    selfPower.unlockSquaresAffected();
    selfPower.multiplePowerObjects = [];
}

Water.prototype.cascade = function () {

    if (!this.isPowering) {

        this.cascadeTimer = setInterval(this.handlerCascade.bind(this), 100);
        this.damage = CASCADE_DAMAGE;
        this.yi += 100;
        this.image.width = CASCADE_IMAGE_WIDTH;
        this.image.height = CASCADE_IMAGE_HEIGHT;
        this.isPowering = true;
        this.isPoweringFace = true;

        switch(this.powerDirection) {

            case DIRECTION_LEFT:
                this.image.src = CASCADE_IMAGE_L;
                this.xi += 180;
                break;

            case DIRECTION_RIGHT:
                this.image.src = CASCADE_IMAGE_R;
                break;

        }

        //this.xthird = xthird;
        //this.ythird = ythird;
    }


}

Water.prototype.handlerCascade = function () {

    selfPower = this;

    switch (selfPower.multiplePowerObjects.length) {

        case 5:
            if (selfPower.cascadeDuration >= CASCADE_DURATION) {

                selfPower.stopCascade();
                clearInterval(selfPower.cascadeTimer);

            } else {

                for (i = 0; i < selfPower.multiplePowerObjects.length; i++) {

                    switch (this.powerDirection) {

                        case DIRECTION_LEFT:
                            selfPower.multiplePowerObjects[i].xi -= CASCADE_SPEED;
                            break;

                        case DIRECTION_RIGHT:
                            selfPower.multiplePowerObjects[i].xi += CASCADE_SPEED;
                            break;

                    }

                    
                }
                selfPower.cascadeDuration += 1;

            }
        
            break;
        
        case 0:
            selfPower.multiplePowerObjects.push(new PowerObject(selfPower.xi, selfPower.yi, CASCADE_IMAGE_WIDTH, CASCADE_IMAGE_HEIGHT, CASCADE_DAMAGE, new Image()));
            selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].image.src = selfPower.image.src;
            break;

        default:
             selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi, selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].yi - CASCADE_IMAGE_HEIGHT, CASCADE_IMAGE_WIDTH, CASCADE_IMAGE_HEIGHT, CASCADE_DAMAGE, selfPower.image));
             selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].image.src = selfPower.image.src;
            break;

    }

}

Water.prototype.stopCascade = function () {

    selfPower = this;
    
    selfPower.isPoweringFace = false;
    selfPower.isPowering = false;
    selfPower.image = new Image();
    selfPower.unlockSquaresAffected();
    selfPower.multiplePowerObjects = [];
    selfPower.cascadeDuration = 0;
}

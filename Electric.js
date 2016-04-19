
var IMAGE_EYES_RIGHT_ELECTRIC = "ojosElectric.png";
var IMAGE_EYES_LEFT_ELECTRIC = "ojosElectric.png";
var IMAGE_MOUTH_RIGHT_ELECTRIC = "bocaElectric.png";
var IMAGE_MOUTH_LEFT_ELECTRIC = "bocaElectric.png";
var RAY_EXPLODE_IMAGE = "explodeRay.png";

var RAY_EXPLODE_IMAGE_WIDTH = 103;
var RAY_EXPLODE_IMAGE_HEIGHT = 82;

var RAY_DAMAGE = 20;
var RAY_BEAM_DAMAGE = 15;
var STORM_DAMAGE = 100;

var RAY_IMAGE_WIDTH = 55;
var RAY_IMAGE_HEIGHT = 100;
var RAY_BEAM_IMAGE_WIDTH = 212;
var RAY_BEAM_IMAGE_HEIGHT = 58;
var STORM_IMAGE_WIDTH = 251;
var STORM_IMAGE_HEIGHT = 114;

var RAY_IMAGE = "ray.png";
var RAY_BEAM_IMAGE_L = "rayBeamL.png";
var RAY_BEAM_IMAGE_R = "rayBeamR.png";
var STORM_IMAGE = "cloud.png";
var RAY_SPEED = 15;

var RAYBEAM_DURATION_SECONDS = 1000;
var STORM_DURATION_SECONDS = 3000;

var RAY_CONSUMPTION = 10;
var RAY_BEAM_CONSUMPTION = 45;
var STORM_CONSUMPTION = 60;

var RAY_DISTANCE_RANGE = 10

function Electric(xi, yi, powerDirection, FPS) {

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
    this.rayTimer;
    this.rayBeamTimer;
    this.stormTimer;
    this.stormRayTimer;
    //Count waterball
    this.waterBallCount;
    //eyes
    this.imageOjosR = new Image();
    this.imageOjosR.src = IMAGE_EYES_RIGHT_ELECTRIC;
    this.imageOjosL = new Image();
    this.imageOjosL.src = IMAGE_EYES_LEFT_ELECTRIC;
    //Mouth
    this.imageBocaR = new Image();
    this.imageBocaR.src = IMAGE_MOUTH_RIGHT_ELECTRIC;
    this.imageBocaL = new Image();
    this.imageBocaL.src = IMAGE_MOUTH_LEFT_ELECTRIC;
    this.xEyes = 0;
    this.yEyes = 0;
    this.cascadeDuration = 0;
    //Stage dimensions
    this.canvasMaxH;
    this.colision;
    this.selfPower = this;
}

Electric.prototype.ray = function (canvasMaxH) {

    if (!this.isPowering) {

        this.damage = RAY_DAMAGE;
        this.canvasMaxH = canvasMaxH;
        this.image.width = RAY_IMAGE_WIDTH;
        this.image.height = RAY_IMAGE_HEIGHT;
        this.image.src = RAY_IMAGE;
        this.isPowering = true
        this.isPoweringFace = true;

        switch (this.powerDirection) {

            case DIRECTION_RIGHT:
                this.xi += 120;
                break;
            
            case DIRECTION_LEFT:
                this.xi += 50;
                break;

        }

        this.multiplePowerObjects.push(new PowerObject(this.xi, RAY_IMAGE_WIDTH, RAY_IMAGE_WIDTH, RAY_IMAGE_HEIGHT, this.damage, this.image));
        this.rayTimer = setInterval(this.handlerRay.bind(this), 1000 / this.FPS);
    }

}

Electric.prototype.handlerRay = function () {

    selfPower = this;

    if (selfPower.multiplePowerObjects[0].yi + RAY_IMAGE_HEIGHT < selfPower.canvasMaxH) {

        selfPower.multiplePowerObjects[0].yi += RAY_SPEED;

    } else {

        clearInterval(selfPower.rayTimer);
        selfPower.explodeRay();

    }


}

Electric.prototype.handlerStormRay = function () {

    selfPower = this;

    for (i = 10; i < selfPower.multiplePowerObjects.length - 1; i++) {

        if (selfPower.multiplePowerObjects[i].yi + RAY_EXPLODE_IMAGE_HEIGHT < selfPower.canvasMaxH) {

            selfPower.multiplePowerObjects[i].yi += RAY_SPEED;

        } else {

            selfPower.multiplePowerObjects[i].image.src = RAY_EXPLODE_IMAGE;
            setTimeout(this.stopStorm.bind(this), STORM_DURATION_SECONDS);
        }
    }

}

Electric.prototype.stopStormRay = function () {

        

}

Electric.prototype.explodeRay = function () {

    image = new Image(RAY_EXPLODE_IMAGE_WIDTH, RAY_EXPLODE_IMAGE_HEIGHT);
    image.src = RAY_EXPLODE_IMAGE
    selfPower.multiplePowerObjects[0].image = image;
    selfPower.isPoweringFace = false;
    setTimeout(this.stopRay.bind(this), EXPLODE_DURATION_SECONDS);

}

Electric.prototype.unlockSquaresAffected = function () {

    selfPower = this;

    for (i = 0; i < selfPower.multiplePowerObjects.length; i++) {

        for (j = 0; j < selfPower.multiplePowerObjects[i].squaresAffected.length; j++) {

            selfPower.multiplePowerObjects[i].squaresAffected[j].canMove = true;
            selfPower.multiplePowerObjects[i].squaresAffected[j].isColisionFace = false;
        }

        selfPower.multiplePowerObjects[i].squaresAffected = [];

    }

}

Electric.prototype.stopRay = function () {

    selfPower = this;

    selfPower.unlockSquaresAffected();

    selfPower.isPowering = false;
    selfPower.image = new Image();
    selfPower.multiplePowerObjects = [];

}

Electric.prototype.rayBeam = function () {

    if (!this.isPowering) {

        this.damage = RAY_BEAM_DAMAGE;
        this.image.width = RAY_IMAGE_WIDTH;
        this.image.height = RAY_IMAGE_HEIGHT;
        this.isPowering = true
        this.isPoweringFace = true;
        this.yi += 140;

        switch (this.powerDirection) {

            case DIRECTION_RIGHT:
                this.xi += 30;
                this.image.src = RAY_BEAM_IMAGE_R;
                break;

            case DIRECTION_LEFT:
                this.xi += 110;
                this.image.src = RAY_BEAM_IMAGE_L;
                break;

        }

        this.multiplePowerObjects.push(new PowerObject(this.xi, this.yi, RAY_BEAM_IMAGE_WIDTH, RAY_BEAM_IMAGE_HEIGHT, this.damage, this.image));
        this.rayBeamTimer = setInterval(this.handlerRayBeam.bind(this), 1000 / this.FPS);
    }

}

Electric.prototype.launchStormRay = function () {

    selfPower = this;
    this.damage = STORM_DAMAGE;
    imgRay = new Image();
    imgRay.width = RAY_IMAGE_WIDTH;
    imgRay.height = RAY_IMAGE_HEIGHT;
    imgRay.src = RAY_IMAGE;
    damageRay = RAY_DAMAGE;

    for (i = 0; i <= 5; i++) {

        this.multiplePowerObjects.push(new PowerObject(this.multiplePowerObjects[i].xi + 5, this.multiplePowerObjects[i].yi + STORM_IMAGE_HEIGHT, RAY_IMAGE_WIDTH, RAY_IMAGE_HEIGHT, damageRay, imgRay));
    }

    this.stormRayTimer = setInterval(this.handlerStormRay.bind(this),1000/ this.FPS);

   
}

Electric.prototype.handlerRayBeam = function () {

    selfPower = this;


    if (selfPower.multiplePowerObjects.length < 3) {


        if (selfPower.multiplePowerObjects.length == 0) {

            switch (selfPower.powerDirection) {

                case DIRECTION_RIGHT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.xi, selfPower.yi, RAY_BEAM_IMAGE_WIDTH, RAY_BEAM_IMAGE_HEIGHT, RAY_BEAM_DAMAGE, selfPower.image));
                    break;

                case DIRECTION_LEFT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.xi, selfPower.yi, RAY_BEAM_IMAGE_WIDTH, RAY_BEAM_IMAGE_HEIGHT, RAY_BEAM_DAMAGE, selfPower.image));
                    break;

            }

        }

        else {

            switch (selfPower.powerDirection) {

                case DIRECTION_RIGHT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi + RAY_BEAM_IMAGE_WIDTH, selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].yi, RAY_BEAM_IMAGE_WIDTH, RAY_BEAM_IMAGE_HEIGHT, RAY_BEAM_DAMAGE, selfPower.image));
                    break;

                case DIRECTION_LEFT:
                    selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi - RAY_BEAM_IMAGE_WIDTH, selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].yi, RAY_BEAM_IMAGE_WIDTH, RAY_BEAM_IMAGE_HEIGHT, RAY_BEAM_DAMAGE, selfPower.image));
                    break;
            }
        }

    }

    else {

        clearInterval(selfPower.rayBeamTimer);
        setTimeout(this.stopRayBeam.bind(this), RAYBEAM_DURATION_SECONDS);
    }

}

Electric.prototype.stopRayBeam = function () {

    selfPower = this;
    selfPower.isPowering = false;
    selfPower.image = new Image();
    selfPower.isPoweringFace = false;

    selfPower.unlockSquaresAffected();

    selfPower.multiplePowerObjects = [];

}

Electric.prototype.storm = function (canvasMaxH) {

    if (!this.isPowering) {

        this.damage = STORM_DAMAGE;
        this.image.width = STORM_IMAGE_WIDTH;
        this.image.height = STORM_IMAGE_HEIGHT;
        this.image.src = STORM_IMAGE;
        this.isPowering = true;
        this.canvasMaxH = canvasMaxH;
        this.yi = 0;
        this.isPoweringFace = true;

        switch (this.powerDirection) {

            case DIRECTION_RIGHT:
                this.xi = 0;
                break;

        }

        this.multiplePowerObjects.push(new PowerObject(this.xi, this.yi, STORM_IMAGE_WIDTH, STORM_IMAGE_HEIGHT, this.damage, this.image));
        this.stormTimer = setInterval(this.handlerStorm.bind(this), 500);
    }

}

Electric.prototype.handlerStorm = function () {

    selfPower = this;

    if (selfPower.multiplePowerObjects.length <= 9) {

        selfPower.multiplePowerObjects.push(new PowerObject(selfPower.multiplePowerObjects[selfPower.multiplePowerObjects.length - 1].xi + STORM_IMAGE_WIDTH - 30, selfPower.yi, STORM_IMAGE_WIDTH, STORM_IMAGE_HEIGHT, selfPower.damage, selfPower.image));

    }

    else{

        img = new Image(RAY_IMAGE_WIDTH,RAY_IMAGE_HEIGHT);
        img.src = RAY_IMAGE;

        //setInterval(this.launchStormRay.bind(this),500)
        selfPower.launchStormRay();
        clearInterval(selfPower.stormTimer)

    }

    
}

Electric.prototype.explodeStorm = function () {

}

Electric.prototype.stopStorm = function () {

    selfPower = this;
    selfPower.unlockSquaresAffected();
    selfPower.multiplePowerObjects = [];
    clearInterval(this.stormTimer);
    clearInterval(this.stormRayTimer);
    selfPower.isPowering = false;
    selfPower.isPoweringFace = false;
}


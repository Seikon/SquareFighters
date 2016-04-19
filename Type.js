var FIRE_DESC = "FIRE";
var WATER_DESC = "WATER";
var ELECTRIC_DESC = "ELECTRIC";

var P1_FIRST_POWER_KEY = 86;
var P1_SECOND_POWER_KEY = 66;
var P1_THIRD_POWER_KEY = 78;

var P2_FIRST_POWER_KEY = 80;
var P2_SECOND_POWER_KEY = 186;
var P2_THIRD_POWER_KEY = 187;

var IMAGE_MOUTH 

function Type(xi, yi, powerDirection,powerPoints, FPS) {

    this.element;
    this.elementDescription;
    this.xi = xi;
    this.yi = yi;
    this.powePoints = powerPoints;
    this.powerDirection = powerDirection;
    this.initialPowerPoints = powerDirection;
    this.FPS = FPS;
}

Type.prototype.init = function (FPS, typeDesc, powerPoints) {

    this.elementDescription = typeDesc;
    this.powerPoints = powerPoints;
    this.initialPowerPoints = powerPoints;

    switch (this.elementDescription) {

        case FIRE_DESC:
            this.element = new Fire();
            break;

        case WATER_DESC:
            this.element = new Water();
            break;

        case ELECTRIC_DESC:
            this.element = new Electric();
            break;
    }

    this.FPS = FPS;
    this.isPowering = false;
}

Type.prototype.execFirstPower = function (xi, yi, powerDirection, canvasMaxW, canvasMaxH) {

    if (this.powerPoints > 0) {

        switch (this.elementDescription) {

            case FIRE_DESC:
                this.element.xi = xi;
                this.element.yi = yi;
                this.element.powerDirection = powerDirection;
                this.isPowering = true;
                this.powerPoints -= FIRE_BALL_CONSUMPTION;
                this.element.fireBall();
                break;

            case WATER_DESC:
                this.element.xi = xi;
                this.element.yi = yi;
                this.element.powerDirection = powerDirection;
                this.isPowering = true;
                this.powerPoints -= WATER_BALL_CONSUMPTION;
                this.element.waterBall();
                break;

            case ELECTRIC_DESC:
                this.element.xi = xi;
                this.element.yi = yi;
                this.element.powerDirection = powerDirection;
                this.isPowering = true;
                this.powerPoints -= RAY_CONSUMPTION;
                this.element.ray(canvasMaxH);
                break;
        }

    }

}

Type.prototype.exectSecondPower = function (xi, yi, powerDirection) {

    switch (this.elementDescription) {

        case FIRE_DESC:
            this.element.xi = xi;
            this.element.yi = yi;
            this.element.powerDirection = powerDirection;
            this.powerPoints -= FLAME_CONSUMPTION;
            this.isPowering = true;
            this.element.flame();
            break;

        case WATER_DESC:
            this.element.xi = xi;
            this.element.yi = yi;
            this.element.powerDirection = powerDirection;
            this.powerPoints -= WATER_BEAM_CONSUMPTION;
            this.isPowering = true;
            this.element.waterBeam();
            break;

        case ELECTRIC_DESC:
            this.element.xi = xi;
            this.element.yi = yi;
            this.element.powerDirection = powerDirection;
            this.isPowering = true;
            this.powerPoints -= RAY_BEAM_CONSUMPTION;
            this.element.rayBeam();
            break;
    }
}

Type.prototype.exectThirdPower = function (xi, yi, powerDirection, canvasMaxW, canvasMaxH) {

    switch (this.elementDescription) {

        case FIRE_DESC:
            this.element.xi = xi;
            this.element.yi = yi;
            this.element.powerDirection = powerDirection;
            this.powerPoints -= VOLCANO_CONSUMPTION;
            this.isPowering = true;
            this.element.volcano(this.element.xi, this.element.yi);
            break;

        case WATER_DESC:
            this.element.xi = xi;
            this.element.yi = yi;
            this.element.powerDirection = powerDirection;
            this.powerPoints -= WATER_CASCADE_CONSUMPTION;
            this.isPowering = true;
            this.element.cascade();
            break;

        case ELECTRIC_DESC:
            this.element.xi = xi;
            this.element.yi = yi;
            this.element.powerDirection = powerDirection;
            this.isPowering = true;
            this.powerPoints -= STORM_CONSUMPTION;
            this.element.storm(canvasMaxH);
            break;
    }
}
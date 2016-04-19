//-----P1 KEYS----
var P1_UP_KEY = 87; //W
var P1_DOWN_KEY = 83; //S
var P1_RIGHT_KEY = 68; //D
var P1_LEFT_KEY = 65; //A
var P1_DROP_SHURIKEN_KEY = 67; //C
//var DROP_KUNAI_KEY = 88;
var P1_DROP_KUNAI_KEY = 0;
var P1_PUNCH_KEY = 90; //Z
var P1_KICK_KEY = 88; //X

//-----P2 KEYS----
var P2_UP_KEY = 38;
var P2_DOWN_KEY = 40;
var P2_RIGHT_KEY = 39;
var P2_LEFT_KEY = 37;
var P2_DROP_SHURIKEN_KEY = 79;
//var DROP_KUNAI_KEY = 88;
var P2_DROP_KUNAI_KEY = 0;
var P2_PUNCH_KEY = 85;
var P2_KICK_KEY = 73;

var DIRECTION_RIGHT = 1
var DIRECTION_LEFT = 2
var DIRECTION_UP = 3
var DIRECTION_DOWN = 4
var DIRECTION_IDLE = 5

var PUNCH_DAMAGE = 400;

var KICK_DAMAGE = 200;

var TYPE_PUNCH_SINGLE_RIGHT = "SINGLE-R";
var TYPE_PUNCH_SINGLE_LEFT = "SINGLE-L";

var P1 = "P1";
var P2 = "P2";

function SquareFighter(x, y, width, height,FPS,canvasMaxH,canvasMaxW,color,typeDesc,lifePoints,powerPoints,player) {

    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.isColisionFace;
    this.direc = DIRECTION_IDLE;
    this.topeSalto = 0;
    this.FPS = FPS;
    this.salto = false;
    this.saltoPrimer = false;
    this.canvasMaxH = canvasMaxH;
    this.canvasMaxW = canvasMaxW;
    this.deltaTime = 400;
    this.sqhand = this.handlerSquare;
    this.objectDroped = []//objects in scenery droped by object;
    this.keysDown = []; //improve the response of keys because of speed hands ;)
    this.speed;
    this.view = DIRECTION_RIGHT;
    this.ojos = new Image(this.width, this.height);
    this.boca = new Image(this.width, this.height);
    this.ojosX = 0;
    this.ojosY = 0;
    this.bocaX = 0;
    this.bocaY = 0;
    this.punch = new Punch();
    this.kick = new Kick();
    this.typePunch = [TYPE_PUNCH_SINGLE_RIGHT,TYPE_PUNCH_SINGLE_LEFT];
    this.punchOrder = 0;
    this.isHitting;
    this.isKicking;
    this.elementType = new Type();
    this.canMove = true;
    this.typeDesc = typeDesc;
    //Life and Power Points
    this.lifePoints = lifePoints;
    this.initialLifePoints = lifePoints;
    this.powerPoints = powerPoints;
    //--------------------------------
    this.isDefended = false;
    this.isAlive = true;
    this.player = player;
    //Timmers
    this.timerSquare;
    this.timerDie;
    //------------------------------
    //Dialog
    this.self = this;
   
}

SquareFighter.prototype.init = function () {

    this.elementType = new Type();
    this.elementType.init(this.FPS, this.typeDesc,this.powerPoints);

     setInterval(this.handlerSquare.bind(this),1000/this.FPS);


}

SquareFighter.prototype.isMoveKey = function (keyCode) {

    switch (this.player) {

        case P1:

            switch (keyCode) {

                case P1_LEFT_KEY:
                    return true;
                    break;

                case P1_RIGHT_KEY:
                    return true;
                    break;

                case P1_UP_KEY:
                    return true;
                    break;

                default:
                    return false;
                    break;
            }

            break;

        case P2:

            switch (keyCode) {

                case P2_LEFT_KEY:
                    return true;
                    break;

                case P2_RIGHT_KEY:
                    return true;
                    break;

                case P2_UP_KEY:
                    return true;
                    break;

                default:
                    return false;
                    break;
            }

            break;

    }

}

SquareFighter.prototype.handlerSquare = function () {

    self = this;

    if (self.isAlive) {

        this.checkMove();
        this.checkJump();
        this.checkToons();
        this.checkAlive();

    }

    else {



    }
        

}

SquareFighter.prototype.checkMove = function () {

    if (self.canMove && self.isAlive) {

        switch (self.direc) {

            case DIRECTION_LEFT:
                if (self.x > 0) {
                    self.x -= 10;
                }
                break;

            case DIRECTION_RIGHT:
                if (self.x + self.width <= self.canvasMaxW) {
                    self.x += 10;
                }
                break;
        }

    }

    else
        self.direc = DIRECTION_IDLE;
}

SquareFighter.prototype.checkJump = function () {

    self = this;

    if (self.salto) {

        if (self.y - (0.25 * self.deltaTime) <= self.canvasMaxH) {

            self.y = self.y - (0.07 * self.deltaTime)
            self.deltaTime -= 1000 / self.FPS;
        }

        else {
            self.y = self.canvasMaxH - self.height
            self.salto = false
            this.deltaTime = 400;
        }
    }

}

SquareFighter.prototype.checkToons = function() {

    switch (self.view) {

        case DIRECTION_RIGHT:

            if (self.elementType.element.isPoweringFace) {

                self.boca.src = "bocaPowerR.png";
                self.ojos.src = self.elementType.element.imageOjosR.src;
            }
            else {

                if (self.isColisionFace) {

                    self.boca.src = "bocaColision.png";

                }

                else {

                    self.boca.src = self.elementType.element.imageBocaR.src;
                    self.ojos.src = self.elementType.element.imageOjosR.src;

                }
            }
            break;
        case DIRECTION_LEFT:
            if (self.elementType.element.isPoweringFace) {

                self.boca.src = "bocaPowerL.png";
                self.ojos.src = self.elementType.element.imageOjosL.src;
            }
            else {

                if (self.isColisionFace) {

                    self.boca.src = "bocaColision.png";

                }

                else {

                    self.boca.src = self.elementType.element.imageBocaR.src;
                    self.ojos.src = self.elementType.element.imageOjosR.src;

                }
            }
            break;

    }

    self.ojosX = self.x;
    self.ojosY = self.y + (self.height / 6);

    self.bocaX = self.x + 1,
    self.bocaY = self.y + (self.width / 2);


}

SquareFighter.prototype.dropShuriken = function () {

    self = this;

    if(self.isAlive && self.canMove) {

        var shuriken = new Shuriken(0, 0, this.FPS, self.view);

        switch(self.view) {

            case DIRECTION_LEFT:
                shuriken.x = this.x - (this.width / 2);
                shuriken.y = (this.y + this.height / 2) - 10
                break;

            case DIRECTION_RIGHT:
                shuriken.x = this.x + this.width;
                shuriken.y = (this.y + this.height / 2) - 10
                break;
        }

        self.objectDroped.push(shuriken);

        shuriken.traceLine();

    }

}

SquareFighter.prototype.dropKunai = function () {

    self = this;

    if (self.isAlive && self.canMove) {

        var kunai = new Kunai(0, 0, this.FPS, self.view);

        switch (self.view) {

            case DIRECTION_LEFT:
                kunai.x = this.x - (this.width / 2);
                kunai.y = (this.y + this.height / 2) - 10
                break;

            case DIRECTION_RIGHT:
                kunai.x = this.x + this.width;
                kunai.y = (this.y + this.height / 2) - 10
                break;
        }

        self.objectDroped.push(kunai);

        kunai.traceLine();

    }
}

SquareFighter.prototype.hitPunch = function () {

    self = this;

    if (self.isAlive && self.canMove && !self.isDefended) {

        self.isHitting = true;

        self.punch = new Punch();

        switch (self.view) {

            case DIRECTION_RIGHT:

                switch (self.typePunch[self.punchOrder]) {

                    case TYPE_PUNCH_SINGLE_RIGHT:
                        self.punch.xi = self.x + self.width + 5;
                        self.punch.yi = self.y + (self.height / 2);
                        break;

                    case TYPE_PUNCH_SINGLE_LEFT:
                        self.punch.xi = self.x - 5
                        self.punch.yi = self.y + (self.height / 3);
                        self.punch.punchWidth = self.width + PUNCH_WIDTH;
                        break;

                }
                break;

            case DIRECTION_LEFT:

                switch (self.typePunch[self.punchOrder]) {

                    case TYPE_PUNCH_SINGLE_RIGHT:
                        self.punch.xi = self.x - (PUNCH_WIDTH + 5);
                        self.punch.yi = self.y + (self.height / 2);
                        break;

                    case TYPE_PUNCH_SINGLE_LEFT:
                        self.punch.xi = self.x - (PUNCH_WIDTH - 5);
                        self.punch.yi = self.y + (self.height / 3);
                        self.punch.punchWidth = self.width + PUNCH_WIDTH;
                        break;


                }
                break;

        }

        if (self.punchOrder < self.typePunch.length - 1)
            self.punchOrder += 1;
        else
            self.punchOrder = 0;

    }

}

SquareFighter.prototype.hitKick = function () {

    self = this;

    if (self.isAlive && self.canMove && !self.isDefended) {

        self.isKicking = true;
        self.kick = new Kick();

        switch (self.view) {

            case DIRECTION_RIGHT:
                self.kick.xi = self.x + self.width + 5;
                self.kick.yi = self.y + self.height - KICK_HEIGHT;
                self.kick.kickWidth = self.width + KICK_WIDTH;
                break;

            case DIRECTION_LEFT:
                self.kick.xi = self.x - (self.width + 20);
                self.kick.yi = self.y + self.height - KICK_HEIGHT;
                self.kick.kickWidth = self.width + KICK_WIDTH;
                break;

        }

    }
}

SquareFighter.prototype.checkAlive = function () {

    self = this;

    if (self.lifePoints < 0) {

        self.isAlive = false;
        self.ojos.src = "";

        this.timerDie = setInterval(this.animateDie.bind(this), 1000 / this.FPS);

    }
    
}

SquareFighter.prototype.animateDie = function () {

    self = this;

    if (self.height >= 25) {
        self.height--;
        self.y++;
    }

    else {
        self.boca.src = "bocaDie.png";
        self.color = "white";
    }
}

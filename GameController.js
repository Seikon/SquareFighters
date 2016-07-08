var LIFE_BAR_HEIGHT = 30;
var POWER_BAR_HEIGHT = 10;
var JUMP_FORCE = 500;

function GameController(canvas, limitW, limitH, FPS,showBars) {

    this.squareFighters = [];
    this.stage = canvas;
    this.stageContext;
    this.limitW = limitW;
    this.limitH = limitH;
    this.timerGame;
    this.FPS = FPS;
    this.sqChecking;
    this.con = 0;
    this.selfGame = this;
    this.p1;
    this.p2;
    this.showBars = showBars;
    this.dialogs = [];
}

GameController.prototype.addSquareFighter = function (sq) {

    this.squareFighters.push(sq);
    this.scenario;
}

GameController.prototype.draw = function () {

    selfGame = this;
    selfGame.stageContext = selfGame.stage.getContext("2d");
    selfGame.stage.width = selfGame.stage.width;
    selfGame.con = 0;

    selfGame.p1 = selfGame.returnPlayer(P1);
    selfGame.p2 = selfGame.returnPlayer(P2);

    selfGame.squareFighters = [];

    selfGame.squareFighters.push(selfGame.p1);
    selfGame.squareFighters.push(selfGame.p2);

    while (selfGame.con < selfGame.squareFighters.length) {

        selfGame.sqChecking = selfGame.squareFighters[selfGame.con];
        //Check hits actions!
        selfGame.checkHitting(selfGame.sqChecking);
        //Check kick actions!
        selfGame.checkKicking(selfGame.sqChecking);
        //draw the sq
        selfGame.drawSquareFighter(selfGame.sqChecking);
        //draw clothes
        selfGame.drawSquareFighterClothes(selfGame.sqChecking);
        
        if (selfGame.showBars) {
            selfGame.drawSquareLifeBar(selfGame.sqChecking, selfGame.con)
            selfGame.drawSquarePowerBar(selfGame.sqChecking, selfGame.con)
        }
        //check dropped objects
        selfGame.checkObjectsDroped(selfGame.sqChecking);
        //check powers
        selfGame.checkPowers(selfGame.sqChecking);
        selfGame.con++;
    }

    

}

GameController.prototype.drawSquareFighter = function (sq) {

    selfGame.stageContext.fillStyle = sq.color;
    selfGame.stageContext.fillRect(sq.x, sq.y, sq.width, sq.height);
    selfGame.stageContext.stroke();

    if (sq.isDefended) {

        switch (sq.view) {

            case DIRECTION_RIGHT:
                selfGame.stageContext.fillStyle = sq.color;
                selfGame.stageContext.fillRect(sq.x + sq.width, sq.y + 25, 15, 15);
                selfGame.stageContext.stroke();
                selfGame.stageContext.fillStyle = sq.color;
                selfGame.stageContext.fillRect(sq.x + sq.width + 10, sq.y - 5, 10, 45);
                selfGame.stageContext.stroke();
                break;

            case DIRECTION_LEFT:
                selfGame.stageContext.fillStyle = sq.color;
                selfGame.stageContext.fillRect(sq.x - 10, sq.y + 25, 15, 15);
                selfGame.stageContext.stroke();
                selfGame.stageContext.fillStyle = sq.color;
                selfGame.stageContext.fillRect(sq.x - 10 - 10, sq.y - 5, 10, 45);
                selfGame.stageContext.stroke();
                break;

        }

    }

}

GameController.prototype.drawSquareFighterClothes = function (sq) {

    selfGame.stageContext.drawImage(sq.boca, sq.bocaX, sq.bocaY);
    selfGame.stageContext.drawImage(sq.ojos, sq.ojosX, sq.ojosY);
    img = new Image();

    switch (sq.view) {
        
        case DIRECTION_RIGHT:
            img.src = "Images/Characters/Clothes/Caps/bandanaR.png";
            selfGame.stageContext.drawImage(img, sq.x - 35, sq.y - 50);
            break;

        case DIRECTION_LEFT:
            img.src = "Images/Characters/Clothes/Caps/bandanaL.png";
            selfGame.stageContext.drawImage(img, sq.x - 30, sq.y - 50);
            break;
    }


}

GameController.prototype.drawSquarePowerBar = function (sq, position) {

        if (position % 2 == 0) {

            //draw the image in first cuadrant.it draw the life bar in the position based on the number of square items to keep the dynamism
            selfGame.stageContext.fillStyle = "green";
            selfGame.stageContext.fillRect(0, (position / 2 * 30) + 3 + LIFE_BAR_HEIGHT, selfGame.stage.width * 0.45, POWER_BAR_HEIGHT);
            selfGame.stageContext.stroke();

            //draw the damage
            selfGame.stageContext.fillStyle = "black";
            selfGame.stageContext.fillRect(0, (position / 2 * 30) + 3 + LIFE_BAR_HEIGHT, ((sq.elementType.initialPowerPoints - sq.elementType.powerPoints) * selfGame.stage.width * 0.45) / sq.elementType.initialPowerPoints, POWER_BAR_HEIGHT);
            selfGame.stageContext.stroke();

        } else {

            //draw the image in second cuadrant
            // -1 to get the line to draw the life bar in the position based on the number of square items to keep the dynamism
            selfGame.stageContext.fillStyle = "green";
            selfGame.stageContext.fillRect(selfGame.stage.width * 0.5, ((position - 1) / 2 * 30) + 3 + LIFE_BAR_HEIGHT, selfGame.stage.width - selfGame.stage.width * 0.5, POWER_BAR_HEIGHT);
            selfGame.stageContext.stroke();

            //draw the damage
            selfGame.stageContext.fillStyle = "blue";
            selfGame.stageContext.fillRect(selfGame.stage.width * 0.5, ((position - 1) / 2 * 30) + 3 + LIFE_BAR_HEIGHT, (sq.elementType.initialPowerPoints - sq.elementType.powerPoints) * (selfGame.stage.width - selfGame.stage.width * 0.5) / sq.initialLifePoints, POWER_BAR_HEIGHT);
            selfGame.stageContext.stroke();
        }

}

GameController.prototype.drawSquareLifeBar = function (sq, position) {

    if (sq.lifePoints <= 0) {


        if (position % 2 == 0) {

            //draw the image in first cuadrant.it draw the life bar in the position based on the number of square items to keep the dynamism
            selfGame.stageContext.fillStyle = "red";
            selfGame.stageContext.fillRect(0, (position / 2 * 30) + 3, selfGame.stage.width * 0.45, LIFE_BAR_HEIGHT);
            selfGame.stageContext.stroke();

        } else {

            //draw the image in second cuadrant
            // -1 to get the line to draw the life bar in the position based on the number of square items to keep the dynamism
            selfGame.stageContext.fillStyle = "red";
            selfGame.stageContext.fillRect(selfGame.stage.width * 0.5, ((position - 1) / 2 * 30) + 3, selfGame.stage.width - selfGame.stage.width * 0.5, LIFE_BAR_HEIGHT);
            selfGame.stageContext.stroke();
        }
        

    } else {

        if (position % 2 == 0) {

            //draw the image in first cuadrant.it draw the life bar in the position based on the number of square items to keep the dynamism
            selfGame.stageContext.fillStyle = "yellow";
            selfGame.stageContext.fillRect(0, (position / 2 * 30) + 3, selfGame.stage.width * 0.45, LIFE_BAR_HEIGHT);
            selfGame.stageContext.stroke();

            //draw the damage
            selfGame.stageContext.fillStyle = "red";
            selfGame.stageContext.fillRect(0, (position / 2 * 30) + 3, ((sq.initialLifePoints - sq.lifePoints) * selfGame.stage.width * 0.45) / sq.initialLifePoints, LIFE_BAR_HEIGHT);
            selfGame.stageContext.stroke();

        } else {

            //draw the image in second cuadrant
            // -1 to get the line to draw the life bar in the position based on the number of square items to keep the dynamism
            selfGame.stageContext.fillStyle = "yellow";
            selfGame.stageContext.fillRect(selfGame.stage.width * 0.5, ((position - 1) / 2 * 30) + 3, selfGame.stage.width - selfGame.stage.width * 0.5, LIFE_BAR_HEIGHT);
            selfGame.stageContext.stroke();

            //draw the damage
            selfGame.stageContext.fillStyle = "red";
            selfGame.stageContext.fillRect(selfGame.stage.width * 0.5, ((position - 1) / 2 * 30) + 3, (sq.initialLifePoints - sq.lifePoints) * (selfGame.stage.width - selfGame.stage.width * 0.5) / sq.initialLifePoints, LIFE_BAR_HEIGHT);
            selfGame.stageContext.stroke();
        }

    }

}

GameController.prototype.colisions = function () {

    selfGame = this;

    //Loop all square fgh objects
    for (sq in selfGame.squareFighters) {

        for (sqCh in selfGame.squareFighters) {

            if (selfGame.squareFighters[sq] != selfGame.squareFighters[sqCh]) {

                //Colisions between Square Fighters
                if ((selfGame.squareFighters[sq].x >= selfGame.squareFighters[sqCh].x && selfGame.squareFighters[sq].x <= selfGame.squareFighters[sqCh].x + selfGame.squareFighters[sqCh].width) || (selfGame.squareFighters[sq].x + selfGame.squareFighters[sq].width >= selfGame.squareFighters[sqCh].x && selfGame.squareFighters[sq].x + selfGame.squareFighters[sq].width <= selfGame.squareFighters[sqCh].x + selfGame.squareFighters[sqCh].width)) {

                    if ((selfGame.squareFighters[sq].y >= selfGame.squareFighters[sqCh].y && selfGame.squareFighters[sq].y <= selfGame.squareFighters[sqCh].y + selfGame.squareFighters[sqCh].height) || (selfGame.squareFighters[sq].y + selfGame.squareFighters[sq].height >= selfGame.squareFighters[sqCh].y && selfGame.squareFighters[sq].y + selfGame.squareFighters[sq].height <= selfGame.squareFighters[sqCh].y + selfGame.squareFighters[sqCh].height)) {

                        //COLISION
                       // alert("Colision");

                    }
                }// end Colisions between Square Fighter


                //Colisions between Square Fighters and kicks
                if ((selfGame.squareFighters[sq].kick.xi >= selfGame.squareFighters[sqCh].x && selfGame.squareFighters[sq].kick.xi <= selfGame.squareFighters[sqCh].x + selfGame.squareFighters[sqCh].width) || (selfGame.squareFighters[sq].kick.xi + selfGame.squareFighters[sq].kick.kickWidth >= selfGame.squareFighters[sqCh].x && selfGame.squareFighters[sq].kick.xi + selfGame.squareFighters[sq].kick.kickWidth <= selfGame.squareFighters[sqCh].x + selfGame.squareFighters[sqCh].width)) {

                    if ((selfGame.squareFighters[sq].kick.yi >= selfGame.squareFighters[sqCh].y && selfGame.squareFighters[sq].kick.yi <= selfGame.squareFighters[sqCh].y + selfGame.squareFighters[sqCh].height) || (selfGame.squareFighters[sq].kick.yi + selfGame.squareFighters[sq].kick.kickHeight >= selfGame.squareFighters[sqCh].y && selfGame.squareFighters[sq].kick.yi + selfGame.squareFighters[sq].kick.kickHeight <= selfGame.squareFighters[sqCh].y + selfGame.squareFighters[sqCh].height)) {

                        selfGame.squareFighters[sq].kick = new Kick();
                        //COLISION KICK
                        if (selfGame.squareFighters[sqCh].isDefended && selfGame.squareFighters[sqCh].view != selfGame.squareFighters[sq].view) {
                            selfGame.squareFighters[sqCh].lifePoints -= KICK_DAMAGE / 4;
                            selfGame.squareFighters[sqCh].x += 10;
                        }
                        else 
                            selfGame.squareFighters[sqCh].lifePoints -= KICK_DAMAGE;
                        

                    }
               }// end Colisions between kicks

                //Colisions between Square Fighters and punchs
                    if ((selfGame.squareFighters[sq].punch.xi >= selfGame.squareFighters[sqCh].x && selfGame.squareFighters[sq].punch.xi <= selfGame.squareFighters[sqCh].x + selfGame.squareFighters[sqCh].width) || (selfGame.squareFighters[sq].punch.xi + selfGame.squareFighters[sq].punch.punchWidth >= selfGame.squareFighters[sqCh].x && selfGame.squareFighters[sq].punch.xi + selfGame.squareFighters[sq].punch.punchWidth <= selfGame.squareFighters[sqCh].x + selfGame.squareFighters[sqCh].width)) {

                        if ((selfGame.squareFighters[sq].punch.yi >= selfGame.squareFighters[sqCh].y && selfGame.squareFighters[sq].punch.yi <= selfGame.squareFighters[sqCh].y + selfGame.squareFighters[sqCh].height) || (selfGame.squareFighters[sq].punch.yi + selfGame.squareFighters[sq].punch.punchHeight >= selfGame.squareFighters[sqCh].y && selfGame.squareFighters[sq].punch.yi + selfGame.squareFighters[sq].punch.punchHeight <= selfGame.squareFighters[sqCh].y + selfGame.squareFighters[sqCh].height)) {

                            //COLISION PUNCH
                            selfGame.squareFighters[sq].punch = new Punch();

                            if (selfGame.squareFighters[sqCh].isDefended && selfGame.squareFighters[sqCh].view != selfGame.squareFighters[sq].view) {
                                selfGame.squareFighters[sqCh].lifePoints -= PUNCH_DAMAGE / 4;
                                selfGame.squareFighters[sqCh].x += 5;
                            }
                            else
                                selfGame.squareFighters[sqCh].lifePoints -= PUNCH_DAMAGE;
                            


                        }
                    }// end Colisions between punchs

                //Colisions Square and object dropped
                for (objd in selfGame.squareFighters[sq].objectDroped) {

                    if ((selfGame.squareFighters[sq].objectDroped[objd].x >= selfGame.squareFighters[sqCh].x && selfGame.squareFighters[sq].objectDroped[objd].x <= selfGame.squareFighters[sqCh].x + selfGame.squareFighters[sqCh].width) || (selfGame.squareFighters[sq].objectDroped[objd].x + selfGame.squareFighters[sq].objectDroped[objd].width >= selfGame.squareFighters[sqCh].x && selfGame.squareFighters[sq].objectDroped[objd].x + selfGame.squareFighters[sq].objectDroped[objd].width <= selfGame.squareFighters[sqCh].x + selfGame.squareFighters[sqCh].width)) {

                        if ((selfGame.squareFighters[sq].objectDroped[objd].y >= selfGame.squareFighters[sqCh].y && selfGame.squareFighters[sq].objectDroped[objd].y <= selfGame.squareFighters[sqCh].y + selfGame.squareFighters[sqCh].height) || (selfGame.squareFighters[sq].objectDroped[objd].y + selfGame.squareFighters[sq].objectDroped[objd].height >= selfGame.squareFighters[sqCh].y && selfGame.squareFighters[sq].objectDroped[objd].y + selfGame.squareFighters[sq].objectDroped[objd].height <= selfGame.squareFighters[sqCh].y + selfGame.squareFighters[sqCh].height)) {

                            //COLISION OBJECT
                            if (selfGame.squareFighters[sqCh].isDefended)
                                selfGame.squareFighters[sqCh].lifePoints -= selfGame.squareFighters[sq].objectDroped[objd].damage / 4;
                            else {
                                selfGame.squareFighters[sqCh].lifePoints -= selfGame.squareFighters[sq].objectDroped[objd].damage;
                            }

                            selfGame.squareFighters[sq].objectDroped.splice(objd, objd + 1);

                        }

                    }

                }//end Colisions Square and object dropped

                //Colisions Square and powers
                for (power in selfGame.squareFighters[sq].elementType.element.multiplePowerObjects) {

                    if ((selfGame.squareFighters[sqCh].x >= selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].xi && selfGame.squareFighters[sqCh].x <= selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].xi + selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].width) || (selfGame.squareFighters[sqCh].x + selfGame.squareFighters[sqCh].width >= selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].xi && selfGame.squareFighters[sqCh].x + selfGame.squareFighters[sqCh].width <= selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].xi + selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].width)) {

                        if ((selfGame.squareFighters[sqCh].y >= selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].yi && selfGame.squareFighters[sqCh].y <= selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].yi + selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].height) || (selfGame.squareFighters[sqCh].y + selfGame.squareFighters[sqCh].height >= selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].yi && selfGame.squareFighters[sqCh].y + selfGame.squareFighters[sqCh].height <= selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].yi + selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].height)) {

                            //COLISION Powers
                            selfGame.squareFighters[sq].elementType.element.multiplePowerObjects[power].squaresAffected.push(selfGame.squareFighters[sqCh]);
                            selfGame.squareFighters[sqCh].isColisionFace = true;
                            selfGame.squareFighters[sqCh].canMove = false;
                            selfGame.squareFighters[sq].elementType.element.colision = true;
                             
                            if (selfGame.squareFighters[sqCh].isDefended)
                                selfGame.squareFighters[sqCh].lifePoints -= selfGame.squareFighters[sq].elementType.element.damage / 2;
                                
                            else
                            selfGame.squareFighters[sqCh].lifePoints -= selfGame.squareFighters[sq].elementType.element.damage;

                        }

                    } 

                }


            }

        }

    }
}

GameController.prototype.init = function () {

    for (i = 0; i < this.squareFighters.length; i++) {

        this.squareFighters[i].init();

    }

    this.p1 = this.returnPlayer(P1);
    this.p2 = this.returnPlayer(P2);

    setInterval(this.draw.bind(this), 1000 / this.FPS);
    setInterval(this.colisions.bind(this), 1000 / this.FPS);

    document.addEventListener("keydown", function (event) {

        //---------P1 MOVE-----------

        if (!selfGame.p1.elementType.element.isPowering && selfGame.p1.canMove && selfGame.p1.isAlive) {

            if (selfGame.p1.isMoveKey(event.keyCode)) {

                if (selfGame.p1.keysDown.length > 0) {

                    if (event.keyCode != selfGame.p1.keysDown[selfGame.p1.keysDown.length - 1]) {
                        selfGame.p1.keysDown.push(event.keyCode);
                    }

                }

                else {
                    selfGame.p1.keysDown.push(event.keyCode);
                }

            }

            switch (event.keyCode) {

                case P1_UP_KEY:
                    if (!selfGame.p1.salto) {
                        selfGame.p1.salto = true;
                        selfGame.p1.topeSalto = selfGame.p1.y - JUMP_FORCE;
                    }
                    break;

                case P1_RIGHT_KEY:
                    selfGame.p1.direc = DIRECTION_RIGHT;
                    selfGame.p1.view = DIRECTION_RIGHT;
                    //change order when change view to preserve combo interaction
                    selfGame.p1.punchOrder = 0;
                    break;

                case P1_LEFT_KEY:
                    selfGame.p1.direc = DIRECTION_LEFT;
                    selfGame.p1.view = DIRECTION_LEFT;
                    //change order when change view to preserve combo interaction
                    selfGame.p1.punchOrder = 0;
                    break;

                case P1_DOWN_KEY:
                    if (!selfGame.p1.elementType.element.isPowering)
                        selfGame.p1.isDefended = true;
                    break;

            }

        }

        //---------P2 MOVE-----------

        if (!selfGame.p2.elementType.element.isPowering && selfGame.p2.canMove && selfGame.p2.isAlive) {

            if (selfGame.p2.isMoveKey(event.keyCode)) {

                if (selfGame.p2.keysDown.length > 0) {

                    if (event.keyCode != selfGame.p2.keysDown[selfGame.p2.keysDown.length - 1]) {
                        selfGame.p2.keysDown.push(event.keyCode);
                    }

                }

                else {
                    selfGame.p2.keysDown.push(event.keyCode);
                }

            }

            switch (event.keyCode) {

                case P2_UP_KEY:
                    if (!selfGame.p2.salto) {
                        selfGame.p2.salto = true;
                        selfGame.p2.topeSalto = selfGame.p2.y - JUMP_FORCE;
                    }
                    break;

                case P2_RIGHT_KEY:
                    selfGame.p2.direc = DIRECTION_RIGHT;
                    selfGame.p2.view = DIRECTION_RIGHT;
                    //change order when change view to preserve combo interaction
                    selfGame.p2.punchOrder = 0;
                    break;

                case P2_LEFT_KEY:
                    selfGame.p2.direc = DIRECTION_LEFT;
                    selfGame.p2.view = DIRECTION_LEFT;
                    //change order when change view to preserve combo interaction
                    selfGame.p2.punchOrder = 0;
                    break;

                case P2_DOWN_KEY:
                    if (!selfGame.p2.elementType.element.isPowering)
                        selfGame.p2.isDefended = true;
                    break;

            }

        }

    }, false);
    document.addEventListener("keyup", function (event) {

        //----------P1 MOVES ----------

        if (!selfGame.p1.elementType.element.isPowering && selfGame.p1.canMove && selfGame.p1.isAlive) {

            if (selfGame.p1.isMoveKey(event.keyCode)) {

                for (i = 0; i <= selfGame.p1.keysDown.length - 1; i++) {

                    if (event.keyCode == selfGame.p1.keysDown[i]) {
                        selfGame.p1.keysDown.splice(i, i + 1);
                    }

                }

            }

            switch (event.keyCode) {

                case P1_RIGHT_KEY:
                    if (selfGame.p1.keysDown.length == 0) {
                        selfGame.p1.direc = DIRECTION_IDLE;
                    }
                    break;

                case P1_LEFT_KEY:
                    if (selfGame.p1.keysDown.length == 0) {
                        selfGame.p1.direc = DIRECTION_IDLE;
                    }
                    break;

                case P1_DROP_SHURIKEN_KEY:
                    if (!selfGame.p1.isDefended)
                        selfGame.p1.dropShuriken();
                    break;

                case P1_DROP_KUNAI_KEY:
                    if (!selfGame.p1.isDefended)
                        selfGame.p1.dropKunai();
                    break;

                case P1_PUNCH_KEY:
                    if (!selfGame.p1.isDefended)
                        selfGame.p1.hitPunch();
                    break;

                case P1_KICK_KEY:
                    if (!selfGame.p1.isDefended);
                        selfGame.p1.hitKick();
                    break;

                case P1_FIRST_POWER_KEY:
                    if (!selfGame.p1.elementType.element.isPowering && !selfGame.p1.isDefended) {

                        selfGame.p1.direc = DIRECTION_IDLE;
                        switch (selfGame.p1.view) {

                            case DIRECTION_RIGHT:
                                selfGame.p1.elementType.execFirstPower(selfGame.p1.x + selfGame.p1.width, selfGame.p1.y - 150, selfGame.p1.view, selfGame.p1.canvasMaxW, selfGame.p1.canvasMaxH);
                                break;

                            case DIRECTION_LEFT:
                                selfGame.p1.elementType.execFirstPower(selfGame.p1.x - 325, selfGame.p1.y - 150, selfGame.p1.view, selfGame.p1.canvasMaxW, selfGame.p1.canvasMaxH);
                                break;
                        }
                    }
                    break;

                case P1_SECOND_POWER_KEY:
                    if (!selfGame.p1.elementType.element.isPowering && !selfGame.p1.isDefended) {

                        selfGame.p1.direc = DIRECTION_IDLE;
                        switch (selfGame.p1.view) {

                            case DIRECTION_RIGHT:
                                selfGame.p1.elementType.exectSecondPower(selfGame.p1.x + selfGame.p1.width / 2.5, selfGame.p1.y - 150, selfGame.p1.view);
                                break;

                            case DIRECTION_LEFT:
                                selfGame.p1.elementType.exectSecondPower(selfGame.p1.x - 325, selfGame.p1.y - 150, selfGame.p1.view);
                                break;
                        }

                    }
                    break;

                case P1_THIRD_POWER_KEY:
                    if (!selfGame.p1.elementType.element.isPowering && !selfGame.p1.isDefended) {

                        selfGame.p1.direc = DIRECTION_IDLE;
                        switch (selfGame.p1.view) {

                            case DIRECTION_RIGHT:
                                selfGame.p1.elementType.exectThirdPower(selfGame.p1.x + selfGame.p1.width + 20, selfGame.p1.y - 150, selfGame.p1.view, selfGame.p1.canvasMaxW, selfGame.p1.canvasMaxH);
                                break;

                            case DIRECTION_LEFT:
                                selfGame.p1.elementType.exectThirdPower(selfGame.p1.x - 325, selfGame.p1.y - 150, selfGame.p1.view, selfGame.p1.canvasMaxW, selfGame.p1.canvasMaxH);
                                break;
                        }

                    }
                    break;

                case P1_DOWN_KEY:
                    selfGame.p1.isDefended = false;
                    break;

            }
        }
        //----------P2 MOVES ----------
        if (!selfGame.p2.elementType.element.isPowering && selfGame.p2.canMove && selfGame.p2.isAlive) {

            if (selfGame.p2.isMoveKey(event.keyCode)) {

                for (i = 0; i <= selfGame.p2.keysDown.length - 1; i++) {

                    if (event.keyCode == selfGame.p2.keysDown[i]) {
                        selfGame.p2.keysDown.splice(i, i + 1);
                    }

                }

            }

            switch (event.keyCode) {

                case P2_RIGHT_KEY:
                    if (selfGame.p2.keysDown.length == 0) {
                        selfGame.p2.direc = DIRECTION_IDLE;
                    }
                    break;

                case P2_LEFT_KEY:
                    if (selfGame.p2.keysDown.length == 0) {
                        selfGame.p2.direc = DIRECTION_IDLE;
                    }
                    break;

                case P2_DROP_SHURIKEN_KEY:
                    if (!selfGame.p2.isDefended)
                        selfGame.p2.dropShuriken();
                    break;

                case P2_DROP_KUNAI_KEY:
                    if (!selfGame.p2.isDefended)
                        selfGame.p2.dropKunai();
                    break;

                case P2_PUNCH_KEY:
                    if (!selfGame.p2.isDefended)
                        selfGame.p2.hitPunch();
                    break;

                case P2_KICK_KEY:
                    if (!selfGame.p2.isDefended)
                        selfGame.p2.hitKick();
                    break;

                case P2_FIRST_POWER_KEY:
                    if (!selfGame.p2.elementType.element.isPowering && !selfGame.p2.isDefended) {

                        selfGame.p2.direc = DIRECTION_IDLE;
                        switch (selfGame.p2.view) {

                            case DIRECTION_RIGHT:
                                selfGame.p2.elementType.execFirstPower(selfGame.p2.x + selfGame.p2.width, selfGame.p2.y - 150, selfGame.p2.view, selfGame.p2.canvasMaxW, selfGame.p2.canvasMaxH);
                                break;

                            case DIRECTION_LEFT:
                                selfGame.p2.elementType.execFirstPower(selfGame.p2.x - 325, selfGame.p2.y - 150, selfGame.p2.view, selfGame.p2.canvasMaxW, selfGame.p2.canvasMaxH);
                                break;
                        }
                    }
                    break;

                case P2_SECOND_POWER_KEY:
                    if (!selfGame.p2.elementType.element.isPowering && !selfGame.p2.isDefended) {

                        selfGame.p2.direc = DIRECTION_IDLE;
                        switch (selfGame.p2.view) {

                            case DIRECTION_RIGHT:
                                selfGame.p2.elementType.exectSecondPower(selfGame.p2.x + selfGame.p2.width / 2.5, selfGame.p2.y - 150, selfGame.p2.view);
                                break;

                            case DIRECTION_LEFT:
                                selfGame.p2.elementType.exectSecondPower(selfGame.p2.x - 325, selfGame.p2.y - 150, selfGame.p2.view);
                                break;
                        }

                    }
                    break;

                case P2_THIRD_POWER_KEY:
                    if (!selfGame.p2.elementType.element.isPowering && !selfGame.p2.isDefended) {

                        selfGame.p2.direc = DIRECTION_IDLE;
                        switch (selfGame.p2.view) {

                            case DIRECTION_RIGHT:
                                selfGame.p2.elementType.exectThirdPower(selfGame.p2.x + selfGame.p2.width + 20, selfGame.p2.y - 150, selfGame.p2.view, selfGame.p2.canvasMaxW, selfGame.p2.canvasMaxH);
                                break;

                            case DIRECTION_LEFT:
                                selfGame.p2.elementType.exectThirdPower(selfGame.p2.x - 325, selfGame.p2.y - 150, selfGame.p2.view, selfGame.p2.canvasMaxW, selfGame.p2.canvasMaxH);
                                break;
                        }

                    }
                    break;

                case P2_DOWN_KEY:
                    selfGame.p2.isDefended = false;
                    break;

            }

        }

    }, true);


}

GameController.prototype.returnPlayer = function (player) {

    for (i = 0; i < this.squareFighters.length; i++) {

        if (this.squareFighters[i].player == player)
            return this.squareFighters[i];

    }

}

GameController.prototype.checkHitting = function (sq) {

    if (sq.isHitting) {
        selfGame.stageContext.fillStyle = sq.color;
        selfGame.stageContext.fillRect(sq.punch.xi, sq.punch.yi, sq.punch.punchWidth, sq.punch.punchHeight);
        selfGame.stageContext.stroke();
        sq.isHitting = false;

    }

}

GameController.prototype.checkKicking = function (sq) {

    if (sq.isKicking) {
        selfGame.stageContext.fillStyle = sq.color;
        selfGame.stageContext.fillRect(sq.kick.xi, sq.kick.yi, sq.kick.kickWidth, sq.kick.kickHeight);
        selfGame.stageContext.stroke();
        sq.isKicking = false;

    }

}

GameController.prototype.checkObjectsDroped = function (sq) {

    for (i = 0; i < sq.objectDroped.length; i++) {

        img = sq.objectDroped[i].image;
        selfGame.stageContext.drawImage(img, sq.objectDroped[i].x, sq.objectDroped[i].y);

    }


}

GameController.prototype.checkPowers = function (sq) {

    if (sq.elementType.isPowering) {

            for (i = 0; i < sq.elementType.element.multiplePowerObjects.length; i++) {

                selfGame.stageContext.drawImage(sq.elementType.element.multiplePowerObjects[i].image, sq.elementType.element.multiplePowerObjects[i].xi, sq.elementType.element.multiplePowerObjects[i].yi)
            }

    }
}
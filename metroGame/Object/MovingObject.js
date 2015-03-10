/**
 * Created by Max on 17/09/2014.
 * @TODO se charger d'effectuer le rendu d'un moving object dans une collection
 */


/*var minX = 64;
 var minY = 64;
 var maxX = 320;
 var maxY = 448 */
//var listChair;
//var selecPortrait;
//var initPos;
var textures;
var textureStack;
var textureStack2;
var v = 0;
/**
 * Constructor MovingObject
 * @param {Object} params definition:
 * {
 *     textures: {Array <PIXI.Texture>},
 *     facingDirection: MovingObject.DIRECTION_{UP|RIGHT|DOWN|LEFT},
 *     stepSize: {Number}
 * }
 */
function MovingObject (params) {
    params = params || {};

    this.textures = params.textures || [];
    this.role = params.role || [];
    // textures = this.textures;
    this.stepSize = params.stepSize || 64;
    this.listChair = params.list || [];
    // character 's avatar
    this.selecPortrait = params.selecPortrait || new Portrait();
    // global counter of the main
    this.CNTR = params.CNTR || 0;
    //initial position
    this.initPos = params.initPos || new PIXI.Point(0,0);

    // Inheritance (super)
    PIXI.MovieClip.call(this, this.textures);

    // New properties
    this.facingDirection = params.facingDirection || MovingObject.DIRECTION_DOWN;
    this.isdown = false;
    //set center of the movieclip
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position = this.initPos;
    this.modelPosition = this.position;
    //independant counter
    this.subCounterAnim = 1;
//    this.facingDirection = MovingObject.DIRECTION_DOWN;

    this.animationDirection = this.facingDirection;
    this.step = 4;
    this.counterStep = 0;
    this.isMoving = false;
    this.aimedPosition =  new PIXI.Point(this.position.x,this.position.y);
    this.initFX();
    this.interactive = true;
    this.finalPosition = new PIXI.Point(this.position.x,this.position.y);
    // center the sprites anchor point
    this.ismouseUp = false;
    this.activate = true;

    this.ghostTextures = [new PIXI.Sprite(this.textures[0]),
        new PIXI.Sprite(this.textures[4]),new PIXI.Sprite(this.textures[8]),
        new PIXI.Sprite(this.textures[12])];
    for(var i = 0; i<4; i++) {
        this.ghostTextures[i].anchor.x = 0.5;
        this.ghostTextures[i].anchor.y = 0.5;
        this.ghostTextures[i].alpha = 0.5;
        this.ghostTextures[i].visible = false;
        stage.addChild(this.ghostTextures[i]);

    }

    //this.ghost = this.ghostTextures[0];
    stage.addChild(this.smokeSprite);
}

// Inheritance
MovingObject.prototype = Object.create(PIXI.MovieClip.prototype, {
    constructor: MovingObject
});

MovingObject.prototype.initFX = function() {

    this.smokeSprite = new PIXI.Sprite(PIXI.Texture.fromImage('sprites/smoke.png'));
    this.smokeSprite.position.x = this.position.x;
    this.smokeSprite.position.y = this.position.y;
    this.smokeSprite.anchor.x = 0.5;
    this.smokeSprite.anchor.y = 0.5;
    this.smokeSprite.rotation =1.43;
    this.smokeSprite.visible = false;


}

/* Move the character */
MovingObject.prototype.move = function () {

    this.smokeSprite.visible = true;

    // move the sprite t the center of the screen



    switch (this.facingDirection) {

        case MovingObject.DIRECTION_UP:
            if(this.position.y > this.aimedPosition.y) {
                this.smokeSprite.position.x = this.position.x;
                this.smokeSprite.position.y = this.position.y+32;
                this.smokeSprite.rotation = -Math.PI/2;
                this.finalPosition.y = this.position.y - 64;

            }
            this.setTexture(this.textures[12]);
            break;

        case MovingObject.DIRECTION_RIGHT:

            if(this.position.x < this.aimedPosition.x) {
      //          this.position.x += this.stepSize;
                this.smokeSprite.position.x = this.position.x-32;
                this.smokeSprite.position.y = this.position.y;
                this.smokeSprite.rotation = 0;
                this.finalPosition.x = this.position.x + 64;
            }
            this.setTexture(this.textures[9]);

            break;

        case MovingObject.DIRECTION_DOWN:
            if(this.position.y < this.aimedPosition.y) {
     //           this.position.y += this.stepSize;
                this.smokeSprite.position.x = this.position.x;
                this.smokeSprite.position.y = this.position.y - 32;
                this.smokeSprite.rotation = Math.PI/2;
                this.finalPosition.y = this.position.y + 64;
            }
            this.setTexture(this.textures[0]);
            break;

        case MovingObject.DIRECTION_LEFT:
            if(this.position.x > this.aimedPosition.x) {
      //          this.position.x -= this.stepSize;
                this.smokeSprite.position.x = this.position.x+32;
                this.smokeSprite.position.y = this.position.y;
                this.smokeSprite.rotation = Math.PI;
                this.finalPosition.x = this.position.x - 64;
            }
            this.setTexture(this.textures[5]);
            break;
        default:
            break;

    }

    if(this.facingDirection != MovingObject.STAY) {

        this.animationDirection = this.facingDirection;
    }


    this.smokeSprite.visible = false;
    this.ismouseUp = false;
};

// SIT, when the movingobject is at the same position than a chair, it can't be moved
MovingObject.prototype.sit = function() {
    for(i = 0; i < this.listChair.length ; i++) {

        if(this.position.x == this.listChair[i].position.x && this.position.y == this.listChair[i].position.y) {
            if (this.listChair[i].isOccupied[0] == FREE) {

                //booelean true when the first dude is sitting
                this.activate = false;
                this.listChair[i].isOccupied[0] = FIRSTDUDE;
                this.listChair[i].isOccupied[1] = this.role;
                this.listChair[i].isOccupied[2] += 1;

            } else if(this.listChair[i].isOccupied[0] == FIRSTDUDE && this.role == this.listChair[i].isOccupied[1]) {
                console.log("STACK");

                this.listChair[i].isOccupied[0] == OCCUPIED;


            } else if (this.listChair[i].isOccupied[0] == OCCUPIED && this.role != this.listChair[i].isOccupied[1]) {
                console.log("GO BACK TO YOUR POSITION");
            }
            // if the character is allowed to stay, it cannot be played anymore
            if(this.listChair[i].isOccupied[0] == FREE || (this.role == this.listChair[i].isOccupied[1])) {
                if (this.listChair[i].sitDirection == MovingObject.DIRECTION_UP) {
                       //cf condition first IF position
                    this.position.y = this.position.y +2;
                    this.setTexture(this.textures[0]);
                } else if (this.listChair[i].sitDirection == MovingObject.DIRECTION_DOWN) { //up

                    this.setTexture(this.textures[12]);
                    this.position.y = this.position.y - 20;
                }
                this.stackCharacter(i);

                if(this.listChair[i].sitDirection == DIRECTION_DOWN) {
                    this.listChair[i].bringToFront();
                }



                this.interactive = false;
                this.facingDirection = this.STAY;
                this.animationDirection = this.STAY;
            }

            //TODO ELSE IF SAME CHARACTER TYPE else if not the same character manage before ?
        }
    }

}

MovingObject.prototype.moveAnimate = function (CNTRL) {
    if((cos % Math.PI/16)) {
    switch (this.facingDirection) {

        case MovingObject.DIRECTION_UP:
            if(this.position.y > this.finalPosition.y ) {
                this.position.y -= this.stepSize/16 ;
            }
            break;

        case MovingObject.DIRECTION_RIGHT:
            if(this.position.x < this.finalPosition.x ) {
                this.position.x += this.stepSize/16 ;
            }
            break;

        case MovingObject.DIRECTION_DOWN:
            if(this.position.y < this.finalPosition.y ) {
                this.position.y += this.stepSize/16 ;
            }
            break;

        case MovingObject.DIRECTION_LEFT:
            if(this.position.x > this.finalPosition.x ) {
                this.position.x -= this.stepSize/16 ;
            }
                break;
        default:
            break;
    }

    }

}


MovingObject.prototype.showGhost = function () {

    for (i = 0; i <= 12; i+= 4) {
      //  this.ghostTexture.setTexture(this.textures[i]);

        switch (i) {

            case 0:

                this.ghostTextures[0].position.y = this.position.y + 64;
                this.ghostTextures[0].position.x = this.position.x;
                this.ghostTextures[0].visible = true;
                break;

            case 4:

                this.ghostTextures[1].position.x = this.position.x - 64;
                this.ghostTextures[1].position.y = this.position.y;
                this.ghostTextures[1].visible = true;
                break;

            case 8:
                this.ghostTextures[2].position.y = this.position.y;
                this.ghostTextures[2].position.x = this.position.x + 64;
                this.ghostTextures[2].visible = true;
                break;

            case 12:
                this.ghostTextures[3].position.x = this.position.x;
                this.ghostTextures[3].position.y = this.position.y - 64;
                this.ghostTextures[3].visible = true;
                break;
            default:
                break;
        }



    }
}


MovingObject.prototype.removeGhost = function () {


    for (i = 0; i < 4; i+= 1) {

        this.ghostTextures[i].visible = false;
    }
}


MovingObject.prototype.stay = function () {

    this.facingDirection = MovingObject.STAY;
}

//animate the character
MovingObject.prototype.animate = function () {

    if(this.subCounterAnim  % 5 == 0) {
        this.subCounterAnim  = 1;
    }


    switch (this.animationDirection) {
        case MovingObject.DIRECTION_UP:
            //texture 12 a 15
            this.setTexture(this.textures[this.subCounterAnim +11]);


            break;

        case MovingObject.DIRECTION_RIGHT:

            this.setTexture(this.textures[this.subCounterAnim +7]);
            break;

        case MovingObject.DIRECTION_DOWN:

            this.setTexture(this.textures[this.subCounterAnim -1]);
            break;

        case MovingObject.DIRECTION_LEFT:

            this.setTexture(this.textures[this.subCounterAnim +3]);
            break;

        default:
            break;
    }
    this.subCounterAnim  += 1;
}

MovingObject.prototype.stackCharacter = function(i) {
    if (typeof(this.listChair[i].isOccupied[1]) !== 'undefined') {


            if (this.activate == true && this.role == this.listChair[i].isOccupied[1] && (this.listChair[i].isOccupied[0] == FIRSTDUDE ||this.listChair[i].isOccupied[0] == OCCUPIED)) {
                switch (this.role) {

                    case WOMAN:


                        if (this.listChair[i].sitDirection == DIRECTION_DOWN) {
                            textureStack = new PIXI.Texture(PIXI.Texture.fromImage('sprites/womanblue.png'), {x: 0, y: 144, width: 36, height: 48});


                            this.setTexture(textureStack);
                        } else {
                            textureStack = new PIXI.Texture(PIXI.Texture.fromImage('sprites/womanblue.png'), {x: 0, y: 0, width: 36, height: 48});
                            this.setTexture(textureStack);
                        }

                        this.bringToFront();
                        break;
                    case OLD:
                        textureStack = new PIXI.Texture(PIXI.Texture.fromImage('sprites/oldblue.png'), {x: 0, y: 0, width: 36, height: 48});
                        textureStack2 = new PIXI.Texture(PIXI.Texture.fromImage('sprites/oldblue.png'), {x: 0, y: 144, width: 36, height: 48});
                        console.log("aaa" +this.listChair[i].sitDirection);
                        if (this.listChair[i].sitDirection == DIRECTION_DOWN) {
                            this.setTexture(textureStack2);
                        } else if (this.listChair[i].sitDirection == DIRECTION_UP) {
                            this.setTexture(textureStack);
                        }

                        this.bringToFront();
                        break;
                    case BOBBY:
                        textureStack = new PIXI.Texture(PIXI.Texture.fromImage('sprites/bobby2.png'), {x: 0, y: 0, width: 36, height: 48});
                        textureStack2 = new PIXI.Texture(PIXI.Texture.fromImage('sprites/bobby2.png'), {x: 0, y: 144, width: 36, height: 48});

                        if (this.listChair[i].sitDirection == DIRECTION_DOWN) {
                            this.setTexture(textureStack2);
                        } else {
                            this.setTexture(textureStack);
                        }

                        this.bringToFront();
                        break;
                    default:
                        break;
                }
                this.activate = false;
            }
        }

}

MovingObject.prototype.bringToFront = function() {
    if (this.parent) {
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(this);
    }
}



MovingObject.prototype.scoring = function() {
    this.score += 10;
}

// --------------------------------MOUSE HANDLER-------------------------------------------------
MovingObject.prototype.mousedown = function(data) {
    this.selecPortrait.visible = true;

    if(this.role == OLD) {
        this.selecPortrait.setTexture(new PIXI.Texture(PIXI.Texture.fromImage('sprites/oldm.png'),{x: 0, y: 0, width: 36, height: 25}));
    }
    if(this.role == WOMAN) {
        this.selecPortrait.setTexture(new PIXI.Texture(PIXI.Texture.fromImage('sprites/pregnant.png'),{x: 0, y: 0, width: 36, height: 25}));
    }
    if(this.role == BOBBY) {
        this.selecPortrait.setTexture(new PIXI.Texture(PIXI.Texture.fromImage('sprites/bobby.png'),{x: 0, y: 0, width: 36, height: 25}));
    }
    this.isdown = true;
    this.isMoving = true;

    this.showGhost();
    this.alpha = 0.75;



};

MovingObject.prototype.mouseup = function () {
    this.isdown = false;
    this.alpha = 1;
    this.removeGhost();
};

/* mouseupoutside assign the current direction */
MovingObject.prototype.mouseupoutside = function(data){
    this.removeGhost();
    this.ismouseUp = true;
    this.isdown = false;
    this.alpha = 1;
    var angle = Math.atan2((data.getLocalPosition(this).x), data.getLocalPosition(this).y);
    this.aimedPosition.x = this.position.x + data.getLocalPosition(this).x;
    this.aimedPosition.y = this.position.y + data.getLocalPosition(this).y;

    angle = (angle > 0 ? angle : (2*Math.PI + angle)) * 360 / (2*Math.PI);

    if(angle>=45 && 135>angle) {
        this.facingDirection = MovingObject.DIRECTION_RIGHT;
    }
    if(angle>=135 && 225>angle) {
        this.facingDirection = MovingObject.DIRECTION_UP;
    }
    if(angle>=225 && 315>angle) {
        this.facingDirection = MovingObject.DIRECTION_LEFT;
    }
    if((angle>=315 && 360>angle) || (angle>0 && 45>angle))  {
        this.facingDirection = MovingObject.DIRECTION_DOWN;
    }

}

MovingObject.prototype.touchendoutside = function(){};
MovingObject.prototype.touchend = function () {};
MovingObject.prototype.touchendoutside = function(){};

MovingObject.DIRECTION_UP = 1;
MovingObject.DIRECTION_RIGHT = 2;
MovingObject.DIRECTION_DOWN = 3;
MovingObject.DIRECTION_LEFT = 4;
MovingObject.STAY = 0;

MovingObject.ROLE_WOMAN2 = 15;
MovingObject.ROLE_WOMAN = 0;
MovingObject.ROLE_BLIND = 3;

OLD = 1;
WOMAN = 2;
BOBBY = 3;

FREE = 0;
FIRSTDUDE = 1;
OCCUPIED = 2;

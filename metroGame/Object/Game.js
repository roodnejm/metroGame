/**
 * Created by Max on 11/02/2015.
 */







function Game () {

    this.initLevel();
    this.initScore();
    this.initMap();
}

Game.prototype.initLevel = function () {
    this.chairNbr = 16;
    this.listChair = [];
    this.levelOneChairDir =
           [DIRECTION_UP,DIRECTION_UP,DIRECTION_DOWN,DIRECTION_DOWN,
            DIRECTION_UP,DIRECTION_UP,DIRECTION_DOWN,DIRECTION_DOWN,
            DIRECTION_UP,DIRECTION_UP,DIRECTION_DOWN,DIRECTION_DOWN,
            DIRECTION_UP,DIRECTION_UP,DIRECTION_DOWN,DIRECTION_DOWN]
    this.levelOneChairX = [64,128,64,128,320,256,320,256,256,320,256,320,64,128,64,128];
    this.levelOneChairY = [64,64,128,128,64,64,128,128,256,256,320,320,384,384,448,448];
    for(i=0;i<this.chairNbr ; i++) {
        this.listChair.push(new Chair(this.levelOneChairDir[i],this.levelOneChairX[i],this.levelOneChairY[i]));
        stage.addChild(this.listChair[i]);
    } console.log("sitadosit " + this.listChair[0].sitDirection);

}

Game.prototype.initChar = function () {
    selecPortrait = new Portrait();
    stage.addChild(selecPortrait);

    characterPosition = [new PIXI.Point(128, 256), new PIXI.Point(192, 192), new PIXI.Point(192, 256),
        new PIXI.Point(192, 320), new PIXI.Point(128, 320), new PIXI.Point(192, 128)];
//instanciate characters


    this.tileWidth = 32;
    this.tileHeight = 48;
    this.stepSize = 64;
    this.dudes = [];

    dude = new MovingObject({
        textures: interface.animationTextures,
        stepSize: this.stepSize, list: this.listChair, selecPortrait: selecPortrait, CNTR: this.CNTR, initPos: characterPosition[0], role: WOMAN
    });


    dude2 = new MovingObject({
        textures: interface.womanBlueTextures,
        stepSize: this.stepSize, list: this.listChair, selecPortrait: selecPortrait, CNTR: this.CNTR, initPos: characterPosition[1], role: OLD
    });

    dude3 = new MovingObject({
        textures: interface.bobbyTextures,
        stepSize: this.stepSize, list: this.listChair, selecPortrait: selecPortrait, CNTR: this.CNTR, initPos: characterPosition[2], role: BOBBY
    });

    dude4 = new MovingObject({
        textures: interface.bobbyTextures,
        stepSize: this.stepSize, list: this.listChair, selecPortrait: selecPortrait, CNTR: this.CNTR, initPos: characterPosition[3], role: BOBBY
    });

    dude5 = new MovingObject({
        textures: interface.animationTextures,
        stepSize: this.stepSize, list: this.listChair, selecPortrait: selecPortrait, CNTR: this.CNTR, initPos: characterPosition[4], role: WOMAN
    });
    dude6 = new MovingObject({
        textures: interface.womanBlueTextures,
        stepSize: this.stepSize, list: this.listChair, selecPortrait: selecPortrait, CNTR: this.CNTR, initPos: characterPosition[5], role: OLD
    });
    this.dudes.push(dude);
    this.dudes.push(dude2);
    this.dudes.push(dude3);
    this.dudes.push(dude4);
    this.dudes.push(dude5);
    this.dudes.push(dude6);
    for (i = 0; i < this.dudes.length; i++) {
        stage.addChild(this.dudes[i]);

    }

    this.item = new Item(new PIXI.Point(256,64));
    this.item2 = new Item(new PIXI.Point(256,192));
    this.item3 = new Item(new PIXI.Point(256,320));
    stage.addChild(this.item);
    stage.addChild(this.item2);
    stage.addChild(this.item3);
}

Game.prototype.initScore = function () {
    this.score = 0;
}

Game.prototype.initMap = function () {
    this.map = new Array(6,8);
    for(var i=0;i<7;i++) {
        for(var j=0;j<7;j++) {
           this.map[i,j] = FREE;
        }
    }
}
Game.prototype.animeCharacters = function (inverse) {

    if(inverse) {

        for(i=0;i<this.dudes.length;i++) {
            if(this.dudes[i].activate == true) {
                this.dudes[i].scale = new PIXI.Point(1,1.16);
            } else {
                this.dudes[i].scale = new PIXI.Point(1.2,1.2);
            }

        }


    } else {

        for(j=0;j<this.dudes.length;j++) {
            if(this.dudes[j].activate == true) {
                this.dudes[j].scale =  new PIXI.Point(1.1,0.96);
            }          else {
            this.dudes[j].scale = new PIXI.Point(1,1);
        }

        }
    }
}

DIRECTION_UP = 1;
DIRECTION_RIGHT = 2;
DIRECTION_DOWN = 3;
DIRECTION_LEFT = 4;
STAY = 0;

OLD = 1;
WOMAN = 2;
BOBBY = 3;


FREE = 0;
FIRSTDUDE = 1;
OCCUPIED = 2;
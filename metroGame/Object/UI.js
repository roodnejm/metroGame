/**
 * Created by Max on 14/02/2015.
 */
WIDTHSPRITE = 32;
HEIGHTSPRITE = 48;

var textures;
var listChair = [];
var grid;

var score = 0;
var ground;


function UI() {
 this.grid = this.drawGriddedStage();
 this.initUi();
 this.initCharacters();
 this.initTextStyle();
}

UI.prototype.initUi = function() {

    this.back = new PIXI.Sprite(new PIXI.Texture(PIXI.Texture.fromImage('sprites/bg2.png'))) || {} ;
    this.back.position = new PIXI.Point(-48,-7) || {};
    this.initBackPos = this.back.position || {};
    stage.addChild(this.back);


    this.text = new PIXI.Text(0, {font: "bold 24px Chalkboard", fill: "#fcf8dd", align: "center", stroke: "#ffdeb0",
        strokeThickness: 4, dropShadow : true, dropShadowColor: "#99856a",dropShadowAngle: Math.PI/4,
        dropShadowDistance:7}) || {};
    this.textFPS = new PIXI.Text(0, {font: " 12px Arial", fill: "#000000", align: "center", stroke: "#FFFFFF",
        strokeThickness: 6, dropShadow : true, dropShadowColor: "#99856a",dropShadowAngle: Math.PI/4,
        dropShadowDistance:7}) || {};
    this.textTimeUp = new PIXI.Text("TIME's UP!", {font: "bold 36px Chalkboard", fill: "#fcf8dd", align: "center", stroke: "#ffdeb0",
        strokeThickness: 4, dropShadow : true, dropShadowColor: "#99856a",dropShadowAngle: Math.PI/4,
        dropShadowDistance:7}) || {};
    //      timeLabel = new PIXI.Text("Time :", {font: "bold 24px Chalkboard", fill: "#fcf8dd", align: "center", stroke: "#ffdeb0",
    //          strokeThickness: 6, dropShadow : true, dropShadowColor: "#99856a",dropShadowAngle: Math.PI/4,dropShadowDistance:7});
    this.labeltextScore = new PIXI.Text("Score", {font: "bold 12px Chalkboard", fill: "#fcf8dd", align: "center", stroke: "#040504",
        strokeThickness: 3, dropShadow : true, dropShadowColor: "#99856a",dropShadowAngle: Math.PI/4,
        dropShadowDistance:7}) || {};
    this.textScore = new PIXI.Text(0, {font: "bold 18px Chalkboard", fill: "#fcf8dd", align: "center", stroke: "#040504",
        strokeThickness: 3, dropShadow : true, dropShadowColor: "#99856a",dropShadowAngle: Math.PI/4,
        dropShadowDistance:7}) || {};
    this.text.position = new PIXI.Point(320,5);
    this.textFPS.position = new PIXI.Point(20,5);
    this.textTimeUp.position = new PIXI.Point(96,222);
    this.textScore.position = new PIXI.Point(180,485);
    this.labeltextScore.position = new PIXI.Point(169,472);
    stage.addChild(this.text);
    stage.addChild(this.textFPS);

}

/* draw elliptic grid */
UI.prototype.drawGriddedStage = function () {

    //create landscape
    var graphics = new PIXI.Graphics();
    //   graphics.beginFill(0x00FF00);
    var ground = new PIXI.Sprite(new PIXI.Texture(PIXI.Texture.fromImage('sprites/ground.png')));


    stage.addChild(ground);
    var lineStyle = graphics.lineStyle(1,000000,0.3);

    for(i=0;i<=384;i+=64) {
        // graphics.lineTo(32,0);
        graphics.moveTo(i,0);
        //  graphics.lineTo(i,512);
        //  graphics.moveTo(0,0);

        for(j=0;j<=512;j+=64) {
            graphics.drawEllipse ( i,  j,  1 , 64 );
        }

    }
    for(i=0;i<=512;i+=64) {
        graphics.moveTo(0,i);

        for(j=0;j<=512;j+=64) {
            var elipse = graphics.drawEllipse ( j,  i,  64 , 1 );

        }


    }
    //  graphics.endFill();
    // add it the stage so we see it on our screens..
    stage.addChild(graphics);
}

/* initialize the characters flow */
UI.prototype.initCharacters = function () {

    this.animationTextures = [];
    this.womanGreenTextures = [];
    this.womanBlueTextures = [];
    this.bobbyTextures = [];
    this.loadWomanTexture();
    this.loadOld();
    this.loadBobby();



}

UI.prototype.loadWomanTexture = function() {
 /*   textures = [
        PIXI.Texture.fromImage('sprites/pregnant.png').baseTexture
    ]; */

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var tempTexture = new PIXI.Texture(PIXI.Texture.fromImage('sprites/pregnant.png'),
                {x: j * WIDTHSPRITE, y: i * HEIGHTSPRITE, width: WIDTHSPRITE, height: HEIGHTSPRITE});
            this.animationTextures.push(tempTexture);
        }
    }
}

UI.prototype.loadOld = function() {

 /*   textures= [
        PIXI.Texture.fromImage('sprites/oldm.png').baseTexture
    ];
*/
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4 ; j++) {
            var tempTexture = new PIXI.Texture(PIXI.Texture.fromImage('sprites/oldm.png'),
                {x: j* WIDTHSPRITE, y: i * HEIGHTSPRITE, width: WIDTHSPRITE, height: HEIGHTSPRITE});
            this.womanBlueTextures.push(tempTexture);
        }

    }
}

UI.prototype.loadBobby = function() {

  /*  textures= [
        PIXI.Texture.fromImage('sprites/bobby.png').baseTexture
    ];*/

    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4 ; j++) {
            var tempTexture = new PIXI.Texture(PIXI.Texture.fromImage('sprites/bobby.png'),
                {x: j* WIDTHSPRITE, y: i * HEIGHTSPRITE, width: WIDTHSPRITE, height: HEIGHTSPRITE});
            this.bobbyTextures.push(tempTexture);
        }
    }
}

UI.prototype.animeChair = function (inverse) {
    if(inverse) {

        for(i=0;i<this.listChair.length;i++) {

            this.listChair[i].scale = new PIXI.Point(0.99,1.01);
        }


    } else {
        for(j=0;j<this.listChair.length;j++) {
            this.listChair[j].scale =  new PIXI.Point(1.01,0.99);
        }
    }
}


UI.prototype.animeBack = function (inverse) {
    if(inverse) {

        this.back.position.x +=1 ;
        this.back.position.y -=1;
    } else {

        this.back.position.x -=1 ;
        this.back.position.y +=1;
    }
}

UI.prototype.setInitBackPos = function () {
    this.back.position = this.initBackPos;
}

UI.prototype.setTextStyle = function(iC) {

    var police = "bold 2" + tab[iC] + "px Chalkboard";

    this.style.font = police;
    this.style.shadowOffsetX == tab[iC];
    this.style.shadowOffsetY == tab[iC];
    this.text.setStyle(this.style);
}

UI.prototype.setTextStyleEnd = function(iC) {

    var police = "bold 2" + tab[iC] + "px Chalkboard";
    this.style.font = police;
    this.style.shadowOffsetX == tab[iC];
    this.style.stroke = "#ff5b5b";
    this.text.setStyle(this.style);
}



UI.prototype.initTextStyle = function() {
    this.style = new Object();
    this.style.font = "bold 24px Chalkboard";
    this.style.align = "center";
    this.style.strokeThickness = 6;
    this.style.fill = "#ffffff";
    this.style.dropShadow = true;
    this.style.stroke = "#FF9933";
    this.style.dropShadowColor = "#b64141";
    this.style.dropShadowAngle = Math.PI/4;
    this.style.dropShadowDistance = 7;
}

UI.prototype.initStatsUi = function() {
    this.bottomUi = new PIXI.Sprite(new PIXI.Texture(PIXI.Texture.fromImage('UIsprites/uitest1.png'))) || {} ;
    this.bottomUi.position = new PIXI.Point(0,440);
    stage.addChild(this.bottomUi);
    stage.addChild(this.labeltextScore);
    stage.addChild(this.textScore);

    var graphics = new PIXI.Graphics();
    graphics.lineStyle(1, 040504);
    graphics.drawRoundedRect(30,490,15,15,6);
    graphics.drawRoundedRect(49,490,15,15,6);
    graphics.drawRoundedRect(68,490,15,15,6);
    graphics.drawRoundedRect(318,484,32,32,12);
    stage.addChild(graphics);

}
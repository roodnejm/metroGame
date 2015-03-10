/**
 * Created by Max on 16/09/2014.
 */
var interface;
var game;
var CNTR = 0;
var selecPortrait;
var interactive = true;


var fps = 30;
var timeMs = 0;
var now;
var then = Date.now();
//update time interval
var interval = 1000/fps;
var delta;

var time;
var counter = 0;
var displayedTimer = "120";
var first = then;
var text;
var inverse = true;

var iC = 0;
var tab = [4,5,6,7,8,9,8,7,6,5,4];
var counterDelta = 0;
var timer = 0
var cos = 0;
// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99,interactive);
//create a renderer instance.
var renderer = PIXI.autoDetectRenderer(384, 512);
//add the renderer view element to the DOM
document.body.appendChild(renderer.view);

//initialize the game
initialize();
requestAnimFrame( animate );


//---------------------------------------------------------
//initialize level (chairs, items, map)
function initialize() {
    interface = new UI();
    game = new Game();
    interface.initStatsUi();
    game.initChar();
    interface.listChair = game.listChair;
//    controller = new Controller(interface,game);

}

function animate() {
    CNTR++;
    //checking every 12 frames
    if (CNTR % 12 == 0) {

        for (i = 0; i < game.dudes.length; i++) {
            if(game.dudes[i].activate == true) {
                console.log("animate");
                game.dudes[i].animate();
            }

        }
    }

    if (CNTR % 15 == 0) {
        for (h = 0; h < game.dudes.length; h++) {

            if(game.dudes[h].ismouseUp == true) {
                game.dudes[h].move();

            }
            game.dudes[h].sit();

            if (game.dudes[h].position.x == game.item.position.x && game.dudes[h].position.y == game.item.position.y)
                game.item.getItem();
            if (game.dudes[h].position.x == game.item2.position.x && game.dudes[h].position.y == game.item2.position.y)
                game.item.getItem();
            if (game.dudes[h].position.x == game.item3.position.x && game.dudes[h].position.y == game.item3.position.y)
                game.item.getItem();
        }

    }

    for (h = 0; h < game.dudes.length; h++) {
        if(game.dudes[h].position.x != game.dudes[h].finalPosition.x || game.dudes[h].position.y != game.dudes[h].finalPosition.y) {
            console.log(game.dudes[h].position.x);
            game.dudes[h].moveAnimate(CNTR);
        }
    }

    if (CNTR == 100) {
        CNTR = 0;
    }

    requestAnimFrame(animate);
    renderer.render(stage);
    updateTimer();
}





/** calculate framerate, timer, display the time, FX zoom/dezoom timer, */

function updateTimer() {
    //get timestamp
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        // update time stuffs
        then = now - (delta % interval);
        ++counter;
        //FPS between t-1 et t
        timeMs = (then - first)/1000;
        timer = parseInt(timeMs);
         cos +=Math.round(Math.cos(Math.PI/8));
        if(Math.round(parseInt(counter)) % 10 == 0) {
            inverse = !inverse.valueOf();
            interface.animeChair(inverse);
            game.animeCharacters(inverse);
            interface.animeBack(inverse);
        }
    }

    if(displayedTimer>0) {
        displayedTimer = 120 - timer;
        interface.text.setText(displayedTimer);
        if(displayedTimer < 117) {
            if(displayedTimer == 117) {
            }

            if(displayedTimer < 117) {

                if(counter % 5 == 0 && counter != counterDelta)  {
                    if (iC >= 0) {
                        iC++;
                        counterDelta = counter;
                    }
                    interface.setTextStyle(iC);

                    if (iC >= 10) {
                        iC = 0;
                    }
                }
            }
            if(displayedTimer == 115) {
                interface.setTextStyleEnd(iC);
            }
            if(displayedTimer < 115) {

                if(counter % 3 == 0 && counter != counterDelta)  {
                    if (iC >= 0) {
                        iC++;
                        counterDelta = counter;
                    }

                    if (iC >= 10) {
                        interface.setInitBackPos();
                        iC = 0;
                    }
                }
            }
        }
        if(!isNaN(parseInt(counter/timer))) {
            interface.textFPS.setText("FPS: " + parseInt(counter/timer));
        }


    }

    if(displayedTimer == 0) {
        stage.addChild(interface.textTimeUp);
        interface.textTimeUp.visible = true;

    }
}


stage.mousedown = function(data) {
    // console.log(data.getLocalPosition(this));
    dude.isSelected = false;
    selecPortrait.visible = false;
    //  console.log('this.vector down x y', data.getLocalPosition(this).x + " " + data.getLocalPosition(this).y);
};

DIRECTION_UP = 1;
DIRECTION_RIGHT = 2;
DIRECTION_DOWN = 3;
DIRECTION_LEFT = 4;
STAY = 0;


OLD = 1;
WOMAN = 2;
BOBBY = 3;


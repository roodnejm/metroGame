/**
 * Created by Max on 11/02/2015.
 */

//var textures = [];

function Portrait () {

    this.textures = [];
    // display a portrait of the character selected

    this.textures[0] = new PIXI.Texture(PIXI.Texture.fromImage('sprites/pregnant.png'),{x: 0, y: 0, width: 36, height: 25});

    // Inheritance (super) fait le taff du movieclip
    PIXI.MovieClip.call(this, this.textures);
    this.scale = new PIXI.Point(1.2,1.2);

    this.position.x = 315;
    this.position.y = 480;
    this.visible = true;
}

// Inheritance
Portrait.prototype = Object.create(PIXI.MovieClip.prototype, {
    constructor: Portrait
});



OLD = 1;
WOMAN = 2;
BOBBY = 3;
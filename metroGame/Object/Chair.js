/**
 * Created by Max on 17/09/2014.
 */

function Chair(facingDirection,x,y) {
    var position = new PIXI.Point(x,y);
    // create a texture from an image path
    this.texture = new PIXI.Texture(PIXI.Texture.fromImage('sprites/sprites64.png'));
    this.sitDirection = facingDirection;
    //isoccupied, role, compteur
    this.isOccupied = [FREE,0,0];
    // create a new Sprite using the texture
    if(this.sitDirection == DIRECTION_UP) {
        // 342 0 62 64 coordinates of the chair facing south
        this.texture = new PIXI.Texture(PIXI.Texture.fromImage('sprites/sprites64.png'), new PIXI.Rectangle(342, 0, 62, 64), new PIXI.Rectangle(32, 32, 32, 32), new PIXI.Rectangle(32, 32, 32, 32));

    }
    else if (this.sitDirection == DIRECTION_DOWN){
        // 342 0 62 64 coordinates of the chair facing south
        this.texture = new PIXI.Texture(PIXI.Texture.fromImage('sprites/sprites64.png'), new PIXI.Rectangle(342, 64, 62, 64), new PIXI.Rectangle(32, 32, 32, 32), new PIXI.Rectangle(32, 32, 32, 32));
    }
    // Inheritance (super)
//    console.log(this + " " + this.texture);
    PIXI.Sprite.call(this, this.texture);
//    var texture2 = new PIXI.Sprite(textInter);
    // center the sprites anchor point
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    // move the sprite t the center of the screen
    this.position.x = x;
    this.position.y = y;


    return this;

}

// Inheritance
Chair.prototype = Object.create(PIXI.Sprite.prototype, {
    constructor: Chair
});

Chair.prototype.bringToFront = function() {
    if (this.parent) {
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(this);
    }
}
//code character
OLD = 1;
WOMAN = 2;
BOBBY = 3;

FREE = 0;
FIRSTDUDE = 1;
OCCUPIED = 2;
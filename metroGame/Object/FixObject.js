/**
 * Created by Max on 17/09/2014.
 */
function FixObject(faceDirection,x,y) {

    // create a texture from an image path
    var texture = PIXI.Texture.fromImage('/m1/sprites/sprites64.png');
    // create a new Sprite using the texture

    if(faceDirection == "s") {
        // 342 0 62 64 coordinates of the chair facing south
        var textInter = new PIXI.Texture(texture, new PIXI.Rectangle(342, 0, 62, 64), new PIXI.Rectangle(32, 32, 32, 32), new PIXI.Rectangle(32, 32, 32, 32));

    }
    else if (faceDirection == "n"){
        // 342 0 62 64 coordinates of the chair facing south
        var textInter = new PIXI.Texture(texture, new PIXI.Rectangle(342, 64, 62, 64), new PIXI.Rectangle(32, 32, 32, 32), new PIXI.Rectangle(32, 32, 32, 32));
    }
    var texture2 = new PIXI.Sprite(textInter);
    // center the sprites anchor point
    texture2.anchor.x = 0.5;
    texture2.anchor.y = 0.5;

    // move the sprite t the center of the screen
    texture2.position.x = x;
    texture2.position.y = y;

    return texture2;
}
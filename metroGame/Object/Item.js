/**
 * Created by Max on 17/09/2014.
 */
function Item (point) {
    this.texture =   new PIXI.Texture(PIXI.Texture.fromImage('sprites/objet.png'),{x: 0, y: 120, width: 36, height: 25})
|| {};
// Inheritance (super)
    PIXI.Sprite.call(this, this.texture);
    this.position = point;
    this.scale = new PIXI.Point(2,2);
    this.anchor = new PIXI.Point(1,0.5);
    this.alpha = 1.5;


}
// Inheritance
Item.prototype = Object.create(PIXI.Sprite.prototype, {
    constructor: Item
});

Item.prototype.getItem = function () {

    this.anchor = new PIXI.Point(1,1);

    this.position.x = 46;
    this.position.y = 514;
    this.scale = new PIXI.Point(1.2,1.2);

}

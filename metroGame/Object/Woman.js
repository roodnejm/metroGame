/**
 * Created by Max on 11/02/2015.
 */


function Woman (params) {
    this.textures = params.textures || [];
    listChair = params.list || [];
    //initial position
    initPos = params.initPos || new PIXI.Point(0,0);

    // global counter of the main
    this.CNTR = params.CNTR || 0;
    // avatar of the character
    selecPortrait = params.selecPortrait || new Portrait();
    this.stepSize = params.stepSize || 1;
    // Inheritance (super)

    MovingObject.call(this, this.textures, list, initPos, CNTR, selecPortrait, stepSize);
}

// Inheritance
Woman.prototype = Object.create(MovingObject.prototype, {
    constructor: Woman
});

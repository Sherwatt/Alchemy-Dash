class Alchemist extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }
    //preload() {
        //this.preload,spritesheet('player', './assets/test_char.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
    //}
}
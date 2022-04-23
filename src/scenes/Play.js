class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.preload,spritesheet('player', './assets/test_char.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
    }
}
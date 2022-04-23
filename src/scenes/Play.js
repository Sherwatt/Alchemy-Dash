class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.preload,spritesheet('player', './assets/test_char.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
    }
    create() {
        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2, first: 0}),
        });
    }
}
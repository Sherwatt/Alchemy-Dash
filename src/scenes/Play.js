class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.preload,spritesheet('player', './assets/test_char.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
    }
    create() {
        this.player = new Alchemist(this, 100, 20, 'player').setOrigin(0.5, 0);
        
        this.anims.create({
            key: 'runner',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2, first: 0}),
            frameRate: 20
        });
    }
}
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.spritesheet('player', './assets/test_char.png', {frameWidth: 60, frameHeight: 62, startFrame: 0, endFrame: 3});
    }
    create() {
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.player = new Alchemist(this, 250, 200, 'player').setOrigin(0.5, 0);

        this.anims.create({
            key: 'runner',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 1]}),
            frameRate: 4,
            repeat: -1,
        });
        this.player.play("runner");

    }
}
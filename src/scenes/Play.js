class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.spritesheet('player', './assets/basic_run_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame: 7});
    }
    create() {
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.player = new Alchemist(this, 150, 200, 'player').setOrigin(0, 0);

        this.anims.create({
            key: 'runner',
            frames: this.anims.generateFrameNumbers('player', {startFrame: 0, endFrame: 7}),
            frameRate: 12,
            repeat: -1,
        });
        this.player.play("runner");

        this.distance = 0;

        let distanceConfig = {
            fontFamily: 'Rockwell',
            fontSize: '21px',
            color: '#00FF33',
            align: 'right',
            padding: {
                top: 10,
                bottom: 10,
            },
            
        }
        this.distanceTraveled = this.add.text(600, 20, this.distance, distanceConfig); //can't figure out how to add text to this, or how to get the text to expand left rather than right
        this.timer = this.time.addEvent({delay: 100, callback: this.addDistance, callbackScope: this, loop: true});
    }

    update() {
        this.player.update();
    }
    addDistance() {
        this.distance += 1;
        this.distanceTraveled.text = this.distance;
    }
}
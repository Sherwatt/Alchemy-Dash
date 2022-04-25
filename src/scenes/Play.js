class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.audio('bounce', './assets/jumping.wav');
        this.load.image('platform', './assets/brick_tiles_1.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('background1', './assets/1_background.png');
        this.load.image('background2', './assets/2_background.png');
        this.load.image('background3', './assets/3_background.png');
        this.load.image('background4', './assets/4_background.png');
        this.load.spritesheet('player', './assets/basic_run_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame: 7});
    }
    create() {
        //tile sprite backgrounds
        this.background4 = this.add.tileSprite(0, 0, 640, 480, 'background4').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 640, 480, 'background3').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 640, 480, 'background2').setOrigin(0, 0);
        this.background1 = this.add.tileSprite(0, 0, 640, 480, 'background1').setOrigin(0, 0);
        let grownd = this.add.tileSprite(0, game.config.height-72, 640, 72, 'ground').setOrigin(0, 0); 

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //The player won't land on the ground, instead he falls through it, why?
        this.ground = this.physics.add.staticGroup();
        this.ground.create = (100, 640, grownd);

        this.player = this.physics.add.sprite(100, 300, 'player');
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.ground);

        //this.player = new Alchemist(this, 150, 200, 'player').setOrigin(0, 0);
        //not sure what to do about the Alchemist class now, but we can implement physics, which is good

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
        //basic jumping ability, no animation for it yet
        if(keySPACE.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-300);
            this.sound.play('bounce');
        }
    }
    addDistance() {
        this.distance += 1;
        this.distanceTraveled.text = this.distance;
    }
}
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('ground', './assets/ground.png');

        // load spritesheets
        this.load.spritesheet('run', './assets/basic_run_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame:7});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.ground = this.add.tileSprite(0, 0, 640, 66, 'ground').setOrigin(0, -6.74); 

        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        /*this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);*/
        
        // run animation config
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', {start: 0, end: 7, first: 0}),
            frameRate: 12,
            repeat: -1
        })
        // add player
        this.player = new player(this, game.config.width/4, game.config.height - 3.5*borderUISize - borderPadding, 'run').setOrigin(0, 0);
        

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffdc8a',
            color: '#863800',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
    }

    update() {
        // check key input for menu
        if(Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX += 4;  // update tile sprite
        this.ground.tilePositionX += 6;

        if(!this.gameOver) {
            this.player.update();             // update p1
        }
    }
}
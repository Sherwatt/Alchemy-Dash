class Death extends Phaser.Scene{
    constructor(){
        super("gameoverScene");
    }

    preload() {
        this.load.audio('play', './assets/startgame_sfx.wav');
        this.load.audio('menu', './assets/backtomenu_sfx.wav');
        this.load.image('forest', './assets/forest.png');
    }

    //scene displays a little message, I'll add a way for it to display your score in a bit
    create() {
        this.background_img = this.add.tileSprite(0, 0, 1280, 720, 'forest').setOrigin(0, 0);
        let deathConfig = {
            fontFamily: 'Alagard',
            fontSize: '64px',
            stroke: '#141144',
            strokeThickness: 8,
            color: '#CBDA73',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/3, "YOU DIED", deathConfig).setOrigin(0.5);
        deathConfig.fontSize = '28px';
        this.add.text(game.config.width/2, game.config.height/2 + 30, "Score: " + `${(Math.round(gameOptions.distance/10))*5}`, deathConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 140, "Press SPACE to try again\n ESC to go back to the menu", deathConfig).setOrigin(0.5);
        deathConfig.fontStyle = 'italic';
        this.add.text(game.config.width/2, game.config.height/3 + 60, "Your search for immortality was futile.", deathConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('play');
            // reset score and enemy speed
            gameOptions.distance = 0;
            gameOptions.enemyStartSpeed = 350,
            // Start game
            this.scene.start("playScene");
        }
        else if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.sound.play('menu');
            //back to menu
            this.scene.start("menuScene");
        }
    }
}
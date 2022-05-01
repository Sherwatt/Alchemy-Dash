class Death extends Phaser.Scene{
    constructor(){
        super("gameoverScene");
    }

    preload() {
        this.load.audio('play', './assets/startgame_sfx.wav');
        this.load.audio('menu', './assets/backtomenu_sfx.wav');
    }

    //scene displays a little message, I'll add a way for it to display your score in a bit
    create() {

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        let deathConfig = {
            fontFamily: 'Didot',
            fontSize: '35px',
            fontStyle: 'bold',
            color: '#000000',
            align: 'center',
        }
        this.add.text(275, game.config.height/4, "YOU DIED", deathConfig);
        deathConfig.fontSize = '28px';
        deathConfig.fontStyle = 'italic';
        this.add.text(175, game.config.height/3 + 50, "Your search for immortality was futile.", deathConfig);
        this.add.text(210, game.config.height/2 + 50, "Press SPACE to try again\nESC to go back to the menu", deathConfig);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('play');
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
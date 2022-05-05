class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
      this.load.audio('play', './assets/startgame_sfx.wav');
      this.load.image('forest', './assets/forest.png');
    }

    create() {
      // place tile sprite
      this.background_img = this.add.tileSprite(0, 0, 1280, 720, 'forest').setOrigin(0, 0);

        // menu text configuration
        let menuConfig = {
          fontFamily: 'Alagard',
          fontSize: '100px',
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
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Alchemy Dash', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '32px';
        menuConfig.fontFamily = 'Romulus';
        this.add.text(game.config.width/2, game.config.height/1.55, 'Use ←→ arrows to move\n& SPACE to jump', menuConfig).setOrigin(0.5);
        menuConfig.color = '#62DAC5';
        menuConfig.fontSize = '50px';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 15, 'Press SPACE to start', menuConfig).setOrigin(0.5);
        menuConfig.color = '#EDA2A7';
        menuConfig.strokeThickness = 5;
        menuConfig.fontSize = '24px';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding *23, 'Press ESC to return to the menu', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/7, game.config.height/4 + borderUISize + borderPadding *23, 'Collect purple mushrooms\nAvoid green mushrooms', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // Start game
          this.sound.play('play');
          this.scene.start("playScene");
        }
    }
}
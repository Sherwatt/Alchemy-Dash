class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
      this.load.audio('play', './assets/startgame_sfx.wav');
      this.load.image('forest', './assets/forest.png');
      this.load.image('controls', './assets/controls.jpg');
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
        menuConfig.color = '#62DAC5';
        menuConfig.fontSize = '50px';
        menuConfig.fontFamily = 'Romulus';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 10, 'Press SPACE to start', menuConfig).setOrigin(0.5);
        menuConfig.color = '#EDA2A7';
        menuConfig.strokeThickness = 5;
        menuConfig.fontSize = '24px';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding *23, 'Press ESC to return to the menu', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // hide controls image
        this.show_controls = false;
        this.controls_image = this.add.tileSprite(0,0,game.config.width, game.config.height, 'controls').setOrigin(0,0);
        this.controls_image.alpha = 0;
    }

    update() {
        if(!this.show_controls && Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // hide menu screen & unhide controls
          this.controls_image.alpha = 1;
          this.background_img.alpha = 0;
          this.show_controls = true;
          this.sound.play('play');
        }
        else if (this.show_controls && Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // Start game
          this.sound.play('play');
          this.scene.start("playScene");
        }
    }
}
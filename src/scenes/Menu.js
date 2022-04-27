class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffdc8a',
            color: '#863800',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Alchemy Dash', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+50, 'Use ←→ arrows to move\n& SPACE to jump', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#ffdc8a';
        menuConfig.color = '#863800';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding +100, 'Press SPACE to start\nPress ESC to return to the menu', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // Start game
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.scene.start("playScene");
        }
      }
}
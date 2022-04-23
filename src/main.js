/*******************************************************************
 *  ALCHEMY DASH
******************************************************************/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false,
        }
    },
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyLEFT, keyRIGHT, keySPACE, keyESC;
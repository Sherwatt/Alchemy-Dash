/*******************************************************************
 *  ALCHEMY DASH
******************************************************************/
let gameOptions = {
    platformStartSpeed: 350,
    ingredientStartSpeed: 350,
    spawnRange: [200, 700],
    platformSizeRange: [50, 250],
    ingredientSizeRange: [20, 20],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 150,
    jumps: 2

}

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 520,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
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
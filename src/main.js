/*******************************************************************
 *  ALCHEMY DASH
******************************************************************/
let gameOptions = {
    platformStartSpeed: 350,
    ingredientStartSpeed: 350,
    spawnRange: [200, 700],
    platformSizeRange: [75, 250],
    ingredientSizeRange: [20, 20],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 150,
    jumps: 2

}

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 520,
    backgroundColor: '#B7410E',
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: [Menu, Play, Death]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyLEFT, keyRIGHT, keySPACE, keyESC;